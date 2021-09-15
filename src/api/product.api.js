import axios from 'axios';

const { REACT_APP_API_BASE_URL } = process.env;

// masters
export const getProductUsers = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/product-users`);

// maters end
export const getBrands = async () => axios.get(`${REACT_APP_API_BASE_URL}brands`);

export const getProductTypes = async () => axios.get(`${REACT_APP_API_BASE_URL}product-types`);
export const getProducts = async () => axios.get(`${REACT_APP_API_BASE_URL}products`);

export const getCategories = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/categories`);
export const getSizes = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/sizes`);
export const getMaterials = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/materials`);
export const getBrakes = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/brakes`);
export const getSuspensions = async () => axios.get(`${REACT_APP_API_BASE_URL}masters/suspensions`);

// vendor
export const getVendors = async () => axios.get(`${REACT_APP_API_BASE_URL}vendors`);
export const getOneVendor = async (id) => axios.get(`${REACT_APP_API_BASE_URL}vendors/${id}`);

// create apis
export const createVendor = async (payload) => axios.post(`${REACT_APP_API_BASE_URL}vendors`, payload);
export const createProduct = async (payload) => axios.post(`${REACT_APP_API_BASE_URL}products`, payload);
