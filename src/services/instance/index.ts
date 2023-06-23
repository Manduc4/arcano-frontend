import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8083/api',
  timeout: 36000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});