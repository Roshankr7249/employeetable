// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${BASE_URL}/employees`, employee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const response = await axios.put(`${BASE_URL}/employees/${id}`, updatedEmployee);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/employees/${id}`);
  } catch (error) {
    throw error;
  }
};
