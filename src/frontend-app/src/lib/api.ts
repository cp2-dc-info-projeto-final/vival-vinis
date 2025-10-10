import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';


export interface ProdutoCredentials {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

export interface ProdutoResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// Cria uma instância global do axios para API backend na porta 3000
const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Útil para CORS com cookies/sessão
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('api_token', token);
  }
}

// Interceptor para adicionar automaticamente o token Bearer
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas 401 (token expirado)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Token inválido ou expirado, remover do sessionStorage
      sessionStorage.removeItem('auth_token');
      // Redirecionar para login se não estiver na página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export async function produto(credentials: ProdutoCredentials): Promise<ProdutoResponse> {
  try {
    const response = await api.post('/produto', credentials);
    
    if (response.data.success && response.data.token) {
      setToken(response.data.token);
      return { success: true, token: response.data.token };
    }
    
    return { success: false, message: 'Credenciais inválidas' };
  } catch (error) {
    console.error('Erro no login:', error);
    return { success: false, message: 'Credenciais inválidas' };
  }
}
export default api;
