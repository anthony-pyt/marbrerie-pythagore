import axios from "axios";

export default function useGoogleServices() {
  const getGoogleReviews = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/get_google_reviews`
    );    
   
    return response.data
  };

  return {
    getGoogleReviews,
  };
}
