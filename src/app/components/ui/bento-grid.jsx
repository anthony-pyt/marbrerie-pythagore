import { cn } from "../../../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  date,
  header,
  icon,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-lg transition duration-200 shadow-input p-4 bg-white border justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-0.5 transition duration-200">
        <div>
          <div className="flex justify-between">
            <div>{icon}</div>
            <div>
                <span className="text-xs font-semibold">{date}</span>
            </div>
          </div>
        </div>
        <div className="font-sans font-bold text-neutral-600 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs">
          {description}
        </div>
      </div>
    </div>
  );
};
