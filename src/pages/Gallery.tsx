import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-village.jpg";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

const Gallery = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Upload state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchGalleryItems();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_items'
        },
        () => {
          fetchGalleryItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching gallery items:", error);
        return;
      }

      if (data) {
        setItems(data as any);
      }
    } catch (err) {
      console.error("Unexpected error fetching gallery:", err);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !imageFile) return;

    setIsUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("gallery_items")
        .insert({
          user_id: user.id,
          title,
          description,
          image_url: publicUrl,
        });

      if (dbError) throw dbError;

      toast({
        title: t("Photo uploaded!", "फोटो अपलोड हो गई!"),
        description: t("Your photo has been added to the gallery.", "आपकी फोटो गैलरी में जोड़ दी गई है।"),
      });

      setIsOpen(false);
      setTitle("");
      setDescription("");
      setImageFile(null);
      fetchGalleryItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t("Error", "त्रुटि"),
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-village-warm py-20">
        <div className="container-narrow px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t("Photo Gallery", "फोटो गैलरी")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {t("A visual journey through the scenic landscapes, vibrant events, and daily life of Dariyapur", "दरियापुर के सुंदर परिदृश्यों, जीवंत कार्यक्रमों और दैनिक जीवन की एक दृश्य यात्रा")}
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container-narrow px-4 flex justify-center">
          {user ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="village" className="gap-2">
                  <Plus className="w-4 h-4" />
                  {t("Upload Photo", "फोटो अपलोड करें")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
                <DialogHeader>
                  <DialogTitle>{t("Upload Photo", "फोटो अपलोड करें")}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t("Title", "शीर्षक")}</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder={t("Enter photo title", "फोटो का शीर्षक दर्ज करें")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("Description", "विवरण")}</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t("Enter photo description", "फोटो का विवरण दर्ज करें")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">{t("Image", "छवि")}</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-village-terracotta" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t("Uploading...", "अपलोड हो रहा है...")}
                      </>
                    ) : (
                      t("Upload", "अपलोड करें")
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <p className="text-muted-foreground text-sm">
              {t("Please login to upload photos", "फोटो अपलोड करने के लिए कृपया लॉग इन करें")}
            </p>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("No photos yet. Be the first to upload!", "अभी तक कोई फोटो नहीं। सबसे पहले अपलोड करें!")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft cursor-pointer hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedImage(item.image_url)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-primary-foreground font-bold">{item.title}</h3>
                      <p className="text-primary-foreground/80 text-sm line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {item.profiles?.avatar_url && (
                          <img src={item.profiles.avatar_url} className="w-6 h-6 rounded-full object-cover" />
                        )}
                        <span className="text-xs text-primary-foreground/70">
                          {t("By", "द्वारा")}: {item.profiles?.full_name || t("Unknown", "अज्ञात")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/20 rounded-full transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt={t("Gallery preview", "गैलरी पूर्वावलोकन")}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
