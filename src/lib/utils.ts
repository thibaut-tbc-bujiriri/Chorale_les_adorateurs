import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(input: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
  }).format(new Date(input));
}

export function normalizeText(value: string) {
  return value.toLowerCase().trim();
}
