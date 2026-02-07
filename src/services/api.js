import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
};

// Raw Materials API
export const rawMaterialsAPI = {
  getAll: () => api.get('/raw-materials'),
  getById: (id) => api.get(`/raw-materials/${id}`),
  create: (rawMaterial) => api.post('/raw-materials', rawMaterial),
  update: (id, rawMaterial) => api.put(`/raw-materials/${id}`, rawMaterial),
  delete: (id) => api.delete(`/raw-materials/${id}`),
};

// Production API
export const productionAPI = {
  getSuggestion: () => api.get('/production/suggestion'),
};

export default api;
