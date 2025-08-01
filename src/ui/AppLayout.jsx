import { Outlet } from "react-router-dom";
import ThumbNav from "./ThumbNav";
import Header from "./Header";
import { shop_id } from "../constants/local";
import { useEffect } from "react";

export default function AppLayout() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 dark:bg-black">
      <Header />
      <main className="px-4 pb-20 pt-4">
        <Outlet />
      </main>
      <ThumbNav />
    </div>
  );
}
