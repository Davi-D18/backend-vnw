import React from 'react';

interface AdminHeaderProps {
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  name, 
  address, 
  neighborhood, 
  city, 
  onLogout 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600">{address}, {neighborhood} - {city}</p>
      </div>
      <button 
        onClick={onLogout} 
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
      >
        Sair do Sistema
      </button>
    </div>
  );
};
