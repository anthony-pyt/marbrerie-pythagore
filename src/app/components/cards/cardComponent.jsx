"use client";
import Image from "next/image";
const titileClassName = "mb-2  tracking-tight  dark:text-white";
const cardClassName =
  "mx-auto max-w-sm bg-white  rounded-lg  dark:bg-gray-800 dark:border-gray-700 ";
const descriptionCalssName = "my-3 text-gray-700 dark:text-gray-400";
const imageClassName = "object-cover rounded-lg max-h-48 h-full";
const imageContainerClassName = "";
const childrenClassName = "";

const Card = ({
  description,
  image,
  title,
  titleClass = titileClassName,
  cardClass = cardClassName,
  desciptionClass = descriptionCalssName,
  imageClass = imageClassName,
  imageContainerClass = imageContainerClassName,
  chidren,
  childrenClass = childrenClassName,
}) => {
  return (
    <div className={cardClass}>
      <div>
        <div className={imageContainerClass}>
          <img
            className={imageClass}
            src={image}
            alt=""
            width={500}
            height={200}
          />
        </div>
      </div>
      <div className="p-5">
        <div>
          <h2 className={titleClass}>{title}</h2>
        </div>
        <div className={childrenClass}>
          <span>{chidren}</span>
        </div>
        <p className={desciptionClass}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
