import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Home, LogOut, MessageCircle } from "lucide-react";




export default function ThumbNav() {
    const location = useLocation();

    const logout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("shop_id");
        window.location.href = "/login";
    };

    const navItems = [
        { name: "Home", path: "/", icon: <Home size={22} /> },
        { name: "Feedback", path: "/feedback", icon: <MessageCircle size={22} /> },
    ];
    return (
        <nav className="fixed z-50 py-4 bottom-4 left-1/2 -translate-x-1/2 bg-white border border-white/30 rounded-full shadow-lg px-4 flex items-center justify-between w-[90%] max-w-md">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex flex-col items-center text-xs ${isActive ? "text-blue-500" : "text-gray-700"
                            }`}
                    >
                        {item.icon}
                    </Link>
                );
            })}

            <button
                onClick={logout}
                className="flex flex-col items-center text-xs text-red-500"
            >
                <LogOut size={22} />
            </button>
        </nav>
    )
}
