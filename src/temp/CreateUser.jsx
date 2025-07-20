import { useState } from "react";
import { signUpWithEmail } from "../lib/supaAuth";

function CreateUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { data, error } = await signUpWithEmail(email, password, 'admin', 2);

        if (error) {
            setMessage(`❌ ${error.message}`);
        } else {
            setMessage("✅ Signup successful! Please check your email to confirm.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
            {message && (
                <div className="mt-4 text-center text-sm text-gray-700">{message}</div>
            )}
        </div>
    )
}

export default CreateUser
