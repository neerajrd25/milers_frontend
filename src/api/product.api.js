import axios from 'axios';

const { REACT_APP_API_BASE_URL } = process.env;

export const getBrands = async () => axios.get(`${REACT_APP_API_BASE_URL}brands`);
export const getProducts = async () => axios.get(`${REACT_APP_API_BASE_URL}products`);
