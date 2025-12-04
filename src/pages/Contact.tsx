import { useState } from "react";
import Layout from "@/components/Layout";
import { MapPin, Mail, Phone, Send, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("Message Sent!", "संदेश भेजा गया!"),
      description: t("Thank you for contacting us. We will get back to you soon.", "हमसे संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।"),
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-village-warm py-20">
        <div className="container-narrow px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center animate-scale-in">
            <Mail className="w-8 h-8 text-village-terracotta" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t("Contact Us", "हमसे संपर्क करें")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            {t("Have questions or want to connect? We'd love to hear from you", "कोई प्रश्न है या जुड़ना चाहते हैं? हम आपसे सुनना पसंद करेंगे")}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                {t("Send us a Message", "हमें संदेश भेजें")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("Your Name", "आपका नाम")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-village-terracotta focus:border-transparent transition-all"
                    placeholder={t("Enter your name", "अपना नाम दर्ज करें")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("Email Address", "ईमेल पता")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-village-terracotta focus:border-transparent transition-all"
                    placeholder={t("your@email.com", "आपका@ईमेल.com")}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    {t("Subject", "विषय")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-village-terracotta focus:border-transparent transition-all"
                  >
                    <option value="">{t("Select a subject", "विषय चुनें")}</option>
                    <option value="general">{t("General Inquiry", "सामान्य पूछताछ")}</option>
                    <option value="visit">{t("Planning a Visit", "यात्रा की योजना")}</option>
                    <option value="history">{t("Historical Information", "ऐतिहासिक जानकारी")}</option>
                    <option value="connect">{t("Connect with Residents", "निवासियों से जुड़ें")}</option>
                    <option value="other">{t("Other", "अन्य")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t("Message", "संदेश")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-village-terracotta focus:border-transparent transition-all resize-none"
                    placeholder={t("Your message...", "आपका संदेश...")}
                  />
                </div>

                <Button type="submit" variant="village" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {t("Send Message", "संदेश भेजें")}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-in-right">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                {t("Contact Information", "संपर्क जानकारी")}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-village-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("Address", "पता")}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t("Village Office, Dariyapur", "ग्राम कार्यालय, दरियापुर")}<br />
                        {t("Tehsil: Phulpur", "तहसील: फूलपुर")}<br />
                        {t("District: Azamgarh", "जिला: आज़मगढ़")}<br />
                        {t("Uttar Pradesh - 223224", "उत्तर प्रदेश - 223224")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-village-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("Email", "ईमेल")}</h3>
                      <p className="text-muted-foreground text-sm">contact@dariyapur.gov.in</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-village-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("Block Development Office", "ब्लॉक विकास कार्यालय")}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t("Phulpur Block Office", "फूलपुर ब्लॉक कार्यालय")}<br />
                        {t("Azamgarh District", "आज़मगढ़ जिला")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-village-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t("Office Hours", "कार्यालय समय")}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t("Monday - Saturday", "सोमवार - शनिवार")}<br />
                        {t("10:00 AM - 5:00 PM", "सुबह 10:00 - शाम 5:00")}<br />
                        {t("(Closed on Sundays & Public Holidays)", "(रविवार और सार्वजनिक छुट्टियों पर बंद)")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-village-warm">
        <div className="container-narrow px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4 animate-fade-in-up">
            {t("Find Us", "हमें खोजें")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto animate-fade-in-up animation-delay-100">
            {t(
              "Dariyapur is located in Phulpur Tehsil, Azamgarh District, Uttar Pradesh. The village is approximately 46 km west of Phulpur Tehsil headquarters.",
              "दरियापुर फूलपुर तहसील, आज़मगढ़ जिला, उत्तर प्रदेश में स्थित है। गाँव फूलपुर तहसील मुख्यालय से लगभग 46 किमी पश्चिम में है।"
            )}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
