import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// utils.js
// utils.js
export function formatBytesToMB(bytes = 0) {
  if (!bytes) return "0 MB";
  const megabytes = bytes / 1048576;
  return `${megabytes.toFixed(2)} MB`; // Format as MB with two decimal places
}

export function formatBytesToReadable(bytes = 0) {
  if (bytes >= 1e9) {
    return `${(bytes / 1e9).toFixed(2)} GB`; // Format as GB if the bytes are at least 1 GB
  } else if (bytes >= 1e6) {
    return `${(bytes / 1e6).toFixed(2)} MB`; // Format as MB otherwise
  } else if (bytes >= 1000) {
    return `${(bytes / 1000).toFixed(2)} KB`; // Format as KB if small
  }
  return `${bytes} Bytes`; // Use Bytes for very small amounts
}

export function formatEnergy(wh = 0) {
  if (wh < 1) {
    return `${(wh * 1000).toFixed(2)} Wh
    `; // Convert kWh to Wh and format if less than 1 kWh
  }
  return `${wh.toFixed(2)} kWh`; // Format kWh with two decimal places
}

export function formatCO2(kg = 0) {
  if (kg < 1) {
    return `${(kg * 1000).toFixed(2)} g`; // Convert kg to grams and format if less than 1 kg
  }
  return `${kg.toFixed(2)} kg`; // Format kg with two decimal places
}
