import axios from 'axios';
import { AXIOS_URL } from 'react-native-dotenv';

// baseURL with expo: your default ip
// android studio: http://10.0.2.2:3333

const api = axios.create({
  baseURL: AXIOS_URL,
});

export default api;