import { Outlet } from "react-router-dom";
import ThumbNav from "./ThumbNav";

export default function AppLayout() {

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="p-4 border-b bg-white/60 backdrop-blur-md">
                <h1 className="text-lg font-semibold">Header</h1>
            </div>
            <div className="flex-1 p-4">
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <ThumbNav />
        </div>
    );
}
