import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Shield, Ambulance, Flame, Heart, User, Plus, Loader2, Check, X as XIcon, Image as ImageIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Contact {
    id: string;
    name: string;
    role: string;
    phone: string;
    image_url: string | null;
    is_approved: boolean;
}

const Emergency = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const { toast } = useToast();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [pendingContacts, setPendingContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        phone: "",
        image: null as File | null,
    });

    const emergencyContacts = [
        {
            name: t("Police", "पुलिस"),
            number: "100",
            icon: Shield,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            name: t("Ambulance", "एम्बुलेंस"),
            number: "108",
            icon: Ambulance,
            color: "text-red-600",
            bg: "bg-red-100",
        },
        {
            name: t("Fire Brigade", "दमकल"),
            number: "101",
            icon: Flame,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
        {
            name: t("Women Helpline", "महिला हेल्पलाइन"),
            number: "1090",
            icon: Heart,
            color: "text-pink-600",
            bg: "bg-pink-100",
        },
        {
            name: t("Child Helpline", "चाइल्ड हेल्पलाइन"),
            number: "1098",
            icon: User,
            color: "text-green-600",
            bg: "bg-green-100",
        },
    ];

    useEffect(() => {
        checkAdminStatus();
        fetchContacts();

        const channel = supabase
            .channel('public:contacts')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
                fetchContacts();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const checkAdminStatus = async () => {
        if (!user) return;
        const { data } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (data?.is_admin) {
            setIsAdmin(true);
        }
    };

    const fetchContacts = async () => {
        try {
            // Fetch approved contacts
            const { data: approvedData, error: approvedError } = await supabase
                .from("contacts")
                .select("*")
                .eq("is_approved", true)
                .order("created_at", { ascending: false });

            if (approvedError) throw approvedError;
            setContacts(approvedData || []);

            // Fetch pending contacts if admin
            if (isAdmin) {
                const { data: pendingData, error: pendingError } = await supabase
                    .from("contacts")
                    .select("*")
                    .eq("is_approved", false)
                    .order("created_at", { ascending: false });

                if (pendingError) throw pendingError;
                setPendingContacts(pendingData || []);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
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
                    .from("contact_images")
                    .upload(filePath, formData.image);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from("contact_images")
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            const { error } = await supabase.from("contacts").insert({
                name: formData.name,
                role: formData.role,
                phone: formData.phone,
                image_url: imageUrl,
                user_id: user.id,
            });

            if (error) throw error;

            toast({
                title: t("Success", "सफलता"),
                description: t("Contact submitted for approval", "संपर्क अनुमोदन के लिए प्रस्तुत किया गया"),
            });

            setIsOpen(false);
            setFormData({ name: "", role: "", phone: "", image: null });
        } catch (error) {
            console.error("Error submitting contact:", error);
            toast({
                title: t("Error", "त्रुटि"),
                description: t("Failed to submit contact", "संपर्क प्रस्तुत करने में विफल"),
                variant: "destructive",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const { error } = await supabase
                .from("contacts")
                .update({ is_approved: true })
                .eq("id", id);

            if (error) throw error;

            toast({
                title: t("Approved", "स्वीकृत"),
                description: t("Contact has been approved", "संपर्क स्वीकृत कर दिया गया है"),
            });

            // Refresh lists
            fetchContacts();
        } catch (error) {
            console.error("Error approving contact:", error);
            toast({
                title: t("Error", "त्रुटि"),
                variant: "destructive",
            });
        }
    };

    const handleReject = async (id: string) => {
        try {
            const { error } = await supabase
                .from("contacts")
                .delete()
                .eq("id", id);

            if (error) throw error;

            toast({
                title: t("Rejected", "अस्वीकृत"),
                description: t("Contact has been rejected", "संपर्क अस्वीकृत कर दिया गया है"),
            });

            // Refresh lists
            fetchContacts();
        } catch (error) {
            console.error("Error rejecting contact:", error);
            toast({
                title: t("Error", "त्रुटि"),
                variant: "destructive",
            });
        }
    };

    return (
        <Layout>
            <div className="container-narrow py-8">
                {/* Emergency Section */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-red-600 mb-4">
                        {t("Important Contacts & Directory", "महत्वपूर्ण संपर्क और निर्देशिका")}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t(
                            "Quick access to essential emergency numbers and community service providers.",
                            "आवश्यक आपातकालीन नंबरों और सामुदायिक सेवा प्रदाताओं तक त्वरित पहुंच।"
                        )}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
                    {emergencyContacts.map((contact) => (
                        <div
                            key={contact.number}
                            className="bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full ${contact.bg} flex items-center justify-center`}>
                                    <contact.icon className={`w-6 h-6 ${contact.color}`} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                                    <p className="text-xl font-bold text-foreground">{contact.number}</p>
                                </div>
                            </div>
                            <Button
                                size="icon"
                                className={`rounded-full ${contact.bg} hover:brightness-95`}
                                asChild
                            >
                                <a href={`tel:${contact.number}`}>
                                    <Phone className={`w-5 h-5 ${contact.color}`} />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Community Directory Section */}
                <div className="border-t pt-12">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-village-terracotta mb-2">
                                {t("Community Directory", "सामुदायिक निर्देशिका")}
                            </h2>
                            <p className="text-muted-foreground">
                                {t("Find teachers, drivers, and skilled workers in our village.", "हमारे गाँव में शिक्षक, ड्राइवर और कुशल श्रमिक खोजें।")}
                            </p>
                        </div>

                        {user && (
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-village-terracotta hover:bg-village-terracotta/90">
                                        <Plus className="w-4 h-4 mr-2" />
                                        {t("Add Contact", "संपर्क जोड़ें")}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                        <DialogTitle>{t("Add Community Contact", "सामुदायिक संपर्क जोड़ें")}</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                        <div>
                                            <Input
                                                placeholder={t("Full Name", "पूरा नाम")}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder={t("Role (e.g., Computer Teacher)", "भूमिका (जैसे, कंप्यूटर शिक्षक)")}
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                placeholder={t("Phone Number", "फ़ोन नंबर")}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                                type="tel"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById("contact-image")?.click()}
                                            >
                                                <ImageIcon className="w-4 h-4 mr-2" />
                                                {formData.image ? t("Change Photo", "फोटो बदलें") : t("Add Photo", "फोटो जोड़ें")}
                                            </Button>
                                            <input
                                                id="contact-image"
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
                                                t("Submit for Approval", "अनुमोदन के लिए जमा करें")
                                            )}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>

                    {/* Admin Pending List */}
                    {isAdmin && pendingContacts.length > 0 && (
                        <div className="mb-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <h3 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                {t("Pending Approvals", "लंबित अनुमोदन")}
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {pendingContacts.map((contact) => (
                                    <div key={contact.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {contact.image_url ? (
                                                <img src={contact.image_url} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold">{contact.name}</p>
                                                <p className="text-sm text-muted-foreground">{contact.role}</p>
                                                <p className="text-xs text-muted-foreground">{contact.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleApprove(contact.id)}>
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleReject(contact.id)}>
                                                <XIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Directory Grid */}
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-village-terracotta" />
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {contacts.map((contact) => (
                                <div key={contact.id} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 hover:shadow-md transition-all group">
                                    <div className="p-6 flex flex-col items-center text-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-background shadow-sm group-hover:scale-105 transition-transform">
                                            {contact.image_url ? (
                                                <img src={contact.image_url} alt={contact.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary flex items-center justify-center">
                                                    <User className="w-10 h-10 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-serif text-xl font-bold text-foreground mb-1">{contact.name}</h3>
                                        <p className="text-village-terracotta font-medium mb-4">{contact.role}</p>
                                        <Button variant="outline" className="w-full rounded-full group-hover:bg-village-terracotta group-hover:text-white transition-colors" asChild>
                                            <a href={`tel:${contact.phone}`}>
                                                <Phone className="w-4 h-4 mr-2" />
                                                {contact.phone}
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {contacts.length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    {t("No contacts listed yet. Be the first to add one!", "अभी तक कोई संपर्क सूचीबद्ध नहीं है। जोड़ने वाले पहले व्यक्ति बनें!")}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Emergency;
