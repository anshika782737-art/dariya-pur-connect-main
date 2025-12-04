import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, User, LogOut, Trash2, Edit2, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GalleryItem {
    id: string;
    title: string;
    description: string;
    image_url: string;
}

const Profile = () => {
    const { user, profile, signOut } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Gallery Management State
    const [myPhotos, setMyPhotos] = useState<GalleryItem[]>([]);
    const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
    const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "");
        }
        if (user) {
            fetchMyPhotos();
        }
    }, [profile, user]);

    const fetchMyPhotos = async () => {
        if (!user) return;
        const { data, error } = await supabase
            .from("gallery_items")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (data) {
            setMyPhotos(data);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);

        try {
            let avatarUrl = profile?.avatar_url;

            if (avatarFile) {
                const fileExt = avatarFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
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
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            toast({
                title: t("Profile updated!", "प्रोफ़ाइल अपडेट हो गई!"),
            });

            window.location.reload();
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

    const handleDeletePhoto = async () => {
        if (!deletingPhotoId) return;

        try {
            const { error } = await supabase
                .from("gallery_items")
                .delete()
                .eq("id", deletingPhotoId);

            if (error) throw error;

            setMyPhotos(myPhotos.filter(p => p.id !== deletingPhotoId));
            toast({
                title: t("Photo deleted", "फोटो हटा दी गई"),
            });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: error.message,
            });
        } finally {
            setDeletingPhotoId(null);
        }
    };

    const handleEditPhoto = async () => {
        if (!editingPhoto) return;

        try {
            const { error } = await supabase
                .from("gallery_items")
                .update({
                    title: editTitle,
                    description: editDescription,
                })
                .eq("id", editingPhoto.id);

            if (error) throw error;

            setMyPhotos(myPhotos.map(p =>
                p.id === editingPhoto.id
                    ? { ...p, title: editTitle, description: editDescription }
                    : p
            ));

            toast({
                title: t("Photo updated", "फोटो अपडेट की गई"),
            });
            setEditingPhoto(null);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: error.message,
            });
        }
    };

    const openEditDialog = (photo: GalleryItem) => {
        setEditingPhoto(photo);
        setEditTitle(photo.title);
        setEditDescription(photo.description || "");
    };

    const handleSignOut = async () => {
        await signOut();
        navigate("/");
    };

    if (!user) {
        navigate("/auth");
        return null;
    }

    return (
        <Layout>
            <div className="container-narrow py-10 md:py-20 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Profile Section */}
                    <div className="bg-card p-8 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold font-serif">
                                {t("My Profile", "मेरी प्रोफ़ाइल")}
                            </h1>
                            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-destructive hover:text-destructive/90">
                                <LogOut className="w-4 h-4 mr-2" />
                                {t("Sign Out", "साइन आउट")}
                            </Button>
                        </div>

                        <div className="flex justify-center mb-8">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border-4 border-village-terracotta/20">
                                {previewUrl || profile?.avatar_url ? (
                                    <img src={previewUrl || profile?.avatar_url || ""} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md mx-auto">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">{t("Full Name", "पूरा नाम")}</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="avatar">{t("Change Photo", "फ़ोटो बदलें")}</Label>
                                <Input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-village-terracotta hover:bg-village-terracotta-light" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    t("Update Profile", "प्रोफ़ाइल अपडेट करें")
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* My Photos Section */}
                    <div className="bg-card p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold font-serif mb-6">
                            {t("My Photos", "मेरी तस्वीरें")}
                        </h2>

                        {myPhotos.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                                {t("You haven't uploaded any photos yet.", "आपने अभी तक कोई फोटो अपलोड नहीं की है।")}
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myPhotos.map((photo) => (
                                    <div key={photo.id} className="group relative aspect-square rounded-lg overflow-hidden border border-border">
                                        <img
                                            src={photo.image_url}
                                            alt={photo.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                onClick={() => openEditDialog(photo)}
                                                className="h-8 w-8"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setDeletingPhotoId(photo.id)}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white text-xs truncate">
                                            {photo.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingPhoto} onOpenChange={(open) => !open && setEditingPhoto(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("Edit Photo", "फोटो संपादित करें")}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>{t("Title", "शीर्षक")}</Label>
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t("Description", "विवरण")}</Label>
                            <Textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingPhoto(null)}>
                            {t("Cancel", "रद्द करें")}
                        </Button>
                        <Button onClick={handleEditPhoto} className="bg-village-terracotta">
                            {t("Save Changes", "परिवर्तन सहेजें")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deletingPhotoId} onOpenChange={(open) => !open && setDeletingPhotoId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("Are you sure?", "क्या आप निश्चित हैं?")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t(
                                "This action cannot be undone. This will permanently delete your photo.",
                                "यह कार्रवाई पूर्ववत नहीं की जा सकती। यह आपकी फोटो को स्थायी रूप से हटा देगा।"
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("Cancel", "रद्द करें")}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeletePhoto} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {t("Delete", "हटाएं")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );
};

export default Profile;
