// src/components/footer/footer.jsx
import React from "react";
import { Box, Container, HStack, Text, Link, Spacer, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.500");
  const border = useColorModeValue("border.base", "border.base");

  return (
    <Box as="footer" mt={10} bg={bg} borderTopWidth="1px" borderColor={border}
         style={{ backdropFilter: "saturate(180%) blur(8px)" }}>
      <Container maxW="7xl" py={4} px={{ base: 4, md: 8 }}>
        <HStack spacing={4} fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          <Text>© {new Date().getFullYear()} X-Sender</Text>
          <Spacer />
          <HStack spacing={4}>
            <Link href="#" _hover={{ textDecoration: "none", opacity: 0.8 }}>Тухай</Link>
            <Link href="#" _hover={{ textDecoration: "none", opacity: 0.8 }}>Тусламж</Link>
            <Link href="#" _hover={{ textDecoration: "none", opacity: 0.8 }}>Нууцлал</Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
