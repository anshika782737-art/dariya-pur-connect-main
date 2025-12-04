import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, User } from "lucide-react";

const Onboarding = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();

    const [fullName, setFullName] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/auth");
            return;
        }

        // If profile already has a name, redirect to home
        if (profile?.full_name) {
            navigate("/");
        }
    }, [user, profile, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);

        try {
            let avatarUrl = profile?.avatar_url || "";

            if (avatarFile) {
                const fileExt = avatarFile.name.split('.').pop();
                const fileName = `${user.id}/${Math.random()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(fileName, avatarFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(fileName);

                avatarUrl = publicUrl;
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    avatar_url: avatarUrl,
                })
                .eq('id', user.id);

            if (error) throw error;

            toast({
                title: t("Profile Updated!", "प्रोफ़ाइल अपडेट हो गई!"),
                description: t("Welcome to the community.", "समुदाय में आपका स्वागत है।"),
            });

            // Force a reload or re-fetch of profile would be ideal, 
            // but navigation should trigger the AuthContext to eventually update or we might need to manually update context.
            // For now, let's navigate home.
            window.location.href = "/";
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
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-village-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-village-terracotta/20">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-10 h-10 text-village-terracotta" />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold font-serif">
                            {t("Complete Your Profile", "अपनी प्रोफ़ाइल पूरी करें")}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {t(
                                "Please tell us your name and upload a photo to continue.",
                                "जारी रखने के लिए कृपया हमें अपना नाम बताएं और एक फोटो अपलोड करें।"
                            )}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">{t("Full Name", "पूरा नाम")}</Label>
                            <Input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="avatar">{t("Profile Photo", "प्रोफ़ाइल फ़ोटो")}</Label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {t("Optional, but recommended.", "वैकल्पिक, लेकिन अनुशंसित।")}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-village-terracotta hover:bg-village-terracotta-light h-11 text-lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                t("Save & Continue", "सहेजें और जारी रखें")
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Onboarding;
