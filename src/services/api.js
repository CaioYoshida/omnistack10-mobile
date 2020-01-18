import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';

const api = axios.create({
  // baseURL with expo: your default ip
  // 
  baseURL: AXIOS_URL,
});

export default api;