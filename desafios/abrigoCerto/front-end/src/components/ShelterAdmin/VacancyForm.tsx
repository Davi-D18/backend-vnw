import React from 'react';

export interface VacancyFormData {
  capacity_total: number;
  capacity_available: number;
  status: 'aberto' | 'lotado' | 'fechado';
  note: string;
}

export interface VacancyFormProps {
  formData: VacancyFormData;
  setFormData: React.Dispatch<React.SetStateAction<VacancyFormData>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const VacancyForm: React.FC<VacancyFormProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <section className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-blue-600 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
        Atualizar Vagas e Status
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade Total</label>
            <input 
              type="number" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.capacity_total} 
              onChange={e => setFormData({...formData, capacity_total: parseInt(e.target.value) || 0})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vagas Disponíveis</label>
            <input 
              type="number" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.capacity_available} 
              onChange={e => setFormData({...formData, capacity_available: parseInt(e.target.value) || 0})} 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status do Abrigo</label>
          <select 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.status}
            onChange={e => setFormData({...formData, status: e.target.value as any})}
          >
            <option value="aberto">Aberto</option>
            <option value="lotado">Lotado</option>
            <option value="fechado">Fechado</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações / Motivo da alteração</label>
          <textarea 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            rows={3} 
            placeholder="Ex: Recebemos um novo grupo de pessoas..."
            value={formData.note}
            onChange={e => setFormData({...formData, note: e.target.value})} 
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white py-3 rounded-lg font-bold transition-colors shadow-lg ${
            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
          }`}
        >
          {isLoading ? 'Registrando...' : 'Confirmar Atualização de Vagas'}
        </button>
      </form>
    </section>
  );
};
