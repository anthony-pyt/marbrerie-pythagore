import { Icon } from "@iconify/react";
import Image from "next/image";

const ServiceCard = ({ title, children, type }) => {
  return (
    <div className="max-w-96 min-w-96 bg-white rounded-xl shadow-xl border m-8">
      <div className="flex justify-center">
        <div className="bg-primary h-48 w-11/12 flex items-center justify-center rounded-xl shadow-lg -mt-6 overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src={`/images/${type}.jpg`}
            loading="lazy"
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
