import axios, { AxiosInstance } from 'axios';
const request: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
