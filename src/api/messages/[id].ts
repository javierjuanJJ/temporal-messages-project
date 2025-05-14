import {createClient} from "@supabase/supabase-js";

// Inicializa el cliente Supabase con variables de entorno
const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
);

export async function GET({params}) {
    const id = params.id;

    // Obtener el mensaje desde la base de datos
    const {data: message, error} = await supabase
        .from("messages")
        .select("*")
        .eq("id", id)
        .single();

    // Si hay error o el mensaje no existe
    if (error || !message) {
        return new Response("Mensaje no disponible", {status: 410});
    }

    // Verificar si está leído o expirado
    const isExpired = new Date() > new Date(message.expires_at);
    if (message.read || isExpired) {
        return new Response("Mensaje no disponible", {status: 410});
    }

    // Marcar el mensaje como leído
    const {error: updateError} = await supabase
        .from("messages")
        .update({read: true})
        .eq("id", id);

    if (updateError) {
        return new Response("Error al actualizar el mensaje", {status: 500});
    }

    return new Response(JSON.stringify(message), {
        headers: {"Content-Type": "application/json"},
    });
}

export async function DELETE({params}) {
    const id = params.id;

    // Intenta eliminar el mensaje
    const {error} = await supabase
        .from("messages")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response("Error al eliminar el mensaje", {status: 500});
    }

    return new Response("Mensaje eliminado", {status: 200});
}