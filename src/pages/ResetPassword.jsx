import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        const { data, error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        const user = data.user;
        const shop_id = user?.user_metadata?.shop_id;

        if (shop_id) {
            localStorage.setItem("shop_id", shop_id);
        }

        setSuccess(true);
        setLoading(false);

        // Optional: navigate after 2 seconds
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] p-4 text-white">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <form
                    onSubmit={handlePasswordReset}
                    className=""
                >
                    <h2 className="text-2xl font-bold text-center mb-4">
                        Reset Your Password
                    </h2>

                    {success ? (
                        <p className="text-green-500 text-center font-medium">
                            Password updated! Redirecting...
                        </p>
                    ) : (
                        <div className="flex flex-col gap-4 justify-center">
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block font-medium mb-1"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                                />
                            </div>

                            {errorMsg && (
                                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white/30 hover:bg-white/40 text-white font-bold py-3 px-6 rounded-xl transition duration-200 backdrop-blur-sm mx-auto"
                            >
                                {loading ? "Updating..." : "Reset Password"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
