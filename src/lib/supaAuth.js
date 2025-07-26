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

export async function handlePasswordReset(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        console.error('Password reset error:', error.message);
        return { error };
    }

    const user = data.user;
    const shop_id = user?.user_metadata?.shop_id;

    if (shop_id) {
        localStorage.setItem('shop_id', shop_id);
    }

    console.log('Password reset successful:', user);
    return { data };
}

