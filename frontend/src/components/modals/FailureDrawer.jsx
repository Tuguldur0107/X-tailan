// src/components/modals/FailureDrawer.jsx
import React from "react";
import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, VStack, Text, HStack, Button, Code, useColorModeValue,
} from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";

export default function FailureDrawer({ isOpen, onClose, failure }) {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg={bg}>
        <DrawerCloseButton />
        <DrawerHeader>Амжилтгүй тайлангийн мэдээлэл</DrawerHeader>
        <DrawerBody>
          {failure ? (
            <VStack align="start" spacing={4}>
              <HStack><Text fontWeight="bold">Тайлан:</Text><Code>{failure.reportId}</Code></HStack>
              <HStack><Text fontWeight="bold">Компани:</Text><Text>{failure.company}</Text></HStack>
              <HStack><Text fontWeight="bold">Период:</Text><Text>{failure.period}</Text></HStack>
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Шалтгаан:</Text>
                <Code whiteSpace="pre-wrap" p={3} rounded="md" width="full">
                  {failure.reason}
                </Code>
              </VStack>

              <Button
                leftIcon={<MessageSquare size={16} />}
                colorScheme="brand"
                variant="solid"
                rounded="xl"
                onClick={() => window.open(failure.etaxChatUrl, "_blank")}
              >
                eTax систем дээр чатлах
              </Button>
            </VStack>
          ) : (
            <Text>Сонгогдсон бичлэг алга.</Text>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
