import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Home, LogOut, MessageCircle, Palette, Settings, Users } from "lucide-react";
import { useFeedbackNotification } from "../hooks/custom/useFeedbackNotification";



export default function ThumbNav() {

    const { newCount, resetCount } = useFeedbackNotification();

    const location = useLocation();
    const logout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("shop_id");
        window.location.href = "/login";
    };

    const navItems = [
        { name: "Home", path: "/", icon: <Home size={22} /> },
        { name: "Feedback", path: "/feedback", icon: <MessageCircle size={22} /> },
        { name: "Settings", path: "/settings", icon: <Palette size={22} /> },
        { name: "Users", path: "/users", icon: <Users size={22} /> },
    ];

    return (
        <nav className="fixed z-50 py-4 bottom-4 left-1/2 -translate-x-1/2 bg-white border border-white/30 rounded-full shadow-lg px-4 flex items-center justify-between w-[90%] max-w-md">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex flex-col items-center text-xs ${isActive ? "text-[#178AE4]" : "text-gray-700 relative"
                            }`}
                    >
                        {item.icon}
                        {item.name === 'Feedback' && newCount > 0 && (
                            <span className="absolute -top-2 -right-3 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-md">
                                {newCount}
                            </span>
                        )}
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
