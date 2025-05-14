export async function GET({locals}) {
    // Get the userId from auth() -- if null, the user is not signed in
    const {userId} = locals.auth()

    // Protect the route by checking if the user is signed in
    if (!userId) {
        return new Response('Unauthorized', {status: 401})
    }

    // Get the Backend User object when you need access to the user's information
    const user = await locals.currentUser()

    // Add your Route Handler's logic with the returned `user` object

    return new Response(JSON.stringify(user))
}