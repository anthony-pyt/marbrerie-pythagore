import { Icon } from "@iconify/react";

const Filter = ({ text, icon, onClick }) => {

  return (
    <button className="bg-gray-100 rounded px-3 py-1 flex items-center space-x-2 cursor-default m-0.5"
    onClick={onClick
    }>
      {/* <Icon icon="solar:close-circle-outline" width="18" height="24" /> */}
      <span>{text}</span>
    </button>
  );

};

export default Filter;
