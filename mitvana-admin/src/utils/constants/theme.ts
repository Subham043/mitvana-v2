import { rem, type MantineThemeOverride } from "@mantine/core";

export const mantineThemOptions: MantineThemeOverride = {
  /** Put your mantine theme override here */
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "blue",

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
};