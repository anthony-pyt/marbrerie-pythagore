import { Icon } from "@iconify/react";
import Image from "next/image";

const ServiceCard = ({ title, children, image }) => {
  return (
    <div className="md:w-96 w-full bg-white rounded-xl shadow-xl border h-full group">
      <div className="flex justify-center">
        <div className="bg-primary h-48 w-full flex items-center justify-center rounded-xl shadow-lg m-2 group-hover:-translate-y-6 translate-y-0 overflow-hidden duration-300">
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
