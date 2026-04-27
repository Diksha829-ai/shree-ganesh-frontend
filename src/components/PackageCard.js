import React from 'react';
import { Clock, MapPin, ChevronRight } from 'lucide-react';

const PackageCard = ({ pkg }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
      <div className="h-56 overflow-hidden relative">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
           <span className="text-white font-bold text-lg">₹{pkg.price}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 font-marathi mb-2">{pkg.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{pkg.description}</p>
        <div className="flex items-center justify-between text-gray-600 text-xs font-bold border-t pt-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-orange-600" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={14} className="mr-1 text-orange-600" />
            <span>{pkg.location}</span>
          </div>
        </div>
        <button className="mt-4 flex items-center justify-center text-orange-600 font-bold text-sm hover:underline">
          View Details <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PackageCard;