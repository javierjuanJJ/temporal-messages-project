import {nanoid} from "nanoid";
import {createClient} from "@supabase/supabase-js";

// Accede a las variables de entorno
const supabase = createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
);

export async function POST({request, locals}) {
    const {userId} = locals.auth();

    if (!userId) {
        return new Response("Unauthorized", {status: 401});
    }

    const {content, expiresIn, encrypted} = await request.json();
    const id = nanoid(8);
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    const {error} = await supabase.from("messages").insert({
        id,
        user_id: userId,
        content,
        encrypted,
        expires_at: expiresAt,
    });

    if (error) {
        return new Response(JSON.stringify({error: error.message}), {
            status: 500,
        });
    }

    return new Response(JSON.stringify({url: `/m/${id}`}), {
        status: 201,
    });
}
