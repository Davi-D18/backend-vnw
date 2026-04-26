import React from 'react';
import { Filter } from 'lucide-react';

interface Filters {
  search: string;
  status: string;
  accepts_pets: string;
  accessibility: string;
}

interface ShelterFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const ShelterFilters: React.FC<ShelterFiltersProps> = ({ filters, setFilters }) => {
  return (
    <aside className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-6">
      <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
        <Filter size={20} className="text-blue-600" /> 
        Filtros
      </h3>
      
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">Status de Ocupação</label>
        <select 
          className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">Todos os status</option>
          <option value="aberto">Aberto (com vagas)</option>
          <option value="lotado">Lotado</option>
          <option value="fechado">Fechado</option>
        </select>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-semibold text-gray-700">Comodidades</p>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
            checked={filters.accepts_pets === 'true'}
            onChange={(e) => setFilters({...filters, accepts_pets: e.target.checked ? 'true' : ''})} 
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Aceita Pets</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
            checked={filters.accessibility === 'true'}
            onChange={(e) => setFilters({...filters, accessibility: e.target.checked ? 'true' : ''})} 
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Acessibilidade</span>
        </label>
      </div>
    </aside>
  );
};
