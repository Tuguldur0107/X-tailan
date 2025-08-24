// src/pages/register/Register.jsx
import React from "react";
import {
  Box, Button, Checkbox, Container, Divider, FormControl, FormLabel,
  FormHelperText, Heading, HStack, Input, InputGroup, InputLeftElement,
  InputRightElement, Link as CLink, Text, VStack, useColorModeValue,
  useToast, Icon,
} from "@chakra-ui/react";
import { User, Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Facebook } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MotionBox from "../../components/MotionBox/MotionBox";
import Navbar from "../../components/navbar/navbar";

export default function Register() {
  const toast = useToast();
  const nav = useNavigate();

  const pageBg = useColorModeValue("bg.page", "bg.page");
  const cardBg = useColorModeValue("bg.card", "bg.card");
  const border = useColorModeValue("border.base", "border.base");
  const muted  = useColorModeValue("fg.muted", "fg.muted");
  const gradMain = useColorModeValue(
    "linear(to-r, brand.400, brand.700)",
    "linear(to-r, brand.300, brand.500)"
  );

  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);
  const [agree, setAgree] = React.useState(true);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passValid  = pass.length >= 6;
  const samePass   = pass !== "" && pass === pass2;
  const nameValid  = name.trim().length >= 2;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameValid)   return toast({ title: "Овог нэр", description: "Нэрээ зөв оруулна уу.", status: "error" });
    if (!emailValid)  return toast({ title: "Имэйл", description: "Имэйл хаяг буруу байна.", status: "error" });
    if (!passValid)   return toast({ title: "Нууц үг", description: "Нууц үг 6+ тэмдэгт байх ёстой.", status: "error" });
    if (!samePass)    return toast({ title: "Нууц үг баталгаажуулалт", description: "Нууц үгнүүд таарахгүй байна.", status: "error" });
    if (!agree)       return toast({ title: "Нөхцөл", description: "Үйлчилгээний нөхцлийг зөвшөөрнө үү.", status: "warning" });

    // Mock register — дараагийн шатанд backend
    localStorage.setItem("authed", "1");
    toast({ title: "Амжилттай бүртгэгдлээ", description: "Mock register — backend дараа.", status: "success" });
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
              Бүртгүүлэх
            </Heading>
            <Text mt={1} color={muted}>
              Шинэ акаунт үүсгээд X-Sender ашиглаарай.
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
            position="relative"
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
                <FormLabel>Овог нэр</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={User} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Жишээ: Б.Хаш-Эрдэнэ"
                    isInvalid={name !== "" && !nameValid}
                  />
                </InputGroup>
                <FormHelperText color={muted}>Ажлын нэрийг бичнэ.</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Компани (сонголт)</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Building2} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="IO Tech LLC"
                  />
                </InputGroup>
              </FormControl>

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
                <FormHelperText color={muted}>Ажлын имэйл байх тусам сайн.</FormHelperText>
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
                    autoComplete="new-password"
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
                <FormHelperText color={muted}>Хамгийн багадаа 6 тэмдэгт.</FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Нууц үгээ давт</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Lock} boxSize={4} />
                  </InputLeftElement>
                  <Input
                    type={showPass2 ? "text" : "password"}
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    isInvalid={pass2 !== "" && !samePass}
                  />
                  <InputRightElement>
                    <Icon
                      as={showPass2 ? EyeOff : Eye}
                      boxSize={4}
                      cursor="pointer"
                      onClick={() => setShowPass2((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <HStack mt={1} justify="space-between">
                <Checkbox isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
                  <Text fontSize="sm">
                    <CLink color="brand.500" href="#">Terms</CLink> болон{" "}
                    <CLink color="brand.500" href="#">Privacy</CLink>-г зөвшөөрч байна
                  </Text>
                </Checkbox>
              </HStack>

              <Button type="submit" size="lg" variant="cta" rightIcon={<ArrowRight size={18} />}>
                Бүртгүүлэх
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
                Facebook-р бүртгүүлэх
              </Button>

              <HStack justify="center" pt={1}>
                <Text fontSize="sm" color={muted}>Аль хэдийн акаунттай юу?</Text>
                <CLink as={RouterLink} to="/login" color="brand.500" fontWeight="semibold">
                  Нэвтрэх
                </CLink>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}
