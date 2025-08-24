// src/components/card/card.jsx
import React from "react";
import { Box, HStack, VStack, Text, Badge, useColorModeValue } from "@chakra-ui/react";

export default function StatCard({ title, value, delta, deltaColor = "gray", right }) {
  const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.400");
  const border = useColorModeValue("border.base", "border.base");
  const shadow = useColorModeValue("0 6px 14px rgba(17,24,39,.08)", "0 6px 14px rgba(0,0,0,.35)");

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={border}
      rounded="2xl"
      p={5}
      boxShadow={shadow}
      style={{ backdropFilter: "saturate(180%) blur(8px)" }}
    >
      <HStack align="start" spacing={4} justify="space-between">
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            {title}
          </Text>
          <HStack spacing={3}>
            <Text fontWeight="bold" fontSize="3xl" lineHeight={1}>
              {value}
            </Text>
            {delta != null && (
              <Badge colorScheme={deltaColor} variant="subtle" rounded="lg" px={2}>
                {delta}
              </Badge>
            )}
          </HStack>
        </VStack>
        {right || null}
      </HStack>
    </Box>
  );
}
