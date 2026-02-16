import { twMerge } from "tailwind-merge"

/**
 * Utility to combine classNames with Tailwind merge support
 */
export function cn(...inputs: (string | false | null | undefined)[]) {
  return twMerge(inputs.filter(Boolean).join(" "))
}

