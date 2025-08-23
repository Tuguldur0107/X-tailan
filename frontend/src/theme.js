// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "system", useSystemColorMode: true },
  fonts: {
    heading: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  },
  colors: {
    brand: {
      50: "#e3f2ff",
      100: "#b7dcff",
      200: "#8bc6ff",
      300: "#5fb0ff",
      400: "#339bff",
      500: "#1a81e6",
      600: "#1265b4",
      700: "#0b4982",
      800: "#053052",
      900: "#011a2b",
    },
  },
});

export default theme;
