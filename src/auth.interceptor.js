import axios from 'axios';

// Add a request interceptor
const useInterceptor = async (isLoggedIn) => {
  if (isLoggedIn) {
    axios.interceptors.request.use((config) => {
      const user = JSON.parse(localStorage.getItem('USER'));
      let clone;
      if (user && user.token) {
        const token = `Bearer ${user.token}`;
        clone = { ...config };
        clone.headers.Authorization = token;
      }
      return clone;
    });
  }
};

export default useInterceptor;
