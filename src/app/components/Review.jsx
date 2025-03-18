"use client";

import { Icon } from "@iconify/react";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const Review = ({ note, date, name, comment, avatar }) => {
  console.log(avatar);

  const ratingMap = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };

  const stars = Array.from(
    { length: ratingMap[note] || 0 },
    (_, index) => index
  );
  const cleanComment = comment
    ? comment.replace(/\(Translated by Google\)[\s\S]*/, "").trim()
    : "";

  return (
    <div className="bg-white rounded-2xl shadow p-4 w-96 m-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img src={avatar} alt="" className="h-full w-full" />
          </div>
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-gray-500">{moment(date).fromNow()}</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center mt-4">
          {stars.map((_, index) => (
            <Icon
              key={index}
              icon="line-md:star-filled"
              className="text-yellow-500 text-lg"
            />
          ))}
        </div>

        {/* Commentaire */}
        <p className="text-sm text-gray-800 mt-2">{cleanComment}</p>
      </div>

      {/* Google Logo */}
      <div className="flex justify-end mt-2">
        <img
          src="/images/divers/google.png"
          alt="Google logo"
          className="h-5"
        />
      </div>
    </div>
  );
};

export default Review;
