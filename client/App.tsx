import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Attendance from "./pages/Attendance";
import Downloads from "./pages/Downloads";
import Complaints from "./pages/Complaints";
import Mentor from "./pages/Mentor";
import Management from "./pages/Management";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import NCERTClass from "./pages/NCERTClass";
import NCERTSubject from "./pages/NCERTSubject";
import Events from "./pages/Events";
import { ThemeProvider } from "./hooks/useTheme";
import { I18nProvider } from "./hooks/useI18n";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/mentor" element={<Mentor />} />
                <Route path="/management" element={<Management />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/ncert/:classId" element={<NCERTClass />} />
                <Route path="/ncert/:classId/:subject" element={<NCERTSubject />} />
                <Route path="/events" element={<Events />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </I18nProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
