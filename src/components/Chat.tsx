import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, User, Trash2, Image as ImageIcon, Video, Mic, X, Paperclip, StopCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Message {
    id: string;
    user_id: string;
    message: string;
    message_type: 'text' | 'image' | 'video' | 'audio';
    media_url: string | null;
    created_at: string;
    profiles: {
        full_name: string | null;
        avatar_url: string | null;
    } | null;
}

const Chat = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [mediaFile, setMediaFile] = useState<File | null>(null);
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Fetch initial messages
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from("chat_messages")
                .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
                .order("created_at", { ascending: true });

            if (!error && data) {
                setMessages(data as any);
            }
        };

        fetchMessages();

        // Subscribe to new messages
        const channel = supabase
            .channel("public:chat_messages")
            .on(
                "postgres_changes",
                {
                    event: "*", // Listen to all events (INSERT, DELETE)
                    schema: "public",
                    table: "chat_messages",
                },
                async (payload) => {
                    if (payload.eventType === 'INSERT') {
                        const { data: profile } = await supabase
                            .from("profiles")
                            .select("full_name, avatar_url")
                            .eq("id", payload.new.user_id)
                            .single();

                        const newMsg = {
                            ...payload.new,
                            profiles: profile,
                        } as any;

                        setMessages((prev) => [...prev, newMsg]);
                    } else if (payload.eventType === 'DELETE') {
                        setMessages((prev) => prev.filter(msg => msg.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMediaFile(file);
            const url = URL.createObjectURL(file);
            setMediaPreview(url);
        }
    };

    const clearMedia = () => {
        setMediaFile(null);
        setMediaPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], "voice-note.webm", { type: 'audio/webm' });
                setMediaFile(file);
                setMediaPreview(URL.createObjectURL(blob)); // Preview audio
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            toast({
                variant: "destructive",
                title: t("Microphone Error", "माइक्रोफ़ोन त्रुटि"),
                description: t("Could not access microphone.", "माइक्रोफ़ोन तक नहीं पहुंच सका।"),
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if ((!newMessage.trim() && !mediaFile) || !user) return;

        setIsUploading(true);

        try {
            let mediaUrl = null;
            let messageType = 'text';

            if (mediaFile) {
                const fileExt = mediaFile.name.split('.').pop();
                const fileName = `${user.id}/${Math.random()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('chat_media')
                    .upload(fileName, mediaFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('chat_media')
                    .getPublicUrl(fileName);

                mediaUrl = publicUrl;

                if (mediaFile.type.startsWith('image/')) messageType = 'image';
                else if (mediaFile.type.startsWith('video/')) messageType = 'video';
                else if (mediaFile.type.startsWith('audio/')) messageType = 'audio';
            }

            const { error } = await supabase.from("chat_messages").insert({
                user_id: user.id,
                message: newMessage.trim() || (messageType === 'text' ? '' : 'Sent a file'),
                message_type: messageType,
                media_url: mediaUrl,
            });

            if (error) throw error;

            setNewMessage("");
            clearMedia();
        } catch (error: any) {
            console.error("Error sending message:", error);
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: t("Failed to send message.", "संदेश भेजने में विफल।"),
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteMessage = async (id: string) => {
        try {
            const { error } = await supabase
                .from("chat_messages")
                .delete()
                .eq("id", id);

            if (error) throw error;
        } catch (error) {
            console.error("Error deleting message:", error);
            toast({
                variant: "destructive",
                title: t("Error", "त्रुटि"),
                description: t("Failed to delete message.", "संदेश हटाने में विफल।"),
            });
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-village-terracotta/90 backdrop-blur-md text-white flex justify-between items-center shadow-md z-10">
                <div>
                    <h3 className="font-serif text-lg font-semibold tracking-wide flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        {t("Community Chat", "सामुदायिक चैट")}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">
                        {t("Messages deleted after 24h", "24 घंटे बाद संदेश हटा दिए जाते हैं")}
                    </p>
                </div>
                <div className="bg-white/10 p-2 rounded-full">
                    <User className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-background/50 to-background/80" ref={scrollRef}>
                {messages.map((msg) => {
                    const isOwn = user?.id === msg.user_id;
                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"} animate-fade-in-up`}
                        >
                            <div className="flex-shrink-0 self-end">
                                {msg.profiles?.avatar_url ? (
                                    <img
                                        src={msg.profiles.avatar_url}
                                        alt={msg.profiles.full_name || "User"}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-white shadow-sm">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                            <div
                                className={`max-w-[75%] rounded-2xl p-4 relative group shadow-sm ${isOwn
                                    ? "bg-village-terracotta text-white rounded-tr-sm"
                                    : "bg-white dark:bg-gray-800 text-foreground rounded-tl-sm border border-border/50"
                                    }`}
                            >
                                {!isOwn && (
                                    <p className="text-xs font-bold mb-1 text-village-terracotta">
                                        {msg.profiles?.full_name || t("Unknown User", "अज्ञात उपयोगकर्ता")}
                                    </p>
                                )}

                                {msg.message_type === 'text' && (
                                    <p className="text-sm leading-relaxed break-words">{msg.message}</p>
                                )}

                                {msg.message_type === 'image' && msg.media_url && (
                                    <div className="mb-2 overflow-hidden rounded-lg">
                                        <img src={msg.media_url} alt="Shared image" className="w-full max-h-60 object-cover hover:scale-105 transition-transform duration-300" />
                                        {msg.message && msg.message !== 'Sent a file' && <p className="text-sm mt-2">{msg.message}</p>}
                                    </div>
                                )}

                                {msg.message_type === 'video' && msg.media_url && (
                                    <div className="mb-2 overflow-hidden rounded-lg">
                                        <video src={msg.media_url} controls className="w-full max-h-60 bg-black" />
                                        {msg.message && msg.message !== 'Sent a file' && <p className="text-sm mt-2">{msg.message}</p>}
                                    </div>
                                )}

                                {msg.message_type === 'audio' && msg.media_url && (
                                    <div className="mb-2 flex items-center gap-2 bg-black/5 p-2 rounded-lg">
                                        <Mic className="w-4 h-4 opacity-70" />
                                        <audio src={msg.media_url} controls className="h-8 w-48" />
                                    </div>
                                )}

                                <p className={`text-[10px] mt-1 text-right ${isOwn ? "text-white/70" : "text-muted-foreground"}`}>
                                    {format(new Date(msg.created_at), "h:mm a")}
                                </p>

                                {isOwn && (
                                    <button
                                        onClick={() => handleDeleteMessage(msg.id)}
                                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all bg-destructive text-white p-1 rounded-full shadow-md hover:scale-110"
                                        title={t("Delete Message", "संदेश हटाएं")}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50">
                {user ? (
                    <div className="space-y-3">
                        {mediaPreview && (
                            <div className="relative inline-block animate-scale-in">
                                {mediaFile?.type.startsWith('image/') ? (
                                    <img src={mediaPreview} alt="Preview" className="h-24 rounded-xl border-2 border-village-terracotta shadow-md object-cover" />
                                ) : mediaFile?.type.startsWith('video/') ? (
                                    <video src={mediaPreview} className="h-24 rounded-xl border-2 border-village-terracotta shadow-md bg-black" />
                                ) : (
                                    <div className="h-12 px-4 bg-village-terracotta/10 text-village-terracotta rounded-full flex items-center border border-village-terracotta/20">
                                        <Mic className="w-4 h-4 mr-2 animate-pulse" /> Audio Recording
                                    </div>
                                )}
                                <button
                                    onClick={clearMedia}
                                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                            />

                            <div className="flex gap-1 pb-1">
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => fileInputRef.current?.click()}
                                    title={t("Attach Photo/Video", "फोटो/वीडियो संलग्न करें")}
                                    className="h-10 w-10 rounded-full hover:bg-village-terracotta/10 hover:text-village-terracotta transition-colors"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </Button>

                                {isRecording ? (
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        onClick={stopRecording}
                                        className="h-10 w-10 rounded-full animate-pulse shadow-md"
                                        title={t("Stop Recording", "रिकॉर्डिंग रोकें")}
                                    >
                                        <StopCircle className="w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        onClick={startRecording}
                                        title={t("Record Voice Note", "वॉयस नोट रिकॉर्ड करें")}
                                        className="h-10 w-10 rounded-full hover:bg-village-terracotta/10 hover:text-village-terracotta transition-colors"
                                    >
                                        <Mic className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>

                            <div className="flex-1 relative">
                                <Input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={t("Type a message...", "एक संदेश टाइप करें...")}
                                    className="w-full rounded-2xl border-border/50 bg-background/50 focus:bg-background focus:ring-2 focus:ring-village-terracotta/20 transition-all pl-4 pr-12 py-6"
                                    disabled={isRecording}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={(!newMessage.trim() && !mediaFile) || isUploading || isRecording}
                                    className="absolute right-1 top-1 h-10 w-10 rounded-xl bg-village-terracotta hover:bg-village-terracotta-light text-white shadow-sm transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground mb-2">
                            {t("Join the conversation", "बातचीत में शामिल हों")}
                        </p>
                        <Button variant="outline" size="sm" className="rounded-full" asChild>
                            <a href="/auth">{t("Login to Chat", "चैट करने के लिए लॉग इन करें")}</a>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
