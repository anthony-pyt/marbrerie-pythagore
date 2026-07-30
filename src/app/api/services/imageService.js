import axios from "axios";

export default function useImageServices() {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
  const baseUrl = process.env.NEXT_API_GATEWAY_URL
  const fetchAllInspirationPhotos = async (limit = 0) => {
    try {
      const response = await axios.get(
        `/api/proxy/stock/inspirations?limit=${limit}`,


      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const storeImageInPost = async (data) => {
    const response = await axios.post(
      `${baseApiUrl}/image_in_post`, data
    );
    return response;
  }

  return {
    fetchAllInspirationPhotos,
    storeImageInPost
  };
}
