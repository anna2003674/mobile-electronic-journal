import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://10.0.2.2:8080/api/v1/auth/authenticate',
});

instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('jwt-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;

