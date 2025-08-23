// src/pages/login/Login.jsx
import React from "react";
import {
  Box, Button, Checkbox, Container, Divider, FormControl, FormLabel,
  FormHelperText, Heading, HStack, Input, InputGroup, InputLeftElement,
  InputRightElement, Link as CLink, Text, VStack, useColorModeValue,
  useToast, Icon,
} from "@chakra-ui/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MotionBox from "../../components/MotionBox/MotionBox";
import Navbar from "../../components/navbar/navbar"; // ← Нэмсэн

export default function Login() {
  const toast = useToast();
  const nav = useNavigate();

  const pageBg = useColorModeValue("bg.page", "bg.page");
  const cardBg = useColorModeValue("bg.card", "bg.card");
  const border = useColorModeValue("border.base", "border.base");
  const muted = useColorModeValue("fg.muted", "fg.muted");
  const gradMain = useColorModeValue(
    "linear(to-r, brand.400, brand.700)",
    "linear(to-r, brand.300, brand.500)"
  );

  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [remember, setRemember] = React.useState(true);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passValid = pass.length >= 6;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailValid || !passValid) {
      toast({
        title: "Буруу оруулга",
        description: !emailValid ? "Имэйлээ зөв бичнэ үү." : "Нууц үг хамгийн багадаа 6 тэмдэгт.",
        status: "error",
      });
      return;
    }

    if (remember) localStorage.setItem("authed", "1");
    else {
      sessionStorage.setItem("authed", "1");
      localStorage.removeItem("authed");
    }

    toast({ title: "Mock login", description: "Backend дараагийн шатанд.", status: "success" });
    nav("/home");
  };

  return (
    <Box bg={pageBg} minH="100dvh">
      <Navbar />

      <Container maxW="lg" py={{ base: 10, md: 16 }}>
        <VStack spacing={6} align="stretch">
          {/* Heading */}
          <Box>
            <Heading size="lg" bgGradient={gradMain} bgClip="text">
              Нэвтрэх
            </Heading>
            <Text mt={1} color={muted}>
              X-SENDER рүү нэвтрэх гэж байна..
            </Text>
          </Box>

          {/* Card */}
          <MotionBox
            as="form"
            onSubmit={onSubmit}
            bg={cardBg}
            borderWidth="1px"
            borderColor={border}
            rounded="2xl"
            p={{ base: 6, md: 8 }}
            shadow="elevated"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            _before={{
              content: '""',
              position: "absolute",
              inset: 0,
              rounded: "2xl",
              padding: "1px",
              bgGradient: "linear(to-br, brand.500, brand.300)",
              opacity: 0.65,
              WebkitMask:
                "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
              WebkitMaskComposite: "xor",
              pointerEvents: "none",
            }}
          >
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <FormLabel>Имэйл</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Mail} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.mn"
                    autoComplete="email"
                    isInvalid={email !== "" && !emailValid}
                  />
                </InputGroup>
                <FormHelperText color={muted}>Ажлын имэйлээ ашиглавал сайн.</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Нууц үг</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Lock} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type={showPass ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    isInvalid={pass !== "" && !passValid}
                  />
                  <InputRightElement>
                    <Icon
                      as={showPass ? EyeOff : Eye}
                      boxSize={4}
                      cursor="pointer"
                      onClick={() => setShowPass((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>
                <HStack mt={2} justify="space-between">
                  <Checkbox isChecked={remember} onChange={(e) => setRemember(e.target.checked)}>
                    Намайг сана
                  </Checkbox>
                  <CLink href="#" color="brand.500" fontSize="sm">
                    Нууц үг мартсан?
                  </CLink>
                </HStack>
              </FormControl>

              <Button type="submit" size="lg" variant="cta" rightIcon={<ArrowRight size={18} />}>
                Нэвтрэх
              </Button>

              <HStack>
                <Divider />
                <Text fontSize="sm" color={muted}>эсвэл</Text>
                <Divider />
              </HStack>

              <Button
                size="md"
                variant="facebook"
                leftIcon={<Icon as={Facebook} boxSize={18} />}
                as={CLink}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast({ title: "Facebook mock", description: "OAuth дараагийн шатанд.", status: "info" });
                }}
              >
                Facebook-р нэвтрэх
              </Button>

              <Text fontSize="xs" color={muted} textAlign="center" mt={2}>
                Нэвтэрснээр та манай Terms & Privacy-г зөвшөөрсөнд тооцно.
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
