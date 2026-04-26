import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { shelterService } from '../services/shelterService';
import { useToast } from '../contexts/ToastContext';

export const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    neighborhood: '',
    contact_phone: '',
    contact_name: '',
    capacity_total: 0,
    capacity_available: 0,
    accessibility: false,
    accepts_pets: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await shelterService.register(formData);
      addToast('success', 'Abrigo cadastrado com sucesso! Bem-vindo.');
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      const details = err.response?.data?.details;
      if (Array.isArray(details) && details.length > 0) {
        details.forEach((d: any) => addToast('error', d.message));
      } else {
        const message = err.response?.data?.message || 'Erro ao realizar cadastro. Verifique os dados.';
        addToast('error', message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md border w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 text-blue-600">Cadastrar Novo Abrigo</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 text-sm text-gray-500 mb-2">
            * Campos obrigatórios
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nome do Abrigo *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input required type="email" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha (mín. 6 caracteres) *</label>
            <input required type="password" minLength={6} className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Telefone de Contato *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Responsável *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Endereço Completo *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bairro *</label>
            <input required type="text" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.neighborhood} onChange={e => setFormData({...formData, neighborhood: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacidade Total *</label>
            <input required type="number" min="0" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.capacity_total} onChange={e => setFormData({...formData, capacity_total: parseInt(e.target.value) || 0})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vagas Atuais *</label>
            <input required type="number" min="0" className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.capacity_available} onChange={e => setFormData({...formData, capacity_available: parseInt(e.target.value) || 0})} />
          </div>

          <div className="flex gap-6 py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600" checked={formData.accessibility} 
                onChange={e => setFormData({...formData, accessibility: e.target.checked})} />
              <span className="text-sm font-medium text-gray-700">Acessibilidade</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600" checked={formData.accepts_pets} 
                onChange={e => setFormData({...formData, accepts_pets: e.target.checked})} />
              <span className="text-sm font-medium text-gray-700">Aceita Pets</span>
            </label>
          </div>

          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white py-3 rounded-lg font-bold transition-colors shadow-lg ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
            <p className="mt-4 text-center text-gray-600">
              Já tem conta? <Link to="/login" className="text-blue-600 hover:underline">Faça login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
