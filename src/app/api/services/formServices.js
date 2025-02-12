import axios from "axios";

export default function FormServices() {
  const VerifyAndSendContact = async (datas) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify_and_send_contact`,
        { datas },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Spécifier le type multipart/form-data pour envoyer les fichiers
          },
        }
      );

      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const VerifyAndSendCandidacy = async (datas) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify_and_send_candidacy`,
        { datas },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Spécifier le type multipart/form-data pour envoyer les fichiers
          },
        }
      );

      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    VerifyAndSendContact,
    VerifyAndSendCandidacy,
  };
}
