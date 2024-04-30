import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// utils.js
// utils.js
export function formatBytes(bytes = 0) {
  if (bytes >= 1e9) {
    return (bytes / 1e9).toFixed(2); // Returns the value in GB
  } else if (bytes >= 1e6) {
    return (bytes / 1e6).toFixed(2); // Returns the value in MB
  } else if (bytes >= 1000) {
    return (bytes / 1000).toFixed(2); // Returns the value in KB
  }
  return bytes.toString(); // Returns the value in Bytes
}

export function formatEnergy(wh = 0) {
  if (wh < 1) {
    return (wh * 1000).toFixed(2); // Convert kWh to Wh and format if less than 1 kWh
  }
  return wh.toFixed(2); // Returns value in kWh
}

export function formatCO2(kg = 0) {
  if (kg < 1) {
    return (kg * 1000).toFixed(2); // Convert kg to grams and format if less than 1 kg
  }
  return kg.toFixed(2); // Returns value in kg
}
