import axios from "axios";

const gateway_instance = axios.create({
  baseURL: 'backend',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true
});

export default gateway_instance;
