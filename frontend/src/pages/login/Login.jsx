import { Box, Button, Container, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";

export default function Login() {
  const toast = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    toast({ title: "Mock login", description: "Backend дараагийн шатанд.", status: "success" });
  };
  return (
    <Container maxW="md" py={16}>
      <Box as="form" onSubmit={onSubmit} p={6} rounded="xl" borderWidth="1px">
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Имэйл</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Нууц үг</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button type="submit" colorScheme="brand" w="full">Нэвтрэх</Button>
        </VStack>
      </Box>
    </Container>
  );
}
