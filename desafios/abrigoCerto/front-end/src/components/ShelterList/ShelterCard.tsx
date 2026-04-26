import React from 'react';
import { MapPin, Dog, Accessibility, Navigation, Clock } from 'lucide-react';
import { Shelter } from '../../services/shelterService';
import { formatTimeAgo } from '../../utils/formatters';

interface ShelterCardProps {
  shelter: Shelter;
}

export const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  const occupied = shelter.capacity_total - shelter.capacity_available;
  const occupationRate = (occupied / shelter.capacity_total) * 100;
  
  let barColor = 'bg-green-500';
  let textColor = 'text-green-600';
  if (occupationRate >= 90) {
    barColor = 'bg-red-500';
    textColor = 'text-red-600';
  } else if (occupationRate >= 70) {
    barColor = 'bg-yellow-500';
    textColor = 'text-yellow-600';
  }

  const googleMapsUrl = shelter.latitude && shelter.longitude 
    ? `https://www.google.com/maps/search/?api=1&query=${shelter.latitude},${shelter.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shelter.address}, ${shelter.neighborhood}, ${shelter.city}`)}`;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-xl text-gray-800 leading-tight">{shelter.name}</h3>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
          shelter.status === 'aberto' ? 'bg-green-100 text-green-700' : 
          shelter.status === 'lotado' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {shelter.status}
        </span>
      </div>
      
      <p className="text-gray-500 text-sm flex items-start gap-1.5 mb-2">
        <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" /> 
        <span>{shelter.address}, {shelter.neighborhood}, {shelter.city}</span>
      </p>

      <div className="flex items-center gap-1 text-xs text-gray-400 mb-6">
        <Clock size={12} />
        <span>{formatTimeAgo(shelter.updated_at)}</span>
      </div>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Ocupação Atual</span>
          <span className={`text-sm font-bold ${textColor}`}>
            {Math.round(occupationRate)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div 
            className={`${barColor} h-full rounded-full transition-all duration-700 ease-out`} 
            style={{ width: `${Math.min(occupationRate, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[11px] text-gray-500 font-medium">
          <span>{occupied} ocupados</span>
          <span>{shelter.capacity_available} vagas livres</span>
        </div>
      </div>

      <div className="mt-auto pt-5 border-t border-gray-50 flex justify-between items-center">
        <div className="flex gap-2">
          {shelter.accepts_pets && (
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100" title="Aceita Pets">
              <Dog size={18} />
            </div>
          )}
          {shelter.accessibility && (
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600 border border-purple-100" title="Acessível">
              <Accessibility size={18} />
            </div>
          )}
        </div>
        
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95"
        >
          <Navigation size={16} />
          Como Chegar
        </a>
      </div>
    </div>
  );
};
