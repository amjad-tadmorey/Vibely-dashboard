import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login";
import Spinner from "./ui/Spinner"
import FeedbackPage from "./pages/FeedbackPage";
import Dashboard from "./pages/Dashboard";
import { supabase } from "./lib/supabase";
import AppLayout from "./ui/AppLayout";
import FeedbackPreviewPage from "./pages/FeedbackPreviewPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, []);

  if (loading) return <Spinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/"
          element={session ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="preview" element={<FeedbackPreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
