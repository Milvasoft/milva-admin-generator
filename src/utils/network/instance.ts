import getAcceptLanguage from '@helpers/getAcceptLanguage';
import axios from 'axios';

const options = { baseURL: 'https://opsiyonerp.net/api' };

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use((config) => {

  if (config.headers) {

    config.headers['Accept-Language'] = getAcceptLanguage();

    const accessToken = '';

    if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;

  }

  return config;

});

export default axiosInstance;

