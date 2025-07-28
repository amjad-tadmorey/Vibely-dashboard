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
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import Users from "./pages/Users";
import { useAuth } from "./context/AuthContext";
import AccessDenied from "./pages/AccessDenied";
import QR from "./pages/QR";

function App() {
  const { user } = useAuth()
  const role = user?.user_metadata?.role

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
    <>
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
            <Route path="qr" element={<QR />} />
            <Route path="users" element={role === 'admin' ? <Users /> : <AccessDenied />} />
            <Route path="settings" element={role === 'admin' ? <Settings /> : <AccessDenied />} />
            <Route path="preview" element={<FeedbackPreviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        gutter={12}
        containerStyle={{
          width: '100%',
          top: '35%',
          left: '50%',
          translate: '-50% -50%'
        }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: '1rem',
            width: 'fit-content',
            padding: '8px 24px',
            backgroundColor: 'white',
            color: 'var(--color-grey-700)'
          }
        }}
      />
    </>
  );
}

export default App;
