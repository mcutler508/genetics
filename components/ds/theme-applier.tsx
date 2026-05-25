"use client";

import { useTheme } from "@/lib/use-theme";

/**
 * Headless component that applies the saved theme from localStorage / URL hash
 * to the document root on every page. Renders nothing. Mount once in the root
 * layout so themes from the editor propagate across the whole app.
 */
export function ThemeApplier() {
  useTheme();
  return null;
}
