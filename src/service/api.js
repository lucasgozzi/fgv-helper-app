import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fgv-helper.herokuapp.com'
});

export default api;
