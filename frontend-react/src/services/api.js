import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
});

export default Api;
