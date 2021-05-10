import axios, { AxiosInstance } from 'axios';
const request: AxiosInstance = axios.create({
  baseURL: 'https://api.defectink.com/gugu/',
  timeout: 5000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
