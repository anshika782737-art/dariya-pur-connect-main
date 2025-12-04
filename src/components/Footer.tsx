import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-village-warm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-village-terracotta rounded-md flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-lg font-semibold text-foreground">
                {t("Dariyapur Azamgarh", "दरियापुर आज़मगढ़")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t(
                "A village of heritage, community, and natural splendor.",
                "विरासत, समुदाय और प्राकृतिक वैभव का एक गाँव।"
              )}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              {t("Explore", "अन्वेषण करें")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("About", "परिचय")}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Gallery", "गैलरी")}
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Events", "कार्यक्रम")}
                </Link>
              </li>
              <li>
                <Link to="/places" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Places to Visit", "दर्शनीय स्थल")}
                </Link>
              </li>
              <li>
                <Link to="/village-guide" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Village Guide", "गाँव गाइड")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              {t("Information", "जानकारी")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/administration" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Administration", "प्रशासन")}
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Community Notices", "समुदाय सूचनाएं")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-village-terracotta transition-colors">
                  {t("Contact Us", "संपर्क करें")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              {t("Contact", "संपर्क")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-village-terracotta flex-shrink-0" />
                <span>
                  {t("Village Office, Dariyapur", "ग्राम कार्यालय, दरियापुर")}<br />
                  {t("Azamgarh, Uttar Pradesh", "आज़मगढ़, उत्तर प्रदेश")}<br />
                  {t("PIN: 223224", "पिन: 223224")}
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-village-terracotta" />
                <span>contact@dariyapur.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 {t("Dariyapur Azamgarh. All rights reserved.", "दरियापुर आज़मगढ़। सर्वाधिकार सुरक्षित।")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
