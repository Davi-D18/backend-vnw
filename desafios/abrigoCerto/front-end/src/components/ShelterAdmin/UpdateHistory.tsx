import React from 'react';

export interface Update {
  id: number;
  created_at: string;
  status: 'aberto' | 'lotado' | 'fechado';
  capacity_available: number;
  capacity_total: number;
  note?: string;
}

export interface UpdateHistoryProps {
  updates: Update[];
}

export const UpdateHistory: React.FC<UpdateHistoryProps> = ({ updates }) => {
  return (
    <section className="bg-white p-6 rounded-xl border shadow-sm h-fit sticky top-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Histórico Recente</h2>
      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
        {updates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Nenhuma atualização registrada.</p>
        ) : (
          updates.map((u) => (
            <div key={u.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-gray-500">
                  {new Date(u.created_at).toLocaleString('pt-BR')}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  u.status === 'aberto' ? 'bg-green-100 text-green-800' : 
                  u.status === 'lotado' ? 'bg-orange-100 text-orange-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {u.status}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                Vagas: <span className="text-blue-600 font-bold">{u.capacity_available}</span> / {u.capacity_total}
              </p>
              {u.note && <p className="text-xs italic text-gray-500 mt-1">"{u.note}"</p>}
            </div>
          ))
        )}
      </div>
    </section>
  );
};
