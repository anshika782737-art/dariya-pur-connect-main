import React from "react";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { MapPin, Navigation, Calendar, BookOpen, Train, Plane, Cloud, History, Users, Building, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VillageProfile = () => {
    return (
        <Layout>
            <Helmet>
                <title>Top 21 Facts About Dariya Pur Village Azamgarh – Powerful Mixed-Language Guide (2025)</title>
                <meta
                    name="description"
                    content="Learn everything about Dariya Pur Village Azamgarh including location, population, climate, culture, history, transportation, festivals, and village development—written in Hindi + English + Hinglish mix."
                />
                <meta name="keywords" content="Dariya Pur Village Azamgarh, Phulpur village details, Dariyapur Azamgarh, Village Life, 223224, Azamgarh tourism" />
                <link rel="canonical" href="https://dariyapur-connect.netlify.app/profile-about" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-village-terracotta text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 container-narrow text-center px-4">
                    <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                        Complete Guide to Dariya Pur Village Azamgarh
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 animate-fade-in-up animation-delay-100">
                        A Beautiful Blend of Heritage, Nature & Culture
                    </p>
                </div>
            </section>

            <div className="container-narrow py-12 space-y-12">

                {/* Introduction */}
                <section className="prose prose-lg max-w-none">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta">
                        <MapPin className="w-6 h-6" />
                        Introduction to Dariya Pur Village Azamgarh
                    </h2>
                    <p>
                        Dariya Pur Village Azamgarh ek chhota sa par bahut hi khoobsurat gaon hai, jo Uttar Pradesh ke Azamgarh district mein located hai. Ye gaon apni shaant zindagi, natural beauty, aur friendly logon ke liye jaana jata hai. Mixed culture, rich traditions, aur strong community bonding is gaon ka real heart hai.
                    </p>
                    <p>
                        Is article mein hum <strong>Dariya Pur Village Azamgarh</strong> ke baare mein A-to-Z information provide kar rahe hain—location se lekar climate, history se lekar connectivity, aur festivals se lekar economy tak.
                    </p>
                </section>

                {/* Location & Administrative Details */}
                <section className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-4">
                        <Building className="w-6 h-6" />
                        Location & Administrative Details
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Basic Location Information</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li><strong>Full Name:</strong> Dariya Pur Village</li>
                                <li><strong>District:</strong> Azamgarh</li>
                                <li><strong>Tehsil/Block:</strong> Phulpur</li>
                                <li><strong>State:</strong> Uttar Pradesh</li>
                                <li><strong>PIN Code:</strong> 223224</li>
                                <li><strong>Village Code:</strong> 195010</li>
                                <li><strong>Division:</strong> Azamgarh Division</li>
                            </ul>
                            <p className="mt-2 text-sm italic text-muted-foreground">Ye saari details website visitors ko clear administrative idea deti hain.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Geographic Position</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>Phulpur se approx <strong>46 km west</strong></li>
                                <li>Azamgarh se <strong>46–50 km distance</strong></li>
                                <li>Nearest major town: <strong>Shahganj</strong></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Area & Demographics */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-village-warm/30 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-village-terracotta mb-3">
                            <MapPin className="w-5 h-5" />
                            Area & Land Details
                        </h2>
                        <ul className="space-y-2">
                            <li>Total land area: <strong>245.26 hectares</strong></li>
                            <li>Approx acres: <strong>605.8 acres</strong></li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground">Yahaan agriculture main occupation ho sakta hai, par verified data required hai.</p>
                    </div>

                    <div className="bg-village-warm/30 rounded-2xl p-6">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-village-terracotta mb-3">
                            <Users className="w-5 h-5" />
                            Demographics & Population
                        </h2>
                        <ul className="space-y-2">
                            <li>Total <strong>380 households</strong></li>
                            <li>Census 2011 ka verified population data specifically is village code ke liye available nahi hai</li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground">Isliye, website me note add karna important hai ki “Local panchayat se accurate census verify karein.”</p>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-4">
                        <BookOpen className="w-6 h-6" />
                        Education & Literacy
                    </h2>
                    <p className="mb-4">Gaon ke aas-paas kai schools Phulpur tehsil mein available hain:</p>
                    <div className="bg-card p-6 rounded-xl border border-border/50">
                        <h3 className="text-lg font-semibold mb-3">Nearby Schools</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Central Public Academy (CPA)</li>
                            <li>New Cambridge Senior Secondary School</li>
                            <li>Sir Syed Girls School</li>
                            <li>Green Land Maa Prabhavti Public School</li>
                        </ul>
                        <p className="mt-4 text-sm text-muted-foreground">Directly Dariya Pur ke schools ka information missing hai—local survey recommended.</p>
                    </div>
                </section>

                {/* Transportation */}
                <section>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-6">
                        <Navigation className="w-6 h-6" />
                        Transportation & Connectivity
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-card p-5 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-village-terracotta/10 rounded-full flex items-center justify-center mb-3">
                                <Navigation className="w-5 h-5 text-village-terracotta" />
                            </div>
                            <h3 className="font-semibold mb-2">Road Connectivity</h3>
                            <p className="text-sm text-muted-foreground">UPSRTC Azamgarh district me active bus routes operate karta hai.</p>
                        </div>
                        <div className="bg-card p-5 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-village-terracotta/10 rounded-full flex items-center justify-center mb-3">
                                <Train className="w-5 h-5 text-village-terracotta" />
                            </div>
                            <h3 className="font-semibold mb-2">Rail Connectivity</h3>
                            <p className="text-sm text-muted-foreground mb-2">Nearest major station: <strong>Azamgarh Railway Station</strong></p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>Sidhari Halt – 3 km</li>
                                <li>Sarai Rani – 8 km</li>
                                <li>Sathiaon – 12 km</li>
                            </ul>
                        </div>
                        <div className="bg-card p-5 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-village-terracotta/10 rounded-full flex items-center justify-center mb-3">
                                <Plane className="w-5 h-5 text-village-terracotta" />
                            </div>
                            <h3 className="font-semibold mb-2">Air Connectivity</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>Nearest domestic: <strong>Manduri Airport (9 km)</strong></li>
                                <li>Nearest international: <strong>Varanasi Airport (~100 km)</strong></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Climate */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-2xl">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-4">
                        <Cloud className="w-6 h-6" />
                        Climate & Weather Conditions
                    </h2>
                    <p className="mb-4">Azamgarh climate humid subtropical hot summers + cold winters ka mixture hai.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl">
                            <h3 className="font-semibold text-sm">Temperature</h3>
                            <p className="text-2xl font-bold my-1">30.41°C</p>
                            <p className="text-xs text-muted-foreground">Annual Average</p>
                        </div>
                        <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl">
                            <h3 className="font-semibold text-sm">Extremes</h3>
                            <p className="text-sm mt-1">Hottest: <strong>May (40°C+)</strong></p>
                            <p className="text-sm">Coldest: <strong>Jan (5°C)</strong></p>
                        </div>
                        <div className="bg-white/60 dark:bg-black/20 p-4 rounded-xl">
                            <h3 className="font-semibold text-sm">Best Time to Visit</h3>
                            <p className="text-lg font-bold text-village-terracotta mt-1">Oct - Mar</p>
                            <p className="text-xs text-muted-foreground">Pleasant weather</p>
                        </div>
                    </div>
                </section>

                {/* History */}
                <section>
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-4">
                        <History className="w-6 h-6" />
                        Historical & Cultural Background
                    </h2>
                    <div className="bg-village-brown text-white p-6 rounded-2xl">
                        <p className="mb-4 opacity-90">Dariya Pur Village Azamgarh ka history directly documented nahi, lekin district ka heritage kaafi rich hai.</p>
                        <ul className="space-y-3 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                <span>Sage Durvasa ka ashram Phulpur area me hi located tha</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                <span>Valmiki ji ne Ramayana bhi isi region me compose kiya</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                                <span>Medieval times: Mughal influence</span>
                            </li>
                        </ul>
                        <p className="font-medium italic opacity-90">Cultural harmony—Hindu-Muslim unity—Azamgarh ki identity ka core part hai.</p>
                    </div>
                </section>

                {/* Economy & Governance */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-village-terracotta mb-3">Economy & Livelihood</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Wheat, rice, pulses farming</li>
                            <li>Sugarcane cultivation</li>
                            <li>Dairy and livestock</li>
                            <li>Daily wage labor & migration</li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground">Local survey se exact data collect karna zaroori hai.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-village-terracotta mb-3">Governance</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Gaon ka operation Gram Panchayat ke through hota hai</li>
                            <li>Block office: <strong>Phulpur</strong></li>
                            <li>District HQ: <strong>Azamgarh</strong></li>
                        </ul>
                    </div>
                </section>

                {/* Attractions */}
                <section>
                    <h2 className="text-2xl font-bold text-village-terracotta mb-4">Nearby Attractions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-5 rounded-xl border border-border/50">
                            <h3 className="font-semibold mb-2">Within Phulpur</h3>
                            <p className="text-muted-foreground">Durvasa Ashram (6 km from tehsil HQ)</p>
                        </div>
                        <div className="bg-card p-5 rounded-xl border border-border/50">
                            <h3 className="font-semibold mb-2">Within Azamgarh District</h3>
                            <ul className="text-muted-foreground space-y-1">
                                <li>Maharishi Valmiki Ashram</li>
                                <li>Mehnagar Fort</li>
                                <li>Dohrighat</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="bg-village-warm/20 p-6 rounded-2xl">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-village-terracotta mb-6">
                        <HelpCircle className="w-6 h-6" />
                        FAQs About Dariya Pur Village Azamgarh
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q1: Dariya Pur Village Azamgarh kaha located hai?</h3>
                            <p className="text-muted-foreground mt-1">Phulpur tehsil ke west side me approx 46 km distance par.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q2: Is gaon ka PIN code kya hai?</h3>
                            <p className="text-muted-foreground mt-1">223224.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q3: Nearest railway station kaun sa hai?</h3>
                            <p className="text-muted-foreground mt-1">Azamgarh Railway Station.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q4: Best time to visit village kab hai?</h3>
                            <p className="text-muted-foreground mt-1">October–March.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q5: Gaon me kitne households hain?</h3>
                            <p className="text-muted-foreground mt-1">Around 380 households.</p>
                        </div>
                        <div className="bg-card p-4 rounded-xl">
                            <h3 className="font-semibold text-foreground">Q6: Kya village ka population data available hai?</h3>
                            <p className="text-muted-foreground mt-1">Specific verified census data unavailable — local panchayat se confirm karein.</p>
                        </div>
                    </div>
                </section>

                {/* Conclusion */}
                <section className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-village-terracotta mb-4">Conclusion</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Dariya Pur Village Azamgarh ek naturally rich, culturally vibrant aur historically connected rural destination hai. Is article ne aapko gaon ke baare me clear, mixed-language, SEO-friendly overview diya. Accurate data collect karke aap is website ko aur bhi powerful bana sakte hain.
                    </p>

                    <Button asChild size="lg" className="bg-village-terracotta hover:bg-village-terracotta/90">
                        <Link to="/">Back to Home</Link>
                    </Button>
                </section>

            </div>
        </Layout>
    );
};

export default VillageProfile;
