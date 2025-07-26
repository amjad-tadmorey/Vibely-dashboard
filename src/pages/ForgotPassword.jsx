import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://vibely-dashboard-nu.vercel.app/reset-password", // change to your domain
        });
        if (error) {
            setMessage("Something went wrong. Try again.");
        } else {
            setMessage("Check your inbox for reset instructions.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] p-4">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl text-white font-semibold text-center mb-6">Forgot your password?</h2>

                <form onSubmit={handleReset} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-white/30 hover:bg-white/40 text-white font-bold py-3 px-6 rounded-xl transition duration-200 backdrop-blur-sm"
                    >
                        Send reset link
                    </button>
                    {message && <p className="text-sm mt-2 text-muted">{message}</p>}
                </form>
                <Link to={'/login'}><p className="text-white underline mt-2 ml-2">Log in</p></Link>
            </div>
        </div>
    );
}
