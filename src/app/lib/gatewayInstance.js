import axios from "axios";

const gateway_instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  withCredentials: true,

});

export default gateway_instance;
