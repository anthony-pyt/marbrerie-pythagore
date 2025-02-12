import { Icon } from "@iconify/react";
import Image from "next/image";

const ServiceCard = ({ title, children, image }) => {
  return (
    <div className="max-w-96 min-w-96 bg-white rounded-xl shadow-xl border m-6 h-full">
      <div className="flex justify-center">
        <div className="bg-primary h-48 w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden">
          <Image
            className="w-full h-48 object-cover"
            src={`${image}`}
            loading="lazy"
            width={600}
            height={200}
            alt=""
          />
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-semibold mb-4">{title}</h4>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
