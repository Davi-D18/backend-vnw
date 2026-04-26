import React from 'react';

export interface ProfileFormData {
  name: string;
  email: string;
  password?: string;
  address: string;
  city: string;
  neighborhood: string;
  reference_point: string;
  contact_name: string;
  contact_phone: string;
  accessibility: boolean;
  accepts_pets: boolean;
  description: string;
}

export interface ProfileFormProps {
  profileData: ProfileFormData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  profileData, 
  setProfileData, 
  onSubmit, 
  isLoading 
}) => {
  return (
    <section className="bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-emerald-600 flex items-center gap-2">
        <span className="w-2 h-6 bg-emerald-600 rounded-full"></span>
        Dados Cadastrais do Abrigo
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Abrigo</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.name} 
              onChange={e => setProfileData({...profileData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.email} 
              onChange={e => setProfileData({...profileData, email: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.address} 
              onChange={e => setProfileData({...profileData, address: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Contato</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.contact_name} 
              onChange={e => setProfileData({...profileData, contact_name: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone de Contato</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.contact_phone} 
              onChange={e => setProfileData({...profileData, contact_phone: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.city} 
              onChange={e => setProfileData({...profileData, city: e.target.value})} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.neighborhood} 
              onChange={e => setProfileData({...profileData, neighborhood: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ponto de Referência</label>
            <input 
              type="text" 
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
              value={profileData.reference_point} 
              onChange={e => setProfileData({...profileData, reference_point: e.target.value})} 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha (deixe em branco para manter a atual)</label>
          <input 
            type="password" 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
            value={profileData.password} 
            onChange={e => setProfileData({...profileData, password: e.target.value})} 
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" 
              checked={profileData.accessibility} 
              onChange={e => setProfileData({...profileData, accessibility: e.target.checked})} 
            />
            <span className="text-sm font-medium text-gray-700">Acessibilidade (PcD)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" 
              checked={profileData.accepts_pets} 
              onChange={e => setProfileData({...profileData, accepts_pets: e.target.checked})} 
            />
            <span className="text-sm font-medium text-gray-700">Aceita Pets</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
            rows={4} 
            placeholder="Conte um pouco sobre o abrigo..."
            value={profileData.description}
            onChange={e => setProfileData({...profileData, description: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white py-3 rounded-lg font-bold transition-colors shadow-lg ${
            isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
          }`}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações Cadastrais'}
        </button>
      </form>
    </section>
  );
};
