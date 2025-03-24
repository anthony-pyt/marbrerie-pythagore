import axios from "axios";

export default function useImageServices() {
  const fetchAllInspirationPhotos = async (limit = 0) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_STOCK_URL}/stock/inspirations?limit=${limit}`
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const storeImageInPost = async (data) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/image_in_post`, data
    );
    return response;
  }

  return {
    fetchAllInspirationPhotos,
    storeImageInPost
  };
}
