import { useState } from "react"
import { login } from "../lib/supaAuth"
import { useShop } from "../context/ShopContext"
import { Link } from "react-router-dom"

export default function Login() {
    const { setShop } = useShop()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        const { data, error } = await login(email, password)

        if (error) {
            setError(error.message)
        } else {
            setShop(data)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141e30] to-[#243b55] p-4">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
                <h2 className="text-2xl text-white font-semibold text-center mb-6">Welcome Back</h2>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white/30 hover:bg-white/40 text-white font-bold py-3 px-6 rounded-xl transition duration-200 backdrop-blur-sm"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <Link to={'/forgot-password'}><p className="text-white underline mt-2 ml-2">Forgot Password ?</p></Link>
            </div>
        </div>
    )
}
