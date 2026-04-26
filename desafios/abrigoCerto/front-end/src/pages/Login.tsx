import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
      addToast('success', 'Login realizado com sucesso!');
      navigate('/admin');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      addToast('error', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Acesso do Abrigo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input 
              type="password" 
              required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white py-2 rounded font-bold transition-colors shadow-lg ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-6 pt-6 border-t text-center space-y-2">
          <p className="text-sm text-gray-600">
            Ainda não tem cadastro? <Link to="/cadastro" className="text-blue-600 hover:underline font-bold">Cadastre seu abrigo</Link>
          </p>
          <p className="text-xs text-gray-400">
            Esqueceu sua senha? Entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};
