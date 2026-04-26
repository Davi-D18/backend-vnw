import React, { useEffect, useState } from 'react';
import { shelterService } from '../services/shelterService';
import { Home, Users, CheckCircle, XCircle } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    shelterService.getSummary().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div className="p-8 text-center">Carregando estatísticas...</div>;

  const cards = [
    { label: 'Total de Abrigos', value: stats.total_shelters, icon: Home, color: 'text-blue-600' },
    { label: 'Vagas Totais', value: stats.total_capacity, icon: Users, color: 'text-purple-600' },
    { label: 'Vagas Disponíveis', value: stats.total_available, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Vagas Ocupadas', value: stats.total_occupied, icon: Users, color: 'text-orange-600' },
    { label: 'Ocupação Média', value: `${stats.avg_occupancy_percent}%`, icon: CheckCircle, color: 'text-indigo-600' },
    { label: 'Abrigos Lotados', value: stats.full_shelters, icon: XCircle, color: 'text-red-600' },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Painel de Monitoramento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-gray-50 ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
