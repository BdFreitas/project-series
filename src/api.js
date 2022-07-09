import axios from "axios";

const api = axios.create({
    baseURL: 'https://app-series-breno.herokuapp.com'
});

export default api;