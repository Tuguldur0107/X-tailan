// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "system", useSystemColorMode: true },
  fonts: {
    heading: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  colors: {
    brand: {
      50:  "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#5558e3",
      700: "#4649c7",
      800: "#373aa5",
      900: "#2d317f",
    },
  },
  semanticTokens: {
    colors: {
      "bg.page": { _light: "gray.50", _dark: "gray.900" },
      "bg.card": { _light: "white", _dark: "whiteAlpha.50" },
      "fg.muted": { _light: "gray.600", _dark: "gray.400" },
      "border.base": { _light: "blackAlpha.200", _dark: "whiteAlpha.200" },
    },
    shadows: {
      "elevated": { _light: "lg", _dark: "dark-lg" },
    },
  },
  radii: { xl: "1rem", "2xl": "1.25rem" },
});

export default theme;
