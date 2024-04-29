import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// utils.js
export function formatBytesToMB(bytes = 0) {
  if (!bytes) return 0;
  return (bytes / 1048576).toFixed(3);
}
