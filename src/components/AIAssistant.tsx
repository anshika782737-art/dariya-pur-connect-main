import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, PhoneOff, Mic, MicOff, Loader2 } from "lucide-react";
import speakVideo from "@/assets/speakgirl (1).mp4";
import silentVideo from "@/assets/silentgirl.mp4";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState<string>("");
    const [hasGreeted, setHasGreeted] = useState(false);

    // Refs to track state in callbacks without stale closures
    const isOpenRef = useRef(isOpen);
    const isMutedRef = useRef(isMuted);
    const isSpeakingRef = useRef(isSpeaking);

    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Sync refs with state
    useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);
    useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
    useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // We want turn-taking
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-IN';

            recognitionRef.current.onstart = () => {
                setStatus("Listening...");
            };

            recognitionRef.current.onend = () => {
                // If we are not speaking, not processing, and not muted, and still open, we should be listening.
                // However, in turn-taking, we usually stop listening when processing starts.
                // This onend might fire if the user didn't say anything.
                // We can try to restart it if we expect to be listening.
                if (isOpenRef.current && !isMutedRef.current && !isSpeakingRef.current && !isProcessing) {
                    // Optional: Auto-restart if silence (can be annoying if it beeps)
                    // For now, let's rely on the loop after speaking.
                    // But if it stops due to error/silence, we might want a manual trigger or auto-restart.
                    // Let's just set status to Idle.
                    setStatus("Tap Mic to Speak");
                }
            };

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleUserSpeech(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setStatus("Error / Tap Mic");
            };
        }
    }, []);

    // Greeting on Open
    useEffect(() => {
        if (isOpen) {
            if (!hasGreeted) {
                const greeting = "Hey, Dariyapur me aapka swagat hai, mai aap ki kya madad karu?";
                speak(greeting);
                setHasGreeted(true);
            } else {
                if (!isMuted) {
                    startListening();
                }
            }
        } else {
            stopAll();
        }
    }, [isOpen]);

    const stopAll = () => {
        window.speechSynthesis.cancel();
        if (recognitionRef.current) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                // ignore
            }
        }
        setIsSpeaking(false);
        setIsProcessing(false);
        setStatus("");
    };

    const startListening = () => {
        if (isMutedRef.current || !recognitionRef.current) return;

        // Stop any current speech
        window.speechSynthesis.cancel();

        try {
            recognitionRef.current.start();
        } catch (e) {
            // Already started or error, usually fine
        }
    };

    const speak = (text: string) => {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance; // Store in ref to prevent GC

        // Voice Selection
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
            voices.find(v => (v.name.includes('India') || v.name.includes('Hindi')) && v.name.includes('Female')) ||
            voices.find(v => v.name.includes('Google हिन्दी')) ||
            voices.find(v => v.name.includes('Female'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
            setIsSpeaking(true);
            setStatus("Speaking...");
            if (videoRef.current) videoRef.current.play();
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }

            // CRITICAL: Auto-loop
            // Use refs to check current state
            if (isOpenRef.current && !isMutedRef.current) {
                console.log("Speech ended, restarting listener...");
                setTimeout(() => {
                    startListening();
                }, 100); // Small delay to ensure clean state
            } else {
                setStatus("Muted");
            }
        };

        utterance.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    const handleUserSpeech = async (text: string) => {
        setIsProcessing(true);
        setStatus("Thinking...");

        const systemPrompt = "You are Maya, a friendly AI assistant for Dariyapur village, Azamgarh. You speak Hinglish. You know about Sage Durvasa Ashram, Phulpur, and local history. Keep responses short and conversational.";
        const fullPrompt = `${systemPrompt}\nUser: ${text}\nMaya:`;

        try {
            const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`);
            const data = await response.text();
            speak(data);
        } catch (error) {
            console.error("API Error", error);
            speak("Maaf kijiye, kuch dikkat aa rahi hai.");
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            // We need to wait for state to update or use the new value directly
            // But since we use refs in startListening, we can just call it after a tick or pass a flag
            // Easier: just set state, and let the effect or user interaction handle it.
            // But for immediate feedback:
            isMutedRef.current = false; // Optimistic update for logic
            startListening();
        } else {
            setIsMuted(true);
            isMutedRef.current = true;
            if (recognitionRef.current) recognitionRef.current.stop();
            window.speechSynthesis.cancel();
            setStatus("Muted");
        }
    };

    const endCall = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-16 h-16 bg-village-terracotta hover:bg-village-terracotta/90 shadow-xl animate-bounce flex items-center justify-center"
                >
                    <Phone className="w-8 h-8 text-white" />
                </Button>
            )}

            {isOpen && (
                <Card className="w-[320px] h-[500px] flex flex-col overflow-hidden shadow-2xl border-village-terracotta/20 animate-scale-in relative bg-black">

                    {/* Video Container */}
                    <div className="absolute inset-0 z-0">
                        <video
                            ref={videoRef}
                            src={isSpeaking ? speakVideo : silentVideo}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                    </div>

                    {/* Header Status */}
                    <div className="relative z-10 p-4 text-center">
                        <h3 className="text-white font-serif text-xl font-bold drop-shadow-md">Maya</h3>
                        <p className="text-white/80 text-sm font-medium drop-shadow-md flex items-center justify-center gap-2">
                            {status}
                            {isProcessing && <Loader2 className="w-3 h-3 animate-spin" />}
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Controls */}
                    <div className="relative z-10 p-6 pb-8 flex justify-center gap-6 items-center">

                        {/* Mute Button */}
                        <Button
                            variant="secondary"
                            size="icon"
                            className={`w-12 h-12 rounded-full shadow-lg backdrop-blur-sm ${isMuted ? 'bg-white/20 text-white' : 'bg-white text-black'}`}
                            onClick={toggleMute}
                        >
                            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </Button>

                        {/* End Call Button */}
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-16 h-16 rounded-full shadow-lg bg-red-500 hover:bg-red-600 border-4 border-white/20"
                            onClick={endCall}
                        >
                            <PhoneOff className="w-8 h-8" />
                        </Button>

                    </div>
                </Card>
            )}
        </div>
    );
};

export default AIAssistant;
