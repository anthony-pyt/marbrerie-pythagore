import axios from "axios";

export default function FormServices() {
  const VerifyAndSendEmail = async (datas) => {
    console.log(datas);
    
    try {
        const response = await axios.post(
          // `${process.env.NEXT_PUBLIC_API_URL}/verify_and_send_mail`,
          "https://api.marbrerie-pythagore.fr/api/verify_and_send_mail",
          { datas },
          {
            headers: {
              "Content-Type": "multipart/form-data", // Spécifier le type multipart/form-data pour envoyer les fichiers
            },
          }
        );
        
        return response.status
        
    } catch (error) {
        console.log(error);
    }
  };

  return {
    VerifyAndSendEmail,
  };
}
