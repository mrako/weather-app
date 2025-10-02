import axios, { InternalAxiosRequestConfig } from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT;
const STORED_USER = import.meta.env.VITE_STORED_USER;

const apiClient = axios.create({
  baseURL: `${ENDPOINT}/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getUser = () => JSON.parse(localStorage.getItem(STORED_USER) || 'null');

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const user = getUser();
  if (user?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.token}`,
    } as InternalAxiosRequestConfig['headers'];
  }
  return config;
});

export const get = async (uri: string) => {
  try {
    const response = await apiClient.get(uri);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error);
    return null;
  }
};

export const put = async (uri: string, params: Record<string, any>) => {
  try {
    const response = await apiClient.put(uri, params);
    return response.data;
  } catch (error) {
    console.error('PUT Error:', error);
    return null;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/login', { email, password });

    if (response.status >= 200 && response.status < 300) {
      const user = response.data;
      localStorage.setItem(STORED_USER, JSON.stringify(user));
      return { user };
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem(STORED_USER);
      return { error: 'Please check your username or password.' };
    }
  }

  return {};
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/logout');
    if (response.status >= 200 && response.status < 300) {
      localStorage.removeItem(STORED_USER);
    }
    return {};
  } catch (error: any) {
    console.error('Logout Error:', error);
    return { error };
  }
};
