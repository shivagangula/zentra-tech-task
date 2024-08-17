// routes.js

export const BASE_BACKEND_URL = process.env.REACT_APP_BASE_URL




const api_routes = {
   // Auth
    SIGNUP_API: `${BASE_BACKEND_URL}/api/v1/signup/`,
    LOGIN_API:  `${BASE_BACKEND_URL}/api/v1/login/`,


    PUBLIC_LOBBY:  `${BASE_BACKEND_URL}/api/v1/available-users/`,
    CHAT_USERS:  `${BASE_BACKEND_URL}/api/v1/intrested-users/`,
    REQUESTS:  `${BASE_BACKEND_URL}/api/v1/recived-requests-users/`,
    RAISE_REQUESTS:  `${BASE_BACKEND_URL}/api/v1/raise-request/`,

  };

export default api_routes;
