"use client";

import { Icon } from "@iconify/react";

export function Hamburger({ color, size }) {
  return (
    <Icon icon="ri:menu-5-line" width={size} height={size} color={color} />
  );
}
