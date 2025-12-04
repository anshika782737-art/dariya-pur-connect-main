import Layout from "@/components/Layout";
import { Building2, Users, FileText, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const governmentSchemes = [
  { name: "PM-KISAN", description: "Direct income support to farmers" },
  { name: "Ayushman Bharat", description: "Health insurance scheme" },
  { name: "MGNREGA", description: "Rural employment guarantee" },
  { name: "Pradhan Mantri Awas Yojana", description: "Housing for all" },
  { name: "Jal Jeevan Mission", description: "Clean drinking water" },
  { name: "PM Ujjwala Yojana", description: "Free LPG connections" },
];

const Administration = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-village-warm py-20">
        <div className="container-narrow px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center animate-scale-in">
            <Building2 className="w-8 h-8 text-village-terracotta" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Administration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Governance structure and administrative information for Dariyapur village
          </p>
        </div>
      </section>

      {/* Governance Structure */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center animate-fade-in-up">
            Local Governance Structure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { level: "Gram Panchayat", office: "Dariyapur", icon: Users },
              { level: "Block Office", office: "Phulpur", icon: Building2 },
              { level: "Tehsil Office", office: "Phulpur", icon: FileText },
              { level: "District HQ", office: "Azamgarh", icon: Building2 },
            ].map((item, index) => (
              <div
                key={item.level}
                className="bg-card rounded-2xl p-6 text-center shadow-soft hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-village-terracotta/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-village-terracotta" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{item.level}</h3>
                <p className="text-muted-foreground text-sm">{item.office}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center animate-fade-in-up">
            Government Schemes
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Various central and state government schemes available for residents
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {governmentSchemes.map((scheme, index) => (
              <div
                key={scheme.name}
                className="bg-background rounded-xl p-5 shadow-soft hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="font-semibold text-foreground mb-2">{scheme.name}</h3>
                <p className="text-sm text-muted-foreground">{scheme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Officials */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center animate-fade-in-up">
            Contact Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl p-8 shadow-soft animate-slide-in-left">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Gram Panchayat Office</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-village-terracotta mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">Gram Panchayat Bhawan, Dariyapur, Phulpur, Azamgarh - 223224</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-village-terracotta mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">Contact local directory</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-village-terracotta mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">contact@dariyapur.gov.in</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft animate-slide-in-right">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Important Offices</h3>
              <ul className="space-y-4 text-sm">
                <li className="pb-4 border-b border-border">
                  <p className="font-medium text-foreground">Block Development Office</p>
                  <p className="text-muted-foreground">Phulpur Block, Azamgarh</p>
                </li>
                <li className="pb-4 border-b border-border">
                  <p className="font-medium text-foreground">Tehsil Office</p>
                  <p className="text-muted-foreground">Phulpur Tehsil, Azamgarh</p>
                </li>
                <li className="pb-4 border-b border-border">
                  <p className="font-medium text-foreground">District Collectorate</p>
                  <p className="text-muted-foreground">Azamgarh District Office</p>
                </li>
                <li>
                  <p className="font-medium text-foreground">Police Station</p>
                  <p className="text-muted-foreground">Nearest: Phulpur PS</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 animate-fade-in-up animation-delay-300">
            <Button variant="village" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Administration;
