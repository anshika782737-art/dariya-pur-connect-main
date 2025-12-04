import Layout from "@/components/Layout";
import { GraduationCap, Thermometer, Droplets, Sun, Cloud, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const schools = [
  { name: "Central Public Academy (CPA)", type: "CBSE-affiliated" },
  { name: "New Cambridge Senior Secondary School", type: "Sanichar Bazar, Phoolpur" },
  { name: "U.P.S. Phoolpur", type: "Government School" },
  { name: "Sir Syed Girls School", type: "Girls Education" },
  { name: "Green Land Maa Prabhavti Public School", type: "Private" },
  { name: "Gyanam Vidya Schools", type: "Local Institution" },
];

const climateData = [
  { label: "Annual Average", value: "30.41°C", icon: Thermometer },
  { label: "Hottest Month", value: "May (40°C)", icon: Sun },
  { label: "Coldest Month", value: "January (19°C)", icon: Cloud },
  { label: "Annual Rainfall", value: "1,031 mm", icon: Droplets },
];

const crops = [
  "Wheat",
  "Rice",
  "Pulses",
  "Sugarcane",
  "Vegetables",
  "Oilseeds",
];

const Life = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-village-warm py-20">
        <div className="container-narrow px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-village-terracotta/10 flex items-center justify-center animate-scale-in">
            <Leaf className="w-8 h-8 text-village-terracotta" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
            Life in Village
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Discover education, climate, agriculture, and daily life in Dariyapur
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <GraduationCap className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Education & Literacy</h2>
          </div>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Schools in Phulpur Tehsil serving Dariyapur village children
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school, index) => (
              <div
                key={school.name}
                className="bg-card rounded-xl p-5 shadow-soft hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="font-semibold text-foreground mb-1">{school.name}</h3>
                <p className="text-sm text-muted-foreground">{school.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Climate */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center animate-fade-in-up">
            Climate & Weather
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Humid Subtropical climate (Köppen: Cwa) with dry winters
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {climateData.map((item, index) => (
              <div
                key={item.label}
                className="bg-background rounded-xl p-6 text-center shadow-soft hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-8 h-8 mx-auto mb-3 text-village-terracotta" />
                <p className="font-serif text-2xl font-bold text-foreground mb-1">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-6 shadow-soft animate-fade-in-up animation-delay-300">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Seasonal Information</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-2">Summer (March-June)</h4>
                <p className="text-muted-foreground">Hot and dry. May is the hottest month with temperatures reaching up to 51°C (record).</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Monsoon (July-September)</h4>
                <p className="text-muted-foreground">Southwest monsoon brings most of the annual rainfall. July is the wettest month (293.82 mm).</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Winter (October-February)</h4>
                <p className="text-muted-foreground">Pleasant weather. Best time to visit. January can see temperatures as low as 5°C.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agriculture */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center animate-fade-in-up">
            Agriculture & Economy
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Primary crops and agricultural activities common in the region
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-slide-in-left">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Major Crops</h3>
                <div className="flex flex-wrap gap-2">
                  {crops.map((crop) => (
                    <span key={crop} className="px-4 py-2 bg-village-terracotta/10 text-village-terracotta rounded-full text-sm font-medium">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="bg-card rounded-2xl p-6 shadow-soft h-full">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Livelihood Activities</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Traditional farming and agriculture</li>
                  <li>• Livestock rearing and dairy</li>
                  <li>• Small-scale cottage industries</li>
                  <li>• Local trade and markets</li>
                  <li>• Seasonal employment and migration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Life */}
      <section className="section-padding bg-village-brown text-primary-foreground">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl font-bold mb-4 animate-fade-in-up">
            Daily Life in Dariyapur
          </h2>
          <p className="text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-100">
            Life in Dariyapur follows the rhythm of agricultural seasons. Mornings begin early with 
            farmers heading to their fields, while women manage households and children attend 
            local schools. The village maintains strong traditional values while gradually embracing 
            modern amenities. Community gatherings, religious festivals, and social events form 
            the fabric of daily life, fostering bonds that have lasted generations.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Life;
