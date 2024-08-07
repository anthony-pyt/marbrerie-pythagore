import { Icon } from "@iconify/react";

const ServiceCard = ({ title, children }) => {
  return (
    <div>
      <div className="bg-primary h-72 w-72 rounded-xl shadow-lg flex items-center justify-center">
        <Icon
          icon="lets-icons:img-box-duotone-line"
          width={138}
          className="text-gray-500"
        />
      </div>
      <div className="m-2">
        <h6 className="text-wrap">{title}</h6>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ServiceCard;
