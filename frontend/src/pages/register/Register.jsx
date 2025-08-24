// src/pages/register/Register.jsx
import React from "react";
import {
  Box, Button, Checkbox, Container, Divider, FormControl, FormLabel,
  FormHelperText, Heading, HStack, Input, InputGroup, InputLeftElement,
  InputRightElement, Link as CLink, Text, VStack, useColorModeValue,
  useToast, Icon, Grid, GridItem, usePrefersReducedMotion
} from "@chakra-ui/react";
import { User, Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Facebook, FileText } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MotionBox from "../../components/MotionBox/MotionBox";
import Navbar from "../../components/navbar/navbar";

// .md файлууд
import termsMdUrl from "../../legal/terms.md";
import privacyMdUrl from "../../legal/privacy.md";

// ---------- Markdown Pane ----------
function MarkdownPane({ title, src, maxH = "75vh" }) {
  const [text, setText] = React.useState("");
  const [MD, setMD] = React.useState(null);
  const containerRef = React.useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    fetch(src).then(r => r.text()).then(setText).catch(() => setText("Агуулга олдсонгүй."));
    import("react-markdown").then(m => setMD(() => m.default)).catch(() => setMD(null));
  }, [src]);

  // 🔁 Ачаалахад тогтмол хурдаар доош гүйлгэнэ.
  //  - Хэрэглэгч mouse/touch/keyboard/click хиймэгц зогсоно
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !text || prefersReducedMotion) return;

    let stopped = false;
    let rafId = 0;

    const stop = () => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(rafId);
    };

    // 🛑 хэрэглэгчийн оролцоо → зогсооно
    const opts = { passive: true };
    el.addEventListener("wheel", stop, opts);
    el.addEventListener("touchstart", stop, opts);
    el.addEventListener("mousedown", stop, opts); // ← pane дээр click
    document.addEventListener("keydown", stop);

    // ▶️ тогтмол хурдтай урсгал
    el.scrollTop = 0;
    const start = performance.now();
    const max = Math.max(0, el.scrollHeight - el.clientHeight);
    const speedPxPerSec = 30; // ← хурд (px/sec) — хүсвэл 30/60 гэх мэт өөрчилж болно

    const tick = (now) => {
      if (stopped) return;
      const elapsedSec = (now - start) / 1000;
      const nextTop = Math.min(max, elapsedSec * speedPxPerSec);
      el.scrollTop = nextTop;
      if (nextTop < max) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      stop();
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchstart", stop);
      el.removeEventListener("mousedown", stop);
      document.removeEventListener("keydown", stop);
    };
  }, [text, prefersReducedMotion]);


  const plate  = useColorModeValue("whiteAlpha.700", "blackAlpha.400");
  const border = useColorModeValue("border.base", "border.base");
  const titleColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box>
      <HStack mb={2} color={titleColor}>
        <Icon as={FileText} boxSize={4} />
        <Text fontWeight="semibold">{title}</Text>
      </HStack>

      <Box
        ref={containerRef}
        bg={plate}
        borderWidth="1px"
        borderColor={border}
        rounded="xl"
        p={4}
        maxH="75vh"
        overflowY="auto"
        style={{ backdropFilter: "saturate(180%) blur(8px)" }}
        fontSize="sm"             // 👈 текстийг багасгав (sm). Хэрвээ бүр жижиг болгоё гэвэл "xs".
        lineHeight="1.5"
      >
        {MD ? (
          <MD
            // 👇 Markdown heading-уудыг ч бас жижиг болгоно (сонголттой)
            components={{
              h1: (props) => <Heading as="h3" size="sm" mb={2} {...props} />,
              h2: (props) => <Heading as="h4" size="xs" mt={3} mb={1} {...props} />,
              p:  (props) => <Text mb={2} {...props} />,
              li: (props) => <li style={{ marginBottom: 6 }} {...props} />,
            }}
          >
            {text}
          </MD>
        ) : (
          <Box whiteSpace="pre-wrap">{text}</Box>
        )}
      </Box>
    </Box>
  );
}

// ---------- Register ----------
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

  const [name, setName]       = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail]     = React.useState("");
  const [pass, setPass]       = React.useState("");
  const [pass2, setPass2]     = React.useState("");
  const [showPass, setShowPass]   = React.useState(false);
  const [showPass2, setShowPass2] = React.useState(false);
  const [agree, setAgree]     = React.useState(true);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const passValid  = pass.length >= 6;
  const samePass   = pass !== "" && pass === pass2;
  const nameValid  = name.trim().length >= 2;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameValid)  return toast({ title: "Овог нэр", description: "Нэрээ зөв оруулна уу.", status: "error" });
    if (!emailValid) return toast({ title: "Имэйл", description: "Имэйл хаяг буруу байна.", status: "error" });
    if (!passValid)  return toast({ title: "Нууц үг", description: "Нууц үг 6+ тэмдэгт байх ёстой.", status: "error" });
    if (!samePass)   return toast({ title: "Нууц үг баталгаажуулалт", description: "Нууц үгнүүд таарахгүй байна.", status: "error" });
    if (!agree)      return toast({ title: "Нөхцөл", description: "Үйлчилгээний нөхцлийг зөвшөөрнө үү.", status: "warning" });

    localStorage.setItem("authed", "1");
    toast({ title: "Амжилттай бүртгэгдлээ", description: "Mock register — backend дараа.", status: "success" });
    nav("/home");
  };

  return (
    <Box bg={pageBg} minH="100dvh">
      <Navbar />

      <Container maxW="7xl" py={{ base: 10, md: 16 }}>
        {/* 3 багана: зүүн (Terms) — гол (Form) — баруун (Privacy) */}
        <Grid templateColumns={{ base: "1fr", lg: "320px 1fr 320px" }} gap={6} alignItems="start">
          {/* LEFT: Terms */}
          <GridItem display={{ base: "none", lg: "block" }} position="sticky" top="84px">
            <MarkdownPane title="Үйлчилгээний нөхцөл (Terms)" src={termsMdUrl} />
          </GridItem>

          {/* CENTER: Register form */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="lg" bgGradient={gradMain} bgClip="text">
                  Бүртгүүлэх
                </Heading>
                <Text mt={1} color={muted}>
                  Шинэ бүртгэл үүсгээд X-Sender ашиглаарай.
                </Text>
              </Box>

              <MotionBox
                as="form"
                onSubmit={onSubmit}
                bg={cardBg}
                borderWidth="1px"
                borderColor={border}
                rounded="2xl"
                p={{ base: 6, md: 8 }}
                shadow="elevated"
                position="relative"
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
                    <FormLabel>Овог нэр</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={User} boxSize={4} />
                      </InputLeftElement>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Жишээ: О.Нэр"
                        isInvalid={name !== "" && !nameValid}
                      />
                    </InputGroup>
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
                    <FormLabel>Нууц үгээ давтан хийнэ үү</FormLabel>
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
                        isInvalid={pass2 !== "" && pass2 !== pass}
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

                  {/* Agree checkbox */}
                  <HStack mt={1} justify="space-between">
                    <Checkbox isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
                      <Text fontSize="sm">
                        <CLink as={RouterLink} to="/terms" color="brand.500" target="_blank" rel="noopener noreferrer">Terms</CLink>{" "}
                        болон{" "}
                        <CLink as={RouterLink} to="/privacy" color="brand.500" target="_blank" rel="noopener noreferrer">Privacy</CLink>
                        —д зөвшөөрч байна
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
                    <Text fontSize="sm" color={muted}>Аль хэдийн бүртгэлтэй юу?</Text>
                    <CLink as={RouterLink} to="/login" color="brand.500" fontWeight="semibold">
                      Нэвтрэх
                    </CLink>
                  </HStack>
                </VStack>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* RIGHT: Privacy */}
          <GridItem display={{ base: "none", lg: "block" }} position="sticky" top="84px">
            <MarkdownPane title="Нууцлалын бодлого (Privacy)" src={privacyMdUrl} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
