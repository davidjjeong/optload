import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  const kb = 1000;
  const mb = kb * 1000;

  if(bytes < kb) return `${bytes}B`;
  if(bytes < mb) return `${(bytes/ kb).toFixed(1)}KB`;
  return `${(bytes/mb).toFixed(1)}MB`;
}