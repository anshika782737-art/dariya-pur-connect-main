import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Plus, Image as ImageIcon, Send } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface NewsItem {
    id: string;
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
    author_id: string;
    category: string;
    profiles?: {
        full_name: string | null;
    };
}

const News = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { toast } = useToast();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null as File | null,
    });

    useEffect(() => {
        fetchNews();

        const channel = supabase
            .channel('public:news')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => {
                fetchNews();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchNews = async () => {
        try {
            const { data, error } = await supabase
                .from("news")
                .select(`
          *,
          profiles:author_id (
            full_name
          )
        `)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setNews(data || []);
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setUploading(true);
        try {
            let imageUrl = null;

            if (formData.image) {
                const fileExt = formData.image.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from("news_images")
                    .upload(filePath, formData.image);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("news_images")
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const { error } = await supabase.from("news").insert({
                title: formData.title,
                content: formData.content,
                image_url: imageUrl,
                author_id: user.id,
            });

            if (error) throw error;

            toast({
                title: t("Success", "सफलता"),
                description: t("News posted successfully", "समाचार सफलतापूर्वक पोस्ट किया गया"),
            });

            setIsOpen(false);
            setFormData({ title: "", content: "", image: null });
        } catch (error) {
            console.error("Error posting news:", error);
            toast({
                title: t("Error", "त्रुटि"),
                description: t("Failed to post news", "समाचार पोस्ट करने में विफल"),
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <Layout>
            <div className="container-narrow py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-village-terracotta mb-2">
                            {t("News & Reporter Corner", "समाचार और रिपोर्टर कॉर्नर")}
                        </h1>
                        <p className="text-muted-foreground">
                            {t("Latest updates from Dariyapur Azamgarh", "दरियापुर आज़मगढ़ से नवीनतम अपडेट")}
                        </p>
                    </div>

                    {user && (
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-village-terracotta hover:bg-village-terracotta/90">
                                    <Plus className="w-4 h-4 mr-2" />
                                    {t("Post News", "समाचार पोस्ट करें")}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>{t("Post News", "समाचार पोस्ट करें")}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                    <div>
                                        <Input
                                            placeholder={t("Title", "शीर्षक")}
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder={t("Content", "सामग्री")}
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            required
                                            className="min-h-[150px]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById("news-image")?.click()}
                                        >
                                            <ImageIcon className="w-4 h-4 mr-2" />
                                            {formData.image ? t("Change Image", "छवि बदलें") : t("Add Image", "छवि जोड़ें")}
                                        </Button>
                                        <input
                                            id="news-image"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                        {formData.image && (
                                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {formData.image.name}
                                            </span>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full bg-village-terracotta" disabled={uploading}>
                                        {uploading ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        ) : (
                                            <Send className="w-4 h-4 mr-2" />
                                        )}
                                        {t("Post", "पोस्ट करें")}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-village-terracotta" />
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {news.map((item) => (
                            <div key={item.id} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                                <div className="md:flex">
                                    {item.image_url && (
                                        <div className="md:w-1/3 h-48 md:h-auto relative">
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className={`p-6 ${item.image_url ? 'md:w-2/3' : 'w-full'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="font-serif text-xl font-bold text-foreground">{item.title}</h2>
                                            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{item.content}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <span>{t("Reported by", "द्वारा रिपोर्ट किया गया")}: {item.profiles?.full_name || t("Unknown", "अज्ञात")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {news.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                {t("No news yet. Be the first to report!", "अभी तक कोई समाचार नहीं। रिपोर्ट करने वाले पहले व्यक्ति बनें!")}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default News;
