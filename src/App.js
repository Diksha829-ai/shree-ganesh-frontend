import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  MessageCircle, Phone, Car, Map, Plane, Briefcase, 
  Star, ChevronLeft, ChevronRight, CheckCircle, 
  MapPin, ExternalLink 
} from 'lucide-react'; 
import CarCard from './components/CarCard';
import TourCard from './components/TourCard';
import Admin from './pages/Admin';

function App() {
  const WHATSAPP_NUMBER = "+919503901849";   
  
  const MY_PLACE_ID = "YOUR_ACTUAL_ID"; 
  const MAPS_URL = "https://maps.app.goo.gl/mAddYefdzZqEt6Bs9";

  const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : "https://shree-ganesh-backend.onrender.com"; 

  const GOOGLE_REVIEW_URL = useMemo(() => {
    if (MY_PLACE_ID && MY_PLACE_ID !== "YOUR_ACTUAL_ID") {
      return `https://search.google.com/local/writereview?placeid=${MY_PLACE_ID}`;
    }
    return "https://www.google.com/search?q=Shree+Ganesh+Tours+And+Travels+Navi+Mumbai";
  }, [MY_PLACE_ID]);

  const [cars, setCars] = useState([]);
  const [tours, setTours] = useState([]);
  const [language, setLanguage] = useState('mr');
  const [tripDetails, setTripDetails] = useState({ pickup: '', drop: '', date: '' });

  const navLinks = [
    { name: language === 'mr' ? 'होम' : 'Home', id: 'home' },
    { name: language === 'mr' ? 'सेवा' : 'Services', id: 'services' },
    { name: language === 'mr' ? 'टूर' : 'Tours', id: 'tours' },
    { name: language === 'mr' ? 'वाहने' : 'Fleet', id: 'fleet' },
    { name: language === 'mr' ? 'अभिप्राय' : 'Reviews', id: 'reviews' }
  ];

  const defaultFleet = useMemo(() => [
    { id: 1, name: "Swift Dzire", type: "Sedan", capacity: "4 Seater", pricePerKm: 13, image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323115/Swift_Dzire_n4iwse.png", desc: "Comfortable sedan for city and outstation travel" },
    { id: 2, name: "Ertiga", type: "MPV", capacity: "6-7 Seater", pricePerKm: 15, image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323103/Ertiga_iuzvjb.png", desc: "Perfect for family weekend trips" },
    { id: 3, name: "Innova Crysta", type: "SUV", capacity: "7 Seater", pricePerKm: 22, image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323108/Innova_Crysta_tyizdk.png", desc: "Premium comfort for long journeys" },
    { id: 4, name: "Tempo Traveller", type: "Mini Bus", capacity: "12-17 Seater", pricePerKm: 28, image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323114/Tempo_Traveller_ugyxpp.png", desc: "Ideal for large groups and corporate events" }
  ], []);

  const defaultTours = useMemo(() => [
    { id: 1, name: "Konkan Coastal Tour", locations: "Alibaug | Murud | Harihareshwar", duration: "3-4 Days", image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323125/Konkan_Coastal_Tour_ttslzr.png", description: "Experience the pristine beaches of Konkan" },
    { id: 2, name: "Ashtavinayak Darshan", locations: "8 Holy Ganesh Temples", duration: "2-3 Days", image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323117/Ashtavinayak_Darshan_yfnc4l.png", description: "Complete spiritual pilgrimage circuit" },
    { id: 3, name: "Mahabaleshwar & Panchgani", locations: "Venna Lake | Mapro Garden", duration: "3 Days", image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324340/mahabaleshwar_udcvtc.png", description: "Cool mountain retreat for families" },
    { id: 4, name: "Shirdi Shani Shingnapur", locations: "Shirdi | Shani Shingnapur", duration: "2 Days", image: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776323127/Shirdi_Shani_Shingnapur_o7ombj.png", description: "Peaceful religious tour from Navi Mumbai" }
  ], []);

  const destinations = [
    { name: "Alibaug", count: "05 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324859/alibag_q5fhci.png" },
    { name: "Lonavala", count: "04 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324833/lovavala_olswau.png" },
    { name: "Matheran", count: "03 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324340/mahabaleshwar_udcvtc.png" },
    { name: "Goa", count: "06 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324844/goa_ankp7t.png" },
    { name: "Pune", count: "05 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324139/Pune_coeqtq.png" }, 
    { name: "Nashik", count: "04 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324939/Mumbai_mtif7n.png" },
    { name: "Mahabaleshwar", count: "04 Places", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324340/mahabaleshwar_udcvtc.png" },
    { name: "Mumbai Airport", count: "24/7 Service", img: "https://res.cloudinary.com/dvwejdfd8/image/upload/v1776324939/Mumbai_mtif7n.png" }, 
  ];

  const content = {
    mr: {
      hero: "तुमचा प्रवास, आमची जबाबदारी!",
      sub: " सर्वोत्तम कार रेंटल आणि टूर पॅकेजेस",
      serviceTitle: "आमच्या सेवा",
      fleet: "आमची वाहने",
      tourTitle: "लोकप्रिय टूर पॅकेजेस",
      destTitle: "लोकप्रिय ठिकाणे",
      ctaTitle: "आजच तुमच्या सहलीचे नियोजन करा!",
      ctaSub: "श्री गणेश टूर्ससह तुमच्या आरामदायी प्रवासाचे बुकिंग करा",
      searchBtn: "कॅब शोधा"
    },
    en: {
      hero: "Your Travel, Our Responsibility!",
      sub: "Best Car Rentals & Tour Packages in Navi Mumbai",
      serviceTitle: "Our Services",
      fleet: "Our Fleet",
      tourTitle: "Popular Tours",
      destTitle: "Popular Places",
      ctaTitle: "Plan Your Trip Today!",
      ctaSub: "Book your comfortable and safe journey with Shree Ganesh Tours & Travels",
      searchBtn: "Search Cabs"
    }
  };

  const services = [
    { icon: <Car size={32} />, title: language === 'mr' ? "कार रेंटल" : "Car Rental", desc: language === 'mr' ? "नवी मुंबई आणि मुंबईसाठी सुस्थितीन वाहने" : "Well-maintained vehicles for Navi Mumbai & Mumbai region" },
    { icon: <Map size={32} />, title: language === 'mr' ? "टूर पॅकेजेस" : "Tour Packages", desc: language === 'mr' ? "सानुकूलित कौटुंबिक सहली" : "Customized tour packages for family and groups" },
    { icon: <Plane size={32} />, title: language === 'mr' ? "विमानतळ सेवा" : "Airport Pickup", desc: language === 'mr' ? "नवी मुंबई ते मुंबई विमानतळ २४/७ सेवा" : "Navi Mumbai to Mumbai Airport transfers 24x7" },
    { icon: <Briefcase size={32} />, title: language === 'mr' ? "कॉर्पोरेट प्रवास" : "Corporate Travel", desc: language === 'mr' ? "व्यावसायिक गरजांसाठी खास सेवा" : "Professional travel solutions for business needs" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carRes = await axios.get(`${API_BASE_URL}/api/fleet`);
        const tourRes = await axios.get(`${API_BASE_URL}/api/tours`);
        setCars(carRes.data.length > 0 ? carRes.data : defaultFleet);
        setTours(tourRes.data.length > 0 ? tourRes.data : defaultTours);
      } catch (err) {
        console.log("Fetch error, using default data.");
        setCars(defaultFleet);
        setTours(defaultTours);
      }
    };
    fetchData();
  }, [defaultFleet, defaultTours, API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({ ...prev, [name]: value }));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = () => {
    scrollToSection('fleet-section');
  };

  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div id="home" className="min-h-screen bg-white font-sans text-slate-900">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <img 
            src="https://res.cloudinary.com/dvwejdfd8/image/upload/v1777121988/ganpati-logo_ze32q7.png" 
            alt="Shree Ganesh Logo" 
            className="h-12 w-12 object-contain mr-1" 
          />
          <div>
            <h1 className="text-xl font-bold text-orange-600 leading-none">श्री गणेश टूर्स</h1>
            <p className="text-[9px] uppercase font-black text-gray-400 tracking-tighter">Navi Mumbai Travel Service</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center space-x-8 text-[#334155] font-medium">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollToSection(link.id === 'home' ? 'home' : `${link.id}-section`)}
              className="hover:text-orange-600 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')} className="text-[10px] font-bold border-2 border-orange-600 text-orange-600 px-3 py-1.5 rounded-full">
            {language === 'mr' ? 'EN' : 'मराठी'}
          </button>
          <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center space-x-2 border border-orange-600 text-orange-600 px-5 py-2 rounded-lg font-bold text-sm">
            <Phone size={16} />
            <span>Call</span>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`} className="flex items-center space-x-2 bg-[#10B981] text-white px-5 py-2 rounded-lg font-bold text-sm">
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[600px] flex items-center justify-center text-white text-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src="https://res.cloudinary.com/dvwejdfd8/image/upload/v1776951086/main_back_xkffmq.jpg" 
            alt="Navi Mumbai Travel" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
          <div className="relative z-20 max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">{content[language].hero}</h2>
            <p className="text-xl mb-10 opacity-95">{content[language].sub}</p>
            
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-gray-800 shadow-2xl mx-auto max-w-4xl">
              <div className="text-left border-b md:border-b-0 md:border-r border-gray-200 p-2">
                <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Pickup</label>
                <input type="text" name="pickup" value={tripDetails.pickup} onChange={handleInputChange} placeholder="Navi Mumbai" className="w-full outline-none font-bold text-gray-700 bg-transparent" />
              </div>
              <div className="text-left border-b md:border-b-0 md:border-r border-gray-200 p-2">
                <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Drop</label>
                <input type="text" name="drop" value={tripDetails.drop} onChange={handleInputChange} placeholder="Destination" className="w-full outline-none font-bold text-gray-700 bg-transparent" />
              </div>
              <div className="text-left border-b md:border-b-0 md:border-r border-gray-200 p-2">
                <label className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Date</label>
                <input type="date" name="date" min={today} value={tripDetails.date} onChange={handleInputChange} className="w-full outline-none font-bold text-gray-700 bg-transparent" />
              </div>
              <button onClick={handleSearch} className="bg-orange-600 text-white rounded-xl py-4 font-extrabold hover:bg-orange-700 shadow-lg transition-all">
                {content[language].searchBtn}
              </button>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services-section" className="py-20 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{content[language].serviceTitle}</h2>
          <div className="w-16 h-1 bg-orange-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-[#FFFBF5] p-8 rounded-2xl border border-orange-100 flex flex-col items-center hover:shadow-md transition-all">
                <div className="bg-orange-600 text-white p-4 rounded-xl mb-6 shadow-md">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR PLACES */}
        <section className="py-16 px-6 max-w-7xl mx-auto text-center border-t">
          <h2 className="text-3xl font-bold text-green-600 mb-8">{content[language].destTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {destinations.map((dest, i) => (
              <div key={i} className="relative h-48 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="font-bold text-lg">{dest.name}</span>
                  <div className="bg-green-500 text-[10px] px-2 py-0.5 rounded-full inline-block ml-2">{dest.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOURS */}
        <section id="tours-section" className="py-16 px-6 max-w-7xl mx-auto text-center bg-gray-50 border-y">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content[language].tourTitle}</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto mb-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {tours.map(tour => <TourCard key={tour.id || tour._id} tour={tour} whatsappNumber={WHATSAPP_NUMBER} />)}
          </div>
        </section>

        {/* FLEET */}
        <section id="fleet-section" className="py-20 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{content[language].fleet}</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto mb-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {cars.map(car => (
              <CarCard 
                key={car.id || car._id} 
                car={car} 
                whatsappNumber={WHATSAPP_NUMBER} 
                language={language} 
                tripDetails={tripDetails} 
              />
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews-section" className="py-24 bg-white px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{language === 'mr' ? 'आमच्या ग्राहकांचे मत' : 'What Our Customers Say'}</h2>
              <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
              <div className="bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-orange-200 transition-all">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}</div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"Best cab service in Navi Mumbai. Driver was punctual for our airport drop. Highly professional."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3">A</div>
                  <div><h4 className="font-bold text-slate-900 text-sm">Amit S.</h4><span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Verified Trip</span></div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-orange-200 transition-all">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}</div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"गाडी एकदम स्वच्छ होती. नवी मुंबई ते लोणावळा सहल खूप छान झाली. धन्यवाद श्री गणेश टूर्स!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3">V</div>
                  <div><h4 className="font-bold text-slate-900 text-sm">Vijay P.</h4><span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Verified Trip</span></div>
                </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-orange-200 transition-all">
                <div className="flex text-yellow-400 mb-4">{[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}</div>
                <p className="text-slate-700 mb-6 leading-relaxed italic">"Used their Tempo Traveller for a corporate outing from Airoli. Spacious vehicle and smooth driving."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold mr-3">R</div>
                  <div><h4 className="font-bold text-slate-900 text-sm">Rohini M.</h4><span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Verified Trip</span></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-t border-slate-100 pt-12">
              <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-white border-2 border-slate-200 px-6 py-2.5 rounded-full font-bold shadow-sm">
                <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="w-4 h-4" alt="Google" />
                <span>Review on Google</span>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=Hi! Feedback for my trip.`} className="flex items-center space-x-2 bg-[#25D366] text-white px-6 py-2.5 rounded-full font-bold shadow-md">
                <MessageCircle size={18} />
                <span>{language === 'mr' ? 'व्हॉट्सॲपवर कळवा' : 'Send via WhatsApp'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* VISIT OFFICE SECTION */}
        <section className="py-16 px-6 bg-gray-100 border-t">
          <div className="max-w-6xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Visit Our Office</h2>
             <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-orange-600 flex flex-col justify-between max-w-lg mx-auto">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-orange-600">Shree Ganesh Tours And Travels</h3>
                      <div className="space-y-6">
                         <div className="flex items-start">
                            <MapPin className="text-orange-600 mr-4 shrink-0" size={28} />
                            <p className="text-gray-700 font-semibold leading-relaxed text-lg">
                             Flat No : 202 , GURUKRUPA APARTMENT KALAMBOLI VILLAPANVEL RAIGARH, Panvel, Navi Mumbai, Panvel, Maharashtra 410218
                            </p>
                         </div>
                         <div className="flex items-center">
                            <Phone className="text-orange-600 mr-4 shrink-0" size={28} />
                            <p className="text-gray-700 font-bold text-xl">{WHATSAPP_NUMBER}</p>
                         </div>
                         <div className="flex items-center">
                            <CheckCircle className="text-green-500 mr-4 shrink-0" size={28} />
                            <p className="text-gray-700 font-bold text-lg uppercase">Open 24 Hours / 7 Days</p>
                         </div>
                      </div>
                    </div>
                    
                    {/* Integrated View on Google Maps Button */}
                    <div className="mt-10">
                      <a 
                        href={MAPS_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 bg-[#f25c05] text-white w-full py-4 rounded-2xl font-bold hover:bg-[#d45104] transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <ExternalLink size={22} />
                        <span className="text-lg">View on Google Maps</span>
                      </a>
                      <p className="text-center text-xs text-gray-400 mt-4 italic">Click above to see directions & our location on Google</p>
                    </div>
                </div>
             </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-orange-600 py-16 px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">{content[language].ctaTitle}</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
            <a href={`tel:${WHATSAPP_NUMBER}`} className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold flex items-center shadow-lg transition-transform hover:scale-105"><Phone size={20} className="mr-2" /> Call Now</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`} className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold flex items-center shadow-lg transition-transform hover:scale-105"><MessageCircle size={20} className="mr-2" /> WhatsApp Booking</a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">श्री गणेश टूर्स अँड ट्रॅव्हल्स</h3>
            <p className="text-slate-400 mb-6 max-w-sm">Safe and reliable journeys across Navi Mumbai & beyond.</p>
            <div className="space-y-3">
              <p className="flex items-center text-slate-300 font-bold text-lg"><Phone size={18} className="mr-3 text-orange-500" />{WHATSAPP_NUMBER}</p>
              <div className="flex items-start text-slate-300">
                <MapPin size={18} className="mr-3 mt-1 text-orange-500" />
                <p>Flat No : 202 , GURUKRUPA APARTMENT KALAMBOLI VILLAPANVEL RAIGARH, Panvel, Navi Mumbai, Panvel, Maharashtra 410218</p>
              </div>
              <p className="flex items-center text-slate-300"><Briefcase size={18} className="mr-3 text-orange-500" /> yogesh.katkar93@gmail.com</p>
            </div>
          </div>
          <div className="text-slate-500 text-sm md:text-right flex flex-col justify-end h-full">
            <p>© 2026 श्री गणेश टूर्स आणि ट्रॅव्हल्स. All rights reserved.</p>
            <p className="mt-2 text-slate-400 font-medium">Developed by <span className="text-orange-500 font-bold">Diksha Nikam</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;