import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import ChatSupport from "./pages/ChatSupport";
import CounselorBooking from "./pages/CounselorBooking";
import ResourceHub from "./pages/ResourceHub";
import Community from "./pages/Community";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Public auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Protected route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes for Student + Admin */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <ChatSupport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <CounselorBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <ResourceHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute allowedRoles={["student", "admin"]}>
                  <Community />
                </ProtectedRoute>
              }
            />

            {/* Admin-only route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
