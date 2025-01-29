import axios from "axios";

export default function FormServices() {
  const VerifyAndSendEmail = async (datas) => {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/marbrerie-pythagore/verify_and_send_mail`,
          { datas }
        );
        
    } catch (error) {
        console.log(error);
    }
  };

  return {
    VerifyAndSendEmail,
  };
}
