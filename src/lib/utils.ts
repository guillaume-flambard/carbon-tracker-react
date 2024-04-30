import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function formatBytes(bytes = 0) {
  let unit = "Bytes";
  let value = bytes;

  if (bytes >= 1e9) {
    value = bytes / 1e9;
    unit = "GB";
  } else if (bytes >= 1e6) {
    value = bytes / 1e6;
    unit = "MB";
  } else if (bytes >= 1000) {
    value = bytes / 1000;
    unit = "KB";
  }

  return { value: Number(value.toFixed(2)), unit };
}

export function formatEnergy(wh = 0) {
  let unit = "kWh";
  let value = wh;
  if (wh < 1) {
    value = wh * 1000; // Convert kWh to Wh
    unit = "Wh";
  }

  return { value: Number(value.toFixed(2)), unit };
}

export function formatCO2(kg = 0) {
  let unit = "kg";
  let value = kg;
  if (kg < 1) {
    value = kg * 1000; // Convert kg to grams
    unit = "g";
  }

  return { value: Number(value.toFixed(2)), unit };
}

export function formatDomain(url: string) {
  return new URL(url).hostname.split(".").slice(-2).join(".");
}
