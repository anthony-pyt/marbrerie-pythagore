"use client";

import Link from "next/link";
import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-11/12 overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-x-20 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative max-w-full flex-shrink-0 flex items-center group overflow-hidden"
            key={item.name}
          >
            <Link href={item.url} target="_blank">
              <img
                src={item.image_url}
                className="w-[100px] group-hover:-translate-y-2 duration-500"
              />
              <div className="absolute top-0 w-full bg-black/80 duration-500 rounded px-1 flex items-center justify-center space-x-0.5 opacity-0 group-hover:opacity-100">
                <p className="text-center text-xs text-white">
                  Visitez le site{" "}
                </p>
                <img src="/images/extern_link_48.png" className="w-3 h-3" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingLogos;
