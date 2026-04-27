import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

const TourCard = ({ tour, whatsappNumber }) => {
  const handleViewDetails = () => {
    // SMS: Hi, I'm interested in [Tour Name]. Please share more details.
    const message = `Hi, I'm interested in ${tour.name}. Please share more details.`;
    const finalUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56">
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow text-left">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{tour.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{tour.description}</p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-gray-600 text-xs">
            <MapPin size={14} className="mr-2 text-orange-600" />
            <span>{tour.locations}</span>
          </div>
          <div className="flex items-center text-gray-600 text-xs">
            <Clock size={14} className="mr-2 text-orange-600" />
            <span>{tour.duration}</span>
          </div>
          
          <button 
            onClick={handleViewDetails}
            className="w-full mt-4 bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center group"
          >
            View Details <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;