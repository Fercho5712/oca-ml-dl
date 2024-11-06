import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocationDataProvider } from "./context/LocationDataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Predictions from "./pages/Predictions";
import Optimization from "./pages/Optimization";
import Analysis from "./pages/Analysis";
import Data from "./pages/Data";
import LocationData from "./pages/LocationData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocationDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <Index />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/predictions"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <Predictions />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/optimization"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <Optimization />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <Analysis />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/data"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <Data />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/location"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar />
                    <LocationData />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocationDataProvider>
  </QueryClientProvider>
);

export default App;