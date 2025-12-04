import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { BookOpen, Home, Users, MapPin, Calendar, Thermometer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/Vmake1764854133884.png";
import historyImage from "@/assets/history-temple.png";


const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t("Rich History", "समृद्ध इतिहास"),
      description: t(
        "Discover the stories and landmarks that have shaped our village through the centuries.",
        "उन कहानियों और स्थलों की खोज करें जिन्होंने सदियों से हमारे गाँव को आकार दिया है।"
      ),
    },
    {
      icon: Home,
      title: t("Vibrant Culture", "जीवंत संस्कृति"),
      description: t(
        "From colorful festivals to traditional arts, our culture is the heartbeat of the community.",
        "रंगीन त्योहारों से लेकर पारंपरिक कलाओं तक, हमारी संस्कृति समुदाय की धड़कन है।"
      ),
    },
    {
      icon: Users,
      title: t("Strong Community", "मजबूत समुदाय"),
      description: t(
        "We pride ourselves on a close-knit community that supports and uplifts one another.",
        "हम एक घनिष्ठ समुदाय पर गर्व करते हैं जो एक दूसरे का समर्थन और उत्थान करता है।"
      ),
    },
  ];

  const galleryImages = [
    { src: "/images/home/village-road.jpg", alt: t("Village road with trees", "पेड़ों वाली गाँव की सड़क") },
    { src: "/images/home/temple.jpg", alt: t("Village temple", "गाँव का मंदिर") },
    { src: "/images/home/fields-1.jpg", alt: t("Green fields", "हरे खेत") },
    { src: "/images/home/fields-2.jpg", alt: t("Agricultural landscape", "कृषि परिदृश्य") },
  ];

  const stats = [
    { label: t("Households", "घर"), value: "380" },
    { label: t("Area (Hectares)", "क्षेत्र (हेक्टेयर)"), value: "245.26" },
    { label: t("PIN Code", "पिन कोड"), value: "223224" },
    { label: t("District", "जिला"), value: t("Azamgarh", "आज़मगढ़") },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={t("Dariyapur village aerial view", "दरियापुर गाँव का हवाई दृश्य")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="mb-6 animate-fade-in-up">
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-in-up animation-delay-100">
            {t("Welcome to Dariyapur Azamgarh", "दरियापुर आज़मगढ़ में आपका स्वागत है")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-8 animate-fade-in-up animation-delay-200">
            {t(
              "Discover the heart of our community, a village rich in history, culture, and natural beauty.",
              "हमारे समुदाय के हृदय की खोज करें, एक गाँव जो इतिहास, संस्कृति और प्राकृतिक सुंदरता से समृद्ध है।"
            )}
          </p>
          <div className="animate-fade-in-up animation-delay-300">
            <Button variant="village" size="lg" asChild>
              <Link to="/about">{t("Explore Our Village", "हमारे गाँव का अन्वेषण करें")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t("A Glimpse into Our History", "हमारे इतिहास की एक झलक")}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t(
                  "Dariyapur Azamgarh is a village with a rich heritage and a strong sense of community. For generations, our residents have built a life rooted in tradition, agriculture, and mutual support. Located in the historic Azamgarh district, our village carries the legacy of ancient sages and spiritual heritage.",
                  "दरियापुर आज़मगढ़ एक समृद्ध विरासत और मजबूत सामुदायिक भावना वाला गाँव है। पीढ़ियों से, हमारे निवासियों ने परंपरा, कृषि और पारस्परिक सहयोग में निहित जीवन का निर्माण किया है। ऐतिहासिक आज़मगढ़ जिले में स्थित, हमारा गाँव प्राचीन ऋषियों और आध्यात्मिक विरासत की विरासत को वहन करता है।"
                )}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t(
                  "The region is steeped in mythology, being the land of Sage Durvasa and connected to the epic Ramayana through Maharishi Valmiki's ashram. Explore our story and the values that define us.",
                  "यह क्षेत्र पौराणिक कथाओं में डूबा हुआ है, ऋषि दुर्वासा की भूमि होने के नाते और महर्षि वाल्मीकि के आश्रम के माध्यम से महाकाव्य रामायण से जुड़ा हुआ है। हमारी कहानी और उन मूल्यों का अन्वेषण करें जो हमें परिभाषित करते हैं।"
                )}
              </p>
              <Button variant="village" asChild>
                <Link to="/about">{t("Learn More", "और जानें")}</Link>
              </Button>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src={historyImage}
                  alt={t("Historic temple architecture", "ऐतिहासिक मंदिर वास्तुकला")}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-village-warm">
        <div className="container-narrow px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-village-terracotta mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              {t("Life in Dariyapur", "दरियापुर में जीवन")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
              {t(
                "Experience the unique blend of tradition and progress that defines our village life.",
                "परंपरा और प्रगति के अनूठे मिश्रण का अनुभव करें जो हमारे ग्रामीण जीवन को परिभाषित करता है।"
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-card hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Section */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              {t("Climate & Weather", "जलवायु और मौसम")}
            </h2>
            <p className="text-muted-foreground">
              {t("Humid subtropical climate with distinct seasons", "विशिष्ट मौसमों के साथ आर्द्र उपोष्णकटिबंधीय जलवायु")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background p-6 rounded-xl text-center hover-lift">
              <Thermometer className="w-8 h-8 mx-auto mb-2 text-village-terracotta" />
              <p className="text-2xl font-bold text-foreground">30.4°C</p>
              <p className="text-xs text-muted-foreground">{t("Avg. Temperature", "औसत तापमान")}</p>
            </div>
            <div className="bg-background p-6 rounded-xl text-center hover-lift">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-village-terracotta" />
              <p className="text-2xl font-bold text-foreground">1,031mm</p>
              <p className="text-xs text-muted-foreground">{t("Annual Rainfall", "वार्षिक वर्षा")}</p>
            </div>
            <div className="bg-background p-6 rounded-xl text-center hover-lift">
              <Thermometer className="w-8 h-8 mx-auto mb-2 text-village-green" />
              <p className="text-2xl font-bold text-foreground">{t("Oct-Mar", "अक्टू-मार्च")}</p>
              <p className="text-xs text-muted-foreground">{t("Best Time to Visit", "घूमने का सबसे अच्छा समय")}</p>
            </div>
            <div className="bg-background p-6 rounded-xl text-center hover-lift">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-village-gold" />
              <p className="text-2xl font-bold text-foreground">47.86%</p>
              <p className="text-xs text-muted-foreground">{t("Avg. Humidity", "औसत आर्द्रता")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
              {t("Explore Our Gallery", "हमारी गैलरी देखें")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
              {t(
                "A visual journey through the scenic landscapes, vibrant events, and daily life of Dariyapur Azamgarh.",
                "दरियापुर आज़मगढ़ के सुंदर परिदृश्यों, जीवंत कार्यक्रमों और दैनिक जीवन के माध्यम से एक दृश्य यात्रा।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden shadow-soft hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 animate-fade-in-up animation-delay-400">
            <Button variant="village-outline" asChild>
              <Link to="/gallery">{t("View Full Gallery", "पूरी गैलरी देखें")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-village-brown text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            {t("Connect With Our Community", "हमारे समुदाय से जुड़ें")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            {t(
              "Whether you're a resident, a former villager, or someone interested in our heritage, we welcome you to be part of our community.",
              "चाहे आप निवासी हों, पूर्व ग्रामीण हों, या हमारी विरासत में रुचि रखने वाले कोई व्यक्ति हों, हम आपका हमारे समुदाय का हिस्सा बनने के लिए स्वागत करते हैं।"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Button variant="village" size="lg" className="bg-primary-foreground text-village-brown hover:bg-primary-foreground/90" asChild>
              <Link to="/contact">{t("Get in Touch", "संपर्क करें")}</Link>
            </Button>
            <Button variant="village-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-village-brown" asChild>
              <Link to="/community">{t("Join Community", "समुदाय से जुड़ें")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
