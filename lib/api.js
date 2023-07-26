import axios from 'axios';

const url = 'http://localhost:5000'; 
//auth
export const registerUser = async (values) => {
    return await axios.post(`${url}/reg`, values);
}
export const login = async (values) => {
    return await axios.post(`${url}/log`, values);
}
export const addNewBook = async (values) => {
    return await axios.post(`${url}/addBook`, values);
}
export const getAllBooks = async () => {
    return await axios.get(`${url}/getAllBooks`);
}
export const updateBookStatus = async (values) => {
    return await axios.post(`${url}/updateBookStatus` , values);
}
