import axios from "axios";

const API_BASE = "http://localhost:8000"; // backend base URL

export const predictMessage = (message) =>
  axios.post(`${API_BASE}/predict`, { message });

export const getStatistics = () =>
  axios.get(`${API_BASE}/statistics`);

export const clearHistory = () =>
  axios.delete(`${API_BASE}/history`);

export const reloadModel = () =>
  axios.put(`${API_BASE}/model/reload`);
