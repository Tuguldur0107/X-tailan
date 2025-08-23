// src/theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

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
    facebook: {
      50:"#e8f1ff",
      100:"#cfe0ff",
      200:"#a5c3ff",
      300:"#7aa6ff",
      400:"#4e8aff",
      500:"#1877F2", // FB blue
      600:"#166FE5",
      700:"#0F5BD8",
      800:"#0b4aa8",
      900:"#093a85",
    },
  },

  // semantic tokens so we can write bg="bg.card" etc
  semanticTokens: {
    colors: {
      "bg.page":   { _light: "gray.50",       _dark: "gray.900" },
      "bg.card":   { _light: "white",         _dark: "whiteAlpha.50" },
      "fg.muted":  { _light: "gray.600",      _dark: "gray.400" },
      "border.base": { _light: "blackAlpha.200", _dark: "whiteAlpha.200" },
    },
    shadows: {
      elevated: { _light: "lg", _dark: "dark-lg" },
    },
  },

  radii: { xl: "1rem", "2xl": "1.25rem" },

  components: {
    Button: {
      baseStyle: { borderRadius: "xl" },

      variants: {
        // Primary CTA with gradient/glow
        cta: {
          bgGradient: "linear(to-r, brand.500, brand.700)",
          color: "white",
          px: 6,
          boxShadow: "0 10px 22px rgba(99,102,241,.24)",
          _hover: {
            bgGradient: "linear(to-r, brand.400, brand.600)",
            transform: "translateY(-1px)",
            boxShadow: "0 12px 26px rgba(99,102,241,.30)",
          },
          _active: { transform: "translateY(0)" },
          _focusVisible: { boxShadow: "0 0 0 3px rgba(99,102,241,.35)" },
        },

        // Facebook solid
        facebook: {
          bg: "facebook.500",
          color: "white",
          _hover: {
            bg: "facebook.600",
            transform: "translateY(-1px)",
            boxShadow: "0 10px 22px rgba(24,119,242,.28)",
          },
          _active: { bg: "facebook.700" },
          _focusVisible: { boxShadow: "0 0 0 3px rgba(24,119,242,.35)" },
        },

        // Facebook outline
        facebookOutline: (props) => ({
          borderWidth: "1px",
          borderColor: "facebook.500",
          color: "facebook.600",
          _hover: { bg: mode("facebook.50", "whiteAlpha.200")(props) },
        }),
      },
    },

    Tag: {
      baseStyle: {
        container: { borderRadius: "full" },
      },
    },
  },
});

export default theme;
