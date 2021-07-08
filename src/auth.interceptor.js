import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  let clone;
  if (user && user.accessToken) {
    const token = `Bearer ${user.accessToken}`;
    clone = { ...config };
    clone.headers.Authorization = token;
  }
  return clone;
});
