import {createClient} from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
);

export async function GET({locals}) {
    const {userId} = locals.auth();

    if (!userId) {
        return new Response("Unauthorized", {status: 401});
    }

    const {data: messages, error} = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", userId)
        .order("expires_at", {ascending: false});

    if (error) {
        return new Response("Error al obtener mensajes", {status: 500});
    }

    return new Response(JSON.stringify(messages), {
        headers: {"Content-Type": "application/json"},
    });
}
