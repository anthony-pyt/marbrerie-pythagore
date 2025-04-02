import axios from "axios";
import { isUserLoggedIn } from "./authServices";

export default function useJobOffersServices() {
  const countJobOffers = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/count_job_offers`
    );
    return response;
  };

  const fetchJobOffers = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers`
    );
    return response;
  };

  const fetchJobOffer = async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers/${id}`
    );
    return response.data;
  };

  const storeJobOffer = async (data) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers`,
      data
    );
    return response;
  };

  const updateJobOffer = async (id, data) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers/${id}`,
      data
    );
    return response;
  };

  const deleteJobOffer = async (id) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers/${id}`
    );
    return response;
  };

  const togglePublishmentStatut = async (id) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job_offers/${id}/toggle_publishment`
    );
    return response;
  }

  return {
    countJobOffers,
    fetchJobOffers,
    fetchJobOffer,
    storeJobOffer,
    updateJobOffer,
    deleteJobOffer,
    togglePublishmentStatut,
  };
}
