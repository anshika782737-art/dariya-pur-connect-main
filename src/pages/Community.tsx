import Layout from "@/components/Layout";
import { Users, Calendar, Bell, Star, Heart, Award, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Chat from "@/components/Chat";

const Community = () => {
  const { t } = useLanguage();

  const festivals = [
    { name: t("Holi", "होली"), month: t("March", "मार्च"), description: t("Festival of colors celebrating spring", "वसंत का जश्न मनाने वाला रंगों का त्योहार") },
    { name: t("Diwali", "दिवाली"), month: t("October/November", "अक्टूबर/नवंबर"), description: t("Festival of lights", "रोशनी का त्योहार") },
    { name: t("Eid", "ईद"), month: t("Variable", "परिवर्तनीय"), description: t("Islamic festival of joy and togetherness", "खुशी और एकजुटता का इस्लामी त्योहार") },
    { name: t("Chhath Puja", "छठ पूजा"), month: t("November", "नवंबर"), description: t("Ancient Hindu festival dedicated to Sun God", "सूर्य देव को समर्पित प्राचीन हिंदू त्योहार") },
    { name: t("Durga Puja", "दुर्गा पूजा"), month: t("October", "अक्टूबर"), description: t("Celebration of Goddess Durga", "देवी दुर्गा का उत्सव") },
    { name: t("Makar Sankranti", "मकर संक्रांति"), month: t("January", "जनवरी"), description: t("Harvest festival marking winter solstice", "शीतकालीन संक्रांति को चिह्नित करने वाला फसल उत्सव") },
  ];

  const communityValues = [
    { icon: Heart, title: t("Unity", "एकता"), description: t("Hindu-Muslim communal harmony has been a hallmark of our region", "हिंदू-मुस्लिम सांप्रदायिक सद्भाव हमारे क्षेत्र की पहचान रही है") },
    { icon: Users, title: t("Togetherness", "एकजुटता"), description: t("Strong bonds that support and uplift community members", "मजबूत बंधन जो समुदाय के सदस्यों का समर्थन और उत्थान करते हैं") },
    { icon: Award, title: t("Heritage", "विरासत"), description: t("Preserving traditions while embracing progress", "प्रगति को अपनाते हुए परंपराओं को संरक्षित करना") },
  ];

  const notices = [
    { title: t("Gram Sabha Meeting", "ग्राम सभा बैठक"), date: t("Monthly", "मासिक"), description: t("Regular panchayat meetings for community decisions", "सामुदायिक निर्णयों के लिए नियमित पंचायत बैठकें") },
    { title: t("Health Camp", "स्वास्थ्य शिविर"), date: t("Quarterly", "त्रैमासिक"), description: t("Free health checkups organized by PHC", "पीएचसी द्वारा आयोजित मुफ्त स्वास्थ्य जांच") },
    { title: t("Agricultural Training", "कृषि प्रशिक्षण"), date: t("Seasonal", "मौसमी"), description: t("Modern farming techniques workshops", "आधुनिक खेती तकनीक कार्यशालाएं") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-village-warm py-20">
        <div className="container-narrow px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center animate-scale-in">
            <Users className="w-8 h-8 text-village-terracotta" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t("Our Community", "हमारा समुदाय")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {t(
              "A close-knit community bound by shared values, traditions, and mutual support",
              "साझा मूल्यों, परंपराओं और आपसी सहयोग से बंधा एक घनिष्ठ समुदाय"
            )}
          </p>
        </div>
      </section>

      {/* Chat Section */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <MessageCircle className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {t("Community Chat", "सामुदायिक चैट")}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <Chat />
          </div>
        </div>
      </section>

      {/* Community Values */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center animate-fade-in-up">
            {t("Our Values", "हमारे मूल्य")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {communityValues.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-card shadow-soft hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Calendar className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {t("Festivals & Celebrations", "त्योहार और उत्सव")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivals.map((festival, index) => (
              <div
                key={festival.name}
                className="bg-card rounded-xl p-5 shadow-soft hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">{festival.name}</h3>
                  <span className="text-xs font-medium text-village-terracotta bg-village-terracotta/10 px-2 py-1 rounded">
                    {festival.month}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{festival.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Notices */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Bell className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">
              {t("Community Events", "सामुदायिक कार्यक्रम")}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {notices.map((notice, index) => (
              <div
                key={notice.title}
                className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-soft hover-lift animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-village-terracotta" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{notice.title}</h3>
                    <span className="text-xs text-muted-foreground">{notice.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notice.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="section-padding bg-village-brown text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl font-bold mb-4 animate-fade-in-up">
            {t("Be Part of Our Community", "हमारे समुदाय का हिस्सा बनें")}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-100">
            {t(
              "Whether you're a resident, someone who grew up here, or just interested in our village, we welcome you to connect with our community. Share stories, stay updated on events, and help preserve our heritage.",
              "चाहे आप निवासी हों, कोई ऐसा व्यक्ति जो यहाँ बड़ा हुआ हो, या बस हमारे गाँव में रुचि रखता हो, हम अपने समुदाय से जुड़ने के लिए आपका स्वागत करते हैं। कहानियाँ साझा करें, घटनाओं पर अपडेट रहें, और हमारी विरासत को संरक्षित करने में मदद करें।"
            )}
          </p>
          <div className="animate-fade-in-up animation-delay-200">
            <Button
              variant="village"
              size="lg"
              className="bg-primary-foreground text-village-brown hover:bg-primary-foreground/90"
              asChild
            >
              <Link to="/contact">{t("Get in Touch", "संपर्क करें")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
