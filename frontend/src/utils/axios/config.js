// axiosConfig
import axios from 'axios';
import page_routes from '../router/pageMapper';
import api_routes from '../router/apiMapper';
import { BASE_BACKEND_URL } from '../router/apiMapper';

// authServices
export function setAccessToken(token) {
  localStorage.setItem('access_token', token);
}
export function setRefreshToken(token) {
  localStorage.setItem('refresh_token', token);
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function clearAccessToken() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

}



export async function getNewAccessToken(refreshToken) {
  try {
    const response = await axios.post(api_routes.REFRESH_ACCESS_API, {
      refresh: refreshToken,
    });
    return response.data.access;
  } catch (error) {
    throw error;
  }
}


// Add a request interceptor to attach the access token to outgoing requests

const secureAxios = axios.create({
  baseURL: BASE_BACKEND_URL, 
});

secureAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Add a response interceptor to handle token expiration and refreshing
secureAxios.interceptors.response.use(

 
  
  (response) => {
    
    return response;
  },
  async (error) => {
    
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken(); 


    
       
      
      if (refreshToken) {
        
        try {
          const newAccessToken = await getNewAccessToken(refreshToken);
          setAccessToken(newAccessToken); 
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return secureAxios(originalRequest); 
        } catch (refreshError) {
          console.log('refreshToken error')
          clearAccessToken();
      
          window.location.href = page_routes.LOGIN_PAGE;
        
        }
      } else {
        
        window.location.href = page_routes.LOGIN_PAGE;
        return Promise.reject(error);
       
      }
    }
    
    return Promise.reject(error);
  }
);

 

export default secureAxios;
