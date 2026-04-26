import React, { useEffect, useState } from 'react';
import { shelterService, Shelter } from '../services/shelterService';
import { Search } from 'lucide-react';
import { ShelterCard } from '../components/ShelterList/ShelterCard';
import { ShelterFilters } from '../components/ShelterList/ShelterFilters';

export const ShelterList = () => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [filters, setFilters] = useState({ search: '', status: '', accepts_pets: '', accessibility: '' });

  const fetchShelters = () => {
    shelterService.list(filters).then(res => setShelters(res.data)).catch(console.error);
  };

  useEffect(() => { 
    fetchShelters(); 
  }, [filters]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Encontrar Abrigo</h1>
          <p className="text-gray-500 mt-1">Localize abrigos com vagas disponíveis em tempo real.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome, rua ou bairro..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ShelterFilters filters={filters} setFilters={setFilters} />

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {shelters.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum abrigo encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            shelters.map(shelter => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
