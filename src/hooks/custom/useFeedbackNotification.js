import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const STORAGE_KEY = "new-feedback-count";

export function useFeedbackNotification() {
  const [newCount, setNewCount] = useState(() => {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  });

  const location = useLocation();

  useEffect(() => {
    const feedbackChannel = supabase
      .channel("public:feedbacks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedbacks" },
        () => {
          setNewCount(prev => {
            const updated = prev + 1;
            localStorage.setItem(STORAGE_KEY, updated);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(feedbackChannel);
    };
  }, []);

  // Reset on route change to /feedback
  useEffect(() => {
    if (location.pathname === "/feedback") {
      resetCount();
    }
  }, [location.pathname]);

  const resetCount = () => {
    setNewCount(0);
    localStorage.setItem(STORAGE_KEY, "0");
  };

  return { newCount, resetCount };
}
