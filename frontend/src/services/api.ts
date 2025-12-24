import axios from 'axios';
import type { Family, FamilyFormData, Statistics } from '../types';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const familyApi = {
  // Get all families
  getAllFamilies: async (): Promise<Family[]> => {
    const response = await api.get<Family[]>('/families');
    return response.data;
  },

  // Get single family
  getFamilyById: async (id: string): Promise<Family> => {
    const response = await api.get<Family>(`/families/${id}`);
    return response.data;
  },

  // Create new family
  createFamily: async (data: FamilyFormData): Promise<Family> => {
    const response = await api.post<Family>('/families', data);
    return response.data;
  },

  // Update family
  updateFamily: async (id: string, data: FamilyFormData): Promise<Family> => {
    const response = await api.put<Family>(`/families/${id}`, data);
    return response.data;
  },

  // Delete family
  deleteFamily: async (id: string): Promise<void> => {
    await api.delete(`/families/${id}`);
  },

  // Get statistics
  getStatistics: async (): Promise<Statistics> => {
    const response = await api.get<Statistics>('/stats');
    return response.data;
  },
};

export default api;
