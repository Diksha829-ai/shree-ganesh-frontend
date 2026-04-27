import React from 'react';
import { Users, Fuel, Gauge, MessageCircle } from 'lucide-react';

const CarCard = ({ car, whatsappNumber, language, tripDetails }) => {
  
  const handleBooking = () => {
    // 1. Get the base message from your requirement
    let message = `Hi, I'm interested in booking ${car.name}. Please share availability and pricing.`;
    
    // 2. Add trip context if the user has filled out the search bar
    if (tripDetails && (tripDetails.pickup || tripDetails.drop)) {
      message += `\n\n--- Trip Details ---`;
      if (tripDetails.pickup) message += `\n*Pickup:* ${tripDetails.pickup}`;
      if (tripDetails.drop)   message += `\n*Drop:* ${tripDetails.drop}`;
      if (tripDetails.date)   message += `\n*Date:* ${tripDetails.date}`;
    }

    // 3. Encode and open WhatsApp
    const finalUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
      {/* Car Image with Type Badge */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
          {car.type}
        </div>
      </div>

      {/* Car Content */}
      <div className="p-5 text-left flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
        
        {/* Features Row */}
        <div className="flex items-center mt-3 space-x-4 text-gray-500 text-xs border-b pb-4">
          <div className="flex items-center">
            <Users size={14} className="mr-1 text-orange-600" />
            <span>{car.capacity}</span>
          </div>
          <div className="flex items-center">
            <Fuel size={14} className="mr-1 text-orange-600" />
            <span>AC</span>
          </div>
          <div className="flex items-center">
            <Gauge size={14} className="mr-1 text-orange-600" />
            <span>₹{car.pricePerKm}/km</span>
          </div>
        </div>

        {/* Short Description (if available) */}
        {car.desc && (
          <p className="mt-3 text-gray-400 text-xs italic leading-relaxed">
            {car.desc}
          </p>
        )}

        {/* Dynamic Booking Button */}
        <button 
          onClick={handleBooking}
          className="w-full mt-auto pt-4 flex items-center justify-center"
        >
          <div className="w-full bg-white border-2 border-orange-600 text-orange-600 font-bold py-2.5 rounded-xl hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm active:scale-95">
            <MessageCircle size={18} className="mr-2" /> 
            {language === 'mr' ? 'आत्ता बुक करा' : 'Book Now'}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CarCard;