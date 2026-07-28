import axios from "axios";

export default function useImageServices() {
   const baseUrl =process.env.NEXT_PUBLIC_API_URL
  const fetchAllInspirationPhotos = async (limit = 0) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/stock/inspirations?limit=${limit}`,

        
      );

      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const storeImageInPost = async (data) => {
    const response = await axios.post(
      `${baseUrl}/image_in_post`, data
    );
    return response;
  }

  return {
    fetchAllInspirationPhotos,
    storeImageInPost
  };
}
