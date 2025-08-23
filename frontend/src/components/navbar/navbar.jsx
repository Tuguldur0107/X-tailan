// src/components/navbar/navbar.jsx
import React from "react";
import {
  Box,
  Container,
  HStack,
  Heading,
  Text,
  Badge,
  IconButton,
  Button,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const nav = useNavigate();
  const authed = localStorage.getItem("authed") === "1";

  const headerBg = useColorModeValue(
    "rgba(255,255,255,0.72)",
    "rgba(17,24,39,0.58)"
  );
  const border = useColorModeValue("border.base", "border.base");
  const brandGrad = useColorModeValue(
    "linear(to-r, brand.400, brand.700)",
    "linear(to-r, brand.300, brand.500)"
  );
  const ghostHover = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg={headerBg}
      borderBottomWidth="1px"
      borderColor={border}
      style={{ backdropFilter: "saturate(180%) blur(8px)" }}
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <HStack py={3} spacing={3}>
          {/* Brand */}
          <HStack spacing={2} cursor="pointer" onClick={() => nav("/")}>
            <Box
              w="34px"
              h="34px"
              rounded="xl"
              bgGradient="linear(to-br, brand.500, brand.300)"
              display="grid"
              placeItems="center"
              boxShadow="0 6px 14px rgba(99,102,241,.35)"
            >
              <Text fontWeight="bold" color="white" fontSize="sm">
                X
              </Text>
            </Box>
            <Heading size="md" lineHeight={1}>
              <Text bgGradient={brandGrad} bgClip="text">
                X-Sender
              </Text>
            </Heading>
            <Badge colorScheme="brand" variant="subtle" ml="1">
              beta
            </Badge>
          </HStack>

          <Spacer />

          {/* Right controls: theme + (optional) logout */}
          <HStack spacing={2}>
            <IconButton
              aria-label="Toggle theme"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
              variant="ghost"
              rounded="xl"
              size="sm"
              _hover={{ bg: ghostHover }}
            />

            {authed && (
              <Button
                size="sm"
                variant="outline"
                leftIcon={<LogOut size={16} />}
                rounded="xl"
                onClick={() => {
                  localStorage.removeItem("authed");
                  nav("/");
                }}
              >
                Гарах
              </Button>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
