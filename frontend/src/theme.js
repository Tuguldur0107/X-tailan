import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    {/* системийн горимыг зөв оноох */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);
