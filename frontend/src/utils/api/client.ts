import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types/api';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in the environment variables');
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para padronizar o retorno de dados de sucesso
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // O backend já encapsula a resposta em `data`.
    if (response.data && response.data.success) {
      return response.data; 
    }
    // Se a estrutura não for a esperada, rejeita a promessa
    return Promise.reject(response.data.error || { message: 'Unknown API error structure' });
  },
  (error) => {
    // Extrai a mensagem de erro da resposta da API, se disponível
    const apiError = error.response?.data?.error || { message: error.message || 'An unexpected error occurred' };
    return Promise.reject(apiError);
  }
);

export const apiClient = axiosInstance;
