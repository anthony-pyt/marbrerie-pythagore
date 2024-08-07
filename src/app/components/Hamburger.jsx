'use client'

import React from "react";

export function Hamburger(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeWidth={0.5}
        d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
      ></path>
    </svg>
  );
}
