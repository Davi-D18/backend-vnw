import api from '../api/api';

export interface Shelter {
  id: number;
  name: string;
  address: string;
  city: string;
  neighborhood: string;
  capacity_total: number;
  capacity_available: number;
  status: 'aberto' | 'lotado' | 'fechado';
  contact_phone: string;
  contact_name?: string;
  reference_point?: string;
  accepts_pets: boolean;
  accessibility: boolean;
  latitude: number;
  longitude: number;
  updated_at: string;
  description?: string;
  email?: string;
}

export const shelterService = {
  getSummary: () => api.get('/shelters/summary').then(res => res.data.data),
  list: (params: any) => api.get('/shelters', { params }).then(res => res.data),
  getById: (id: string | number) => api.get(`/shelters/${id}`).then(res => res.data),
  update: (id: number, data: any) => api.put(`/shelters/${id}`, data).then(res => res.data),
  registerUpdate: (id: number, data: any) => api.post(`/shelters/${id}/updates`, data).then(res => res.data),
  listUpdates: (id: number) => api.get(`/shelters/${id}/updates`).then(res => res.data.data),
  
  // Auth
  login: (credentials: any) => api.post('/auth/login', credentials).then(res => res.data),
  register: (data: any) => api.post('/auth/register', data).then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data),
};
