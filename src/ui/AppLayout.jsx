import { Outlet, useLocation, Link } from "react-router-dom";
import { Home, MessageCircle, LogOut } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AppLayout() {
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
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="p-4 border-b bg-white/60 backdrop-blur-md">
                <h1 className="text-lg font-semibold">Header</h1>
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed py-4 bottom-4 left-1/2 -translate-x-1/2 bg-white border border-white/30 rounded-full shadow-lg px-4 flex items-center justify-between w-[90%] max-w-md">
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
        </div>
    );
}
