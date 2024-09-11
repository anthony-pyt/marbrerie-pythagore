import { Icon } from "@iconify/react";

const Filter = ({ text, icon }) => {

  return (
    <button className="bg-gray-100 rounded px-3 py-1 flex items-center space-x-2">
      <Icon icon="solar:close-circle-outline" width="18" height="24" />
      <span>{text}</span>
    </button>
  );

};

export default Filter;
