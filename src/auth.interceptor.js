import axios from 'axios';

// Add a request interceptor
const useInterceptor = async (isLoggedIn) => {
  if (isLoggedIn) {
    axios.interceptors.request.use((config) => {
      const u = localStorage.getItem('USER');
      let clone;
      if (u) {
        const user = JSON.parse(u);
        if (user && user.token) {
          const token = `Bearer ${user.token}`;
          clone = { ...config };
          clone.headers.Authorization = token;
        }
      }
      return clone || config;
    });
  }
};

export default useInterceptor;
