import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { Dashboard } from './pages/Dashboard';
import { ShelterList } from './pages/ShelterList';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ShelterAdmin } from './pages/ShelterAdmin';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  
  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (!token) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

const Navigation = () => {
  const { token } = useAuth();

  return (
    <nav className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded">AC</span>
          Abrigo Certo
        </Link>
        <div className="flex gap-4 md:gap-8 items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Dashboard</Link>
          <Link to="/abrigos" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Abrigos</Link>
          {token ? (
            <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-shadow shadow-md shadow-blue-200">
              Gerenciar
            </Link>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-shadow shadow-md shadow-blue-200">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/abrigos" element={<ShelterList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <ShelterAdmin />
                  </ProtectedRoute>
                } 
              />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
              &copy; 2024 Abrigo Certo - Sistema de Gerenciamento de Vagas em Abrigos
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
    </ToastProvider>
  );
};

export default App;
