import axios, { AxiosInstance } from 'axios';
const request: AxiosInstance = axios.create({
  baseURL: 'http://192.168.88.50:4000',
  timeout: 5000,
});
request.interceptors.response.use((value) => {
  return value.data;
});
export default request;
