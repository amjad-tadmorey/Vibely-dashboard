import { supabase } from "./supabase"

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error.message)
        return { error }
    }

    const user = data.user
    const shop_id = user?.user_metadata?.shop_id

    if (shop_id) {
        localStorage.setItem('shop_id', shop_id)
    }

    console.log('User logged in:', user)
    return { data }
}



export async function signUpWithEmail(email, password, role, shop_id) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role,     // Add custom metadata here
                shop_id,         // Example: assign shop_id
            }
        }
    })

    if (error) {
        console.error('Signup error:', error.message)
        return { error }
    }

    console.log('User signed up:', data)
    return { data }
}
