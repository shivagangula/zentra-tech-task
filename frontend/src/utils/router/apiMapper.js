// routes.js

export const BASE_BACKEND_URL = process.env.REACT_APP_BASE_URL




const api_routes = {
   // Auth
    SIGNUP_API: `${BASE_BACKEND_URL}/api/v1/signup/`,
    LOGIN_API:  `${BASE_BACKEND_URL}/api/v1/login/`,

  };

export default api_routes;
