import axios from 'axios';

const axiosServices = axios.create({
  // baseURL: 'http://192.168.1.2:8000/'
  baseURL: process.env.REACT_APP_API_URL
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      console.warn('Request canceled:', error.message);
      return Promise.reject({ canceled: true, message: 'Request was canceled' });
    }
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;
