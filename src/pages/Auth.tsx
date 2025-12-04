import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/`,
                },
            });

            if (error) throw error;
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: error.message,
            });
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate("/");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                toast({
                    title: t("Account created!", "खाता बनाया गया!"),
                    description: t("Please check your email to verify your account.", "कृपया अपना खाता सत्यापित करने के लिए अपना ईमेल जांचें।"),
                });
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container-narrow py-20">
                <div className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-6 font-serif">
                        {isLogin ? t("Welcome Back", "वापसी पर स्वागत है") : t("Create Account", "खाता बनाएं")}
                    </h1>

                    <div className="space-y-4">
                        <Button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50 hover:text-black"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    {t("Sign in with Google", "Google के साथ साइन इन करें")}
                                </div>
                            )}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-muted-foreground/20" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    {t("Or continue with", "या इसके साथ जारी रखें")}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailAuth} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("Email", "ईमेल")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder={t("Enter your email", "अपना ईमेल दर्ज करें")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t("Password", "पासवर्ड")}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder={t("Enter your password", "अपना पासवर्ड दर्ज करें")}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-village-terracotta hover:bg-village-terracotta-light" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    isLogin ? t("Login", "लॉग इन करें") : t("Sign Up", "साइन अप करें")
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-muted-foreground hover:text-village-terracotta underline"
                        >
                            {isLogin
                                ? t("Don't have an account? Sign up", "खाता नहीं है? साइन अप करें")
                                : t("Already have an account? Login", "पहले से खाता है? लॉग इन करें")}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Auth;
