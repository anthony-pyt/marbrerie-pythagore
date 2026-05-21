import axios from "axios";

export default function useGoogleServices() {
  const getGoogleReviews = async () => {
    const response = await axios.get(`/api/google-reviews`); // appel local
    return response.data;
  };

  return {
    getGoogleReviews,
  };
}
