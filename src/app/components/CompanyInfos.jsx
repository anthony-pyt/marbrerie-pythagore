import { Icon } from "@iconify/react";

const CompanyInfo = () => {
  return (
    <div className="bg-slate-100 p-6 rounded-lg shadow-xl w-full">
      <h2 className="text-2xl font-semibold text-gray-700">
        Pythagore
      </h2>
      <p className="text-gray-600">
        <Icon
          icon="solar:location-bold"
          width="24"
          height="24"
          className="inline mr-2"
        />
        lieu dit pen ar hoat, 22570 Laniscat
      </p>
      <p className="text-gray-600 mt-2">
        <Icon
          icon="solar:phone-bold"
          width="24"
          height="24"
          className="inline mr-2"
        />
        +33 2 96 24 98 98
      </p>
      <p className="text-gray-600 mt-2">
        <Icon
          icon="solar:clock-circle-bold"
          width="24"
          height="24"
          className="inline mr-2"
        />
        Lun-Ven: 9h00 - 18h00
      </p>
    </div>
  );
};

export default CompanyInfo;
