import axios from "axios";

export default function useWarantyServices() {
  // Route serveur du site, en cache : le navigateur n'appelle plus stock directement.
  const fetchWaranties = async () => {
    const response = await axios.get("/api/stock/waranties");
    return response.data;
  };

  return {
    fetchWaranties
  };
}
