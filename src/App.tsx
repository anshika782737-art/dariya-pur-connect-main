import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Administration from "./pages/Administration";
import Life from "./pages/Life";
import Places from "./pages/Places";
import Gallery from "./pages/Gallery";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import News from "./pages/News";
import Emergency from "./pages/Emergency";
import VillageProfile from "./pages/VillageProfile";
import VillageGuide from "./pages/VillageGuide";

const queryClient = new QueryClient();

// Component to handle onboarding redirection
const RequireProfile = ({ children }: { children: JSX.Element }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // If user is logged in but has no full name, and is not already on onboarding page
  if (user && !profile?.full_name && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RequireProfile>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/administration" element={<Administration />} />
                <Route path="/life" element={<Life />} />
                <Route path="/places" element={<Places />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/community" element={<Community />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/news" element={<News />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/profile-about" element={<VillageProfile />} />
                <Route path="/village-guide" element={<VillageGuide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RequireProfile>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
