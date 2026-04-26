import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { shelterService } from '../services/shelterService';
import { AdminHeader } from '../components/ShelterAdmin/AdminHeader';
import { VacancyForm, VacancyFormData } from '../components/ShelterAdmin/VacancyForm';
import { ProfileForm, ProfileFormData } from '../components/ShelterAdmin/ProfileForm';
import { UpdateHistory, Update } from '../components/ShelterAdmin/UpdateHistory';

export const ShelterAdmin = () => {
  const { shelter, logout, refreshShelter } = useAuth();
  const { addToast } = useToast();
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoadingVagas, setIsLoadingVagas] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  
  const [formData, setFormData] = useState<VacancyFormData>({
    capacity_total: 0,
    capacity_available: 0,
    status: 'aberto',
    note: ''
  });

  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    neighborhood: '',
    reference_point: '',
    contact_name: '',
    contact_phone: '',
    accessibility: false,
    accepts_pets: false,
    description: ''
  });

  useEffect(() => {
    if (shelter) {
      setFormData({
        capacity_total: shelter.capacity_total,
        capacity_available: shelter.capacity_available,
        status: shelter.status,
        note: ''
      });
      
      setProfileData({
        name: shelter.name || '',
        email: shelter.email || '',
        password: '',
        address: shelter.address || '',
        city: shelter.city || '',
        neighborhood: shelter.neighborhood || '',
        reference_point: shelter.reference_point || '',
        contact_name: shelter.contact_name || '',
        contact_phone: shelter.contact_phone || '',
        accessibility: !!shelter.accessibility,
        accepts_pets: !!shelter.accepts_pets,
        description: shelter.description || ''
      });
      
      loadUpdates();
    }
  }, [shelter]);

  const loadUpdates = async () => {
    if (!shelter) return;
    try {
      const data = await shelterService.listUpdates(shelter.id);
      setUpdates(data);
    } catch (err) {
      console.error('Erro ao carregar histórico', err);
    }
  };

  const handleUpdateVagas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shelter) return;

    if (!formData.note || formData.note.trim().length === 0) {
      addToast('error', 'Por favor, preencha o campo de observação.');
      return;
    }

    setIsLoadingVagas(true);
    try {
      await shelterService.registerUpdate(shelter.id, {
        ...formData,
        updated_by: shelter.name
      });
      
      addToast('success', 'Atualização registrada com sucesso!');
      await refreshShelter();
      loadUpdates();
      setFormData(prev => ({ ...prev, note: '' }));
    } catch (err: any) {
      const details = err.response?.data?.errors;
      if (Array.isArray(details) && details.length > 0) {
        details.forEach((d: any) => addToast('error', d.message));
      } else {
        const message = err.response?.data?.message || 'Erro ao atualizar vagas.';
        addToast('error', message);
      }
    } finally {
      setIsLoadingVagas(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shelter) return;

    setIsLoadingProfile(true);
    try {
      const payload = { ...profileData };
      if (!payload.password) {
        delete (payload as any).password;
      }

      await shelterService.update(shelter.id, payload);
      addToast('success', 'Dados do abrigo atualizados com sucesso!');
      await refreshShelter();
      setProfileData(prev => ({ ...prev, password: '' }));
    } catch (err: any) {
      const details = err.response?.data?.errors;
      if (Array.isArray(details) && details.length > 0) {
        details.forEach((d: any) => addToast('error', d.message));
      } else {
        const message = err.response?.data?.message || 'Erro ao atualizar perfil.';
        addToast('error', message);
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  if (!shelter) return <div className="p-8 text-center">Carregando dados do abrigo...</div>;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <AdminHeader 
        name={shelter.name} 
        address={shelter.address} 
        neighborhood={shelter.neighborhood} 
        city={shelter.city} 
        onLogout={logout} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <VacancyForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleUpdateVagas} 
            isLoading={isLoadingVagas} 
          />

          <ProfileForm 
            profileData={profileData} 
            setProfileData={setProfileData} 
            onSubmit={handleUpdateProfile} 
            isLoading={isLoadingProfile} 
          />
        </div>

        <UpdateHistory updates={updates} />
      </div>
    </div>
  );
};
