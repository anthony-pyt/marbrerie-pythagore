import axios from "axios";
import { isUserLoggedIn } from "./authServices";

export default function useJobOffersServices() {
  const countJobOffers = async () => {
    const response = await axios.get(
      `/api/web-api/count_job_offers`
    );
    return response;
  };

  const fetchJobOffers = async () => {
    const response = await axios.get(
      `/api/web-api/job_offers`
    );
    return response;
  };

  // Offres publiées uniquement, pour le site public
  const fetchPublishedJobOffers = async () => {
    const response = await axios.get(
      `/api/web-api/published_job_offers`
    );
    return response;
  };

  const fetchJobOffer = async (id) => {
    const response = await axios.get(
      `/api/web-api/job_offers/${id}`
    );
    return response.data;
  };

  const storeJobOffer = async (data) => {
    const response = await axios.post(
      `/api/web-api/job_offers`,
      data
    );
    return response;
  };

  const updateJobOffer = async (id, data) => {
    const response = await axios.put(
      `/api/web-api/job_offers/${id}`,
      data
    );
    return response;
  };

  const deleteJobOffer = async (id) => {
    const response = await axios.delete(
      `/api/web-api/job_offers/${id}`
    );
    return response;
  };

  const togglePublishmentStatut = async (id) => {
    const response = await axios.patch(
      `/api/web-api/job_offers/${id}/toggle_publishment`
    );
    return response;
  }

  return {
    countJobOffers,
    fetchJobOffers,
    fetchPublishedJobOffers,
    fetchJobOffer,
    storeJobOffer,
    updateJobOffer,
    deleteJobOffer,
    togglePublishmentStatut,
  };
}
