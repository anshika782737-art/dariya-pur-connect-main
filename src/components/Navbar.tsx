import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Languages, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, profile } = useAuth();

  const navLinks = [
    { name: t("About Dariyapur", "दरियापुर के बारे में"), path: "/about" },
    { name: t("Administration", "प्रशासन"), path: "/administration" },
    { name: t("Life in Village", "गाँव का जीवन"), path: "/life" },
    { name: t("Places to Visit", "दर्शनीय स्थल"), path: "/places" },
    { name: t("Gallery", "गैलरी"), path: "/gallery" },
    { name: t("News", "समाचार"), path: "/news" },
    { name: t("Emergency", "आपातकालीन"), path: "/emergency" },
    { name: t("Community", "समुदाय"), path: "/community" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md overflow-hidden">
              <img src="/src/assets/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-lg font-semibold text-foreground">
              {t("Dariyapur Azamgarh", "दरियापुर आज़मगढ़")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.path
                    ? "text-village-terracotta bg-village-terracotta/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Languages className="w-4 h-4" />
              <span className="font-medium">{language === "en" ? "हिंदी" : "English"}</span>
            </Button>

            {user ? (
              <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
                <Link to="/profile">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="max-w-[100px] truncate">{profile?.full_name || t("Profile", "प्रोफ़ाइल")}</span>
                </Link>
              </Button>
            ) : (
              <Button variant="village" size="sm" asChild>
                <Link to="/auth">{t("Login", "लॉग इन")}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-muted-foreground"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs">{language === "en" ? "हिंदी" : "EN"}</span>
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:bg-muted"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-3 py-3 text-base font-medium rounded-md transition-colors",
                    location.pathname === link.path
                      ? "text-village-terracotta bg-village-terracotta/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {t("My Profile", "मेरी प्रोफ़ाइल")}
                </Link>
              ) : (
                <Button variant="village" size="sm" className="mt-2" asChild>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    {t("Login / Sign Up", "लॉग इन / साइन अप")}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
