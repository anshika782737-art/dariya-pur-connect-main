import Layout from "@/components/Layout";
import { MapPin, Navigation, Train, Plane, Mountain, Info } from "lucide-react";
import heroImage from "@/assets/about-banner.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const { t } = useLanguage();

  const locationDetails = [
    { label: t("Full Name", "पूरा नाम"), value: t("Dariya Pur Village", "दरिया पुर गाँव") },
    { label: t("District", "जिला"), value: t("Azamgarh", "आज़मगढ़") },
    { label: t("Tehsil/Block", "तहसील/ब्लॉक"), value: t("Phulpur", "फूलपुर") },
    { label: t("State", "राज्य"), value: t("Uttar Pradesh", "उत्तर प्रदेश") },
    { label: t("PIN Code", "पिन कोड"), value: "223224" },
    { label: t("Village Code", "गाँव कोड"), value: "195010" },
    { label: t("Division", "मंडल"), value: t("Azamgarh Division", "आज़मगढ़ मंडल") },
  ];

  const distances = [
    { place: t("Phulpur (Tehsil HQ)", "फूलपुर (तहसील मुख्यालय)"), distance: t("46 km west", "46 किमी पश्चिम") },
    { place: t("Azamgarh (District HQ)", "आज़मगढ़ (जिला मुख्यालय)"), distance: "46-50 km" },
    { place: t("Shahganj (Nearest Town)", "शाहगंज (निकटतम शहर)"), distance: t("Nearby", "समीप") },
    { place: t("Varanasi", "वाराणसी"), distance: "107 km" },
    { place: t("Lucknow", "लखनऊ"), distance: "298 km" },
    { place: t("Delhi", "दिल्ली"), distance: "824 km" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Dariyapur village" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
              {t("About Dariyapur", "दरियापुर के बारे में")}
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl animate-fade-in-up animation-delay-100">
              {t("Learn about our village's location, history, and heritage", "हमारे गाँव के स्थान, इतिहास और विरासत के बारे में जानें")}
            </p>
          </div>

          {/* SEO Button */}
          <div className="absolute bottom-4 right-4 animate-fade-in-up animation-delay-200">
            <Button asChild variant="outline" className="bg-white/90 hover:bg-white text-village-terracotta border-village-terracotta/20 shadow-lg backdrop-blur-sm">
              <Link to="/profile-about" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                {t("Village Profile", "गाँव परिचय")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-village-terracotta" />
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  {t("Location & Administrative Details", "स्थान और प्रशासनिक विवरण")}
                </h2>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <dl className="space-y-4">
                  {locationDetails.map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-border pb-3 last:border-0">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="font-medium text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="flex items-center gap-3 mb-6">
                <Navigation className="w-8 h-8 text-village-terracotta" />
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  {t("Geographic Position", "भौगोलिक स्थिति")}
                </h2>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <p className="text-muted-foreground mb-4">
                  <strong className="text-foreground">{t("Total Geographic Area:", "कुल भौगोलिक क्षेत्र:")}</strong> {t("245.26 hectares (approximately 605.8 acres)", "245.26 हेक्टेयर (लगभग 605.8 एकड़)")}
                </p>
                <h4 className="font-semibold text-foreground mb-3">
                  {t("Distances from Major Places:", "प्रमुख स्थानों से दूरी:")}
                </h4>
                <ul className="space-y-2">
                  {distances.map((item) => (
                    <li key={item.place} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.place}</span>
                      <span className="font-medium text-foreground">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demographics */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center animate-fade-in-up">
            {t("Demographics & Population", "जनसांख्यिकी और जनसंख्या")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background rounded-2xl p-8 text-center shadow-soft hover-lift animate-scale-in">
              <p className="font-serif text-4xl font-bold text-village-terracotta mb-2">380</p>
              <p className="text-muted-foreground">{t("Total Households", "कुल परिवार")}</p>
            </div>
            <div className="bg-background rounded-2xl p-8 text-center shadow-soft hover-lift animate-scale-in animation-delay-100">
              <p className="font-serif text-4xl font-bold text-village-terracotta mb-2">245.26</p>
              <p className="text-muted-foreground">{t("Hectares Area", "हेक्टेयर क्षेत्र")}</p>
            </div>
            <div className="bg-background rounded-2xl p-8 text-center shadow-soft hover-lift animate-scale-in animation-delay-200">
              <p className="font-serif text-4xl font-bold text-village-terracotta mb-2">195010</p>
              <p className="text-muted-foreground">{t("Village Code", "गाँव कोड")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center animate-fade-in-up">
            {t("Transportation & Connectivity", "परिवहन और कनेक्टिविटी")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up animation-delay-100">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center mb-4">
                  <Navigation className="w-6 h-6 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {t("Road Connectivity", "सड़क कनेक्टिविटी")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("Nearest Town: Shahganj", "निकटतम शहर: शाहगंज")}</li>
                  <li>• {t("UPSRTC bus services available", "यूपीएसआरटीसी बस सेवाएं उपलब्ध")}</li>
                  <li>• {t("Well-connected to major cities", "प्रमुख शहरों से अच्छी कनेक्टिविटी")}</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-200">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center mb-4">
                  <Train className="w-6 h-6 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {t("Railway", "रेलवे")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("Nearest Junction: Azamgarh Railway Station", "निकटतम जंक्शन: आज़मगढ़ रेलवे स्टेशन")}</li>
                  <li>• {t("Connects to Varanasi, Gorakhpur, Mau", "वाराणसी, गोरखपुर, मऊ से जुड़ा")}</li>
                  <li>• {t("Sidhari Halt (3 km from Azamgarh)", "सिधारी हाल्ट (आज़मगढ़ से 3 किमी)")}</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-300">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center mb-4">
                  <Plane className="w-6 h-6 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {t("Air Connectivity", "हवाई कनेक्टिविटी")}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {t("Manduri Airport (~9 km from Azamgarh)", "मंदुरी हवाई अड्डा (~9 किमी आज़मगढ़ से)")}</li>
                  <li>• {t("Varanasi International Airport (~100 km)", "वाराणसी अंतर्राष्ट्रीय हवाई अड्डा (~100 किमी)")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="section-padding bg-village-brown text-primary-foreground">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Mountain className="w-8 h-8" />
            <h2 className="font-serif text-3xl font-bold">
              {t("Historical & Cultural Heritage", "ऐतिहासिक और सांस्कृतिक विरासत")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-foreground/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">
                {t("Ancient History", "प्राचीन इतिहास")}
              </h3>
              <ul className="space-y-3 text-primary-foreground/90 text-sm">
                <li>• {t("Land of Sage Durvasa, whose ashram was in Phulpur tehsil", "महर्षि दुर्वासा की भूमि, जिनका आश्रम फूलपुर तहसील में था")}</li>
                <li>• {t("Site of Maharishi Valmiki's ashram where Ramayana was composed", "महर्षि वाल्मीकि के आश्रम का स्थान जहाँ रामायण की रचना हुई")}</li>
                <li>• {t("Sita spent her exile here and gave birth to Luv-Kush", "सीता ने यहाँ अपना वनवास बिताया और लव-कुश को जन्म दिया")}</li>
                <li>• {t("In the Ramayana period, ruled by Rajbhar community", "रामायण काल में, राजभर समुदाय का शासन")}</li>
              </ul>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">
                {t("Medieval Period", "मध्यकालीन युग")}
              </h3>
              <ul className="space-y-3 text-primary-foreground/90 text-sm">
                <li>• {t("Region came under Mughal control", "क्षेत्र मुगल नियंत्रण में आया")}</li>
                <li>• {t("Local rulers like Vikramajit of Mehnagar", "मेहनगर के विक्रमजीत जैसे स्थानीय शासक")}</li>
                <li>• {t("Azamgarh established on ruins of ancient villages", "आज़मगढ़ प्राचीन गाँवों के खंडहरों पर स्थापित")}</li>
                <li>• {t("Known for Hindu-Muslim communal harmony", "हिंदू-मुस्लिम सांप्रदायिक सद्भाव के लिए प्रसिद्ध")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
