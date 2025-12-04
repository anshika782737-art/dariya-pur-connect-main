import Layout from "@/components/Layout";
import { MapPin, Compass, Mountain, Building } from "lucide-react";
import historyImage from "@/assets/places-banner.png";
import { useLanguage } from "@/contexts/LanguageContext";

const localAttractions = [
  {
    name: "Sage Durvasa Ashram Site",
    description: "Located approximately 6 km north of Phulpur tehsil headquarters, near the confluence of Tamsa and Majhu rivers. A place of great mythological significance.",
    distance: "~6 km from Phulpur",
  },
  {
    name: "Phulpur Town",
    description: "The tehsil headquarters with local markets, administrative offices, and essential services.",
    distance: "46 km from village",
  },
];

const districtAttractions = [
  {
    name: "Maharishi Valmiki Ashram",
    description: "The mythological site where the epic Ramayana was composed. According to legend, Sita spent her exile here.",
  },
  {
    name: "Dohrighat",
    description: "Located on the Saryu river bank, a place of religious importance.",
  },
  {
    name: "Mehnagar",
    description: "Historical town featuring a fort built by Harivansh Singh during the medieval period.",
  },
  {
    name: "Maharajganj",
    description: "Features the famous Bhairav Baba temple, attracting devotees from the region.",
  },
];

const nearbyCities = [
  { name: "Azamgarh City", description: "District headquarters with markets, hospitals, and educational institutions", distance: "46-50 km" },
  { name: "Varanasi", description: "Major spiritual and cultural center, one of the oldest cities in the world", distance: "107 km" },
  { name: "Jaunpur", description: "Historic city known for Sharqi architecture and educational heritage", distance: "64 km" },
  { name: "Mau", description: "Known for textile industry and saree weaving", distance: "44 km" },
];

const Places = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img src={historyImage} alt="Historical temple" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/80" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-up">
              Places to Visit
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl animate-fade-in-up animation-delay-100">
              Explore the spiritual, historical, and cultural sites in and around Dariyapur
            </p>
          </div>
        </div>
      </section>

      {/* Within Phulpur */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Compass className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Within Phulpur Tehsil</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {localAttractions.map((place, index) => (
              <div
                key={place.name}
                className="bg-card rounded-2xl p-6 shadow-soft hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-village-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-village-terracotta" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{place.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{place.description}</p>
                    <span className="text-xs font-medium text-village-terracotta">{place.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* District Attractions */}
      <section className="section-padding bg-village-warm">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Mountain className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Within Azamgarh District</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {districtAttractions.map((place, index) => (
              <div
                key={place.name}
                className="bg-background rounded-xl p-6 shadow-soft hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{place.name}</h3>
                <p className="text-muted-foreground text-sm">{place.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="section-padding bg-background">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Building className="w-8 h-8 text-village-terracotta" />
            <h2 className="font-serif text-3xl font-bold text-foreground">Major Cities Nearby</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {nearbyCities.map((city, index) => (
              <div
                key={city.name}
                className="bg-card rounded-2xl p-6 shadow-soft hover-lift animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{city.name}</h3>
                  <span className="px-3 py-1 bg-village-terracotta/10 text-village-terracotta rounded-full text-xs font-medium">
                    {city.distance}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{city.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Reach */}
      <section className="section-padding bg-village-brown text-primary-foreground">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center animate-fade-in-up">How to Reach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-primary-foreground/10 rounded-2xl p-6 animate-fade-in-up animation-delay-100">
              <h3 className="font-serif text-xl font-semibold mb-4">By Road</h3>
              <p className="text-sm text-primary-foreground/90">
                UPSRTC buses operate throughout Azamgarh district. Private taxis and auto-rickshaws
                available from Azamgarh and Shahganj.
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6 animate-fade-in-up animation-delay-200">
              <h3 className="font-serif text-xl font-semibold mb-4">By Rail</h3>
              <p className="text-sm text-primary-foreground/90">
                Azamgarh Railway Station is the nearest junction. Trains connect to Varanasi,
                Gorakhpur, and other major cities.
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6 animate-fade-in-up animation-delay-300">
              <h3 className="font-serif text-xl font-semibold mb-4">By Air</h3>
              <p className="text-sm text-primary-foreground/90">
                Manduri Airport (~9 km from Azamgarh) for domestic flights. Varanasi International
                Airport (~100 km) for international connections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Places;
