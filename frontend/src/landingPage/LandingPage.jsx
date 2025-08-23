// src/landingPage/LandingPage.jsx
import React from "react";
import {
  Box, Container, Heading, Text, Button, HStack, VStack, SimpleGrid,
  useColorModeValue, usePrefersReducedMotion, Divider, Badge, Icon,
  Link as CLink, Grid, GridItem, Stack, Center, Kbd,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from "@chakra-ui/react";
import {
  ArrowRight, Facebook, ShieldCheck, Lock, Cloud, Check,
  Cpu, Palette, Route, CloudCog, Rocket, Shield, CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import MotionBox from "../components/MotionBox/MotionBox";

// ---------- Small building blocks ----------
function Tile({ children, as = "div", hover = true, ...rest }) {
  const cardBg = useColorModeValue("bg.card", "bg.card");
  const border = useColorModeValue("border.base", "border.base");
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MotionBox
      as={as}
      tabIndex={0}
      bg={cardBg}
      borderWidth="1px"
      borderColor={border}
      rounded="2xl"
      p={{ base: 4, md: 5 }}
      shadow="elevated"
      position="relative"
      outline="0"
      whileHover={hover && !prefersReducedMotion ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        rounded: "2xl",
        padding: "1px",
        bgGradient: "linear(to-br, brand.500, brand.300)",
        opacity: 0,
        transition: "opacity .2s ease",
        WebkitMask:
          "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
        WebkitMaskComposite: "xor",
        pointerEvents: "none",
      }}
      _hover={{ _before: { opacity: 0.7 } }}
      _focusVisible={{ boxShadow: "0 0 0 3px rgba(99,102,241,.35)", _before: { opacity: 0.9 } }}
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

function IconTitle({ icon: I, title, right, gradient = true }) {
  // rainbow headline gradient
  const grad = "linear(to-r, #06B6D4, #6366F1, #A78BFA)";
  return (
    <HStack align="center" justify="space-between" mb={1}>
      <HStack spacing={2}>
        {I && (
          <Center w="38px" h="38px" rounded="xl" borderWidth="1px" borderColor="border.base">
            <Icon as={I} boxSize={5} />
          </Center>
        )}
        <Heading size="sm" {...(gradient ? { bgGradient: grad, bgClip: "text" } : {})}>
          {title}
        </Heading>
      </HStack>
      {right}
    </HStack>
  );
}

// ---------- Page ----------
export default function LandingPage() {
  const nav = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  const pageBg     = useColorModeValue("bg.page", "bg.page");
  const muted      = useColorModeValue("fg.muted", "fg.muted");
  const ringBorder = useColorModeValue("brand.200", "whiteAlpha.400");

  // 🌈 илүү өнгөлөг солонгорсон градиентууд
  const gradMain = "linear(to-r, #22D3EE, #60A5FA, #A78BFA)";
  const gradSub  = "linear(to-r, #22D3EE, #60A5FA, #A78BFA)";

  // ... бусад const-уудын дараа, return-оос өмнө
  const pricePerReport = 5000;
  const [estReports, setEstReports] = React.useState(2);
  const asCur = (n) => n.toLocaleString("mn-MN");


  // ... бусад const-уудын дор
  const techItems = [
    { icon: Cpu,    title: "React 18",        desc: "Concurrent, StrictMode." },
    { icon: Palette,title: "Chakra UI",       desc: "Theme-тэй, responsive." },
    { icon: Route,  title: "React Router v7", desc: "Route tree, lazy." },
    { icon: Cloud,  title: "Axios",           desc: "Interceptors, retry." },
  ];

  const stepLines = [
    "eTax, facebook аккаунуудаа холбож бүртгүүлэх.",
    "Олон компанитай бол аль компанийг автоматаар удирдуулахыг сонгоно.",
    "Систем танай компанийн тайлангийн төлөвийг автоматаар хянаж байдаг.",
    "Хуулийн хугацаанд таны өмнөөс тайланг автоматаар илгээнэ.",
    "Амжилттай илгээгдсэнийг Facebook Messenger-р шууд мэдэгдэнэ.",
  ];

  const securityItems = [
    { icon: Lock,        title: "Нууц үг хадгалахгүй",    desc: "eTax нууц үгийг хадгалдаггүй, токеныг түр хугацаанд шифрлэж ашиглана." },
    { icon: ShieldCheck, title: "AES-256 шифрлэлт",       desc: "etax нэр, ent_id зэрэг эмзэг өгөгдлийг PostgreSQL дээр AES-256-аар шифрлэнэ." },
    { icon: ShieldCheck, title: "Нэвтрэлтийн хамгаалалт", desc: "Rate limit, 2FA, reCAPTCHA зэрэг хамгаалалтыг шат дараатай нэвтрүүлнэ." },
    { icon: Check,       title: "Нууцлалын шалгалт",      desc: "Эмзэг байдлын скан, pen-test, Privacy Policy хэрэгжүүлэлт." },
  ];

  return (
    <Box bg={pageBg} minH="100dvh">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Navbar />

        {/* HERO mosaic (жижиг боломжууд + төв самбар + CHIP СТЕК) */}
        <Stack direction={{ base: "column", lg: "row" }} spacing={6} pt={{ base: 8, md: 12 }} pb={{ base: 8, md: 10 }}>
          <Grid templateColumns={{ base: "repeat(6, 1fr)", lg: "repeat(8, 1fr)" }} gap={4} flex="1">
            {/* жижиг плитууд */}
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Rocket} title="Автомат ажиллагаа" gradient />
                <Text color={muted} fontSize="sm">Тайланг хугацаанд нь <Kbd>auto</Kbd> илгээнэ.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Shield} title="Хамгаалалт" gradient />
                <Text color={muted} fontSize="sm">AES-256, 2FA, rate limit.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={CloudCog} title="Cloud дэд бүтэц" gradient />
                <Text color={muted} fontSize="sm">Railway клауд, тасралтгүй ажиллагаа.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={CreditCard} title="QPay төлбөр" gradient />
                <Text color={muted} fontSize="sm">Хялбар, аюулгүй цэнэглэлт.</Text>
              </Tile>
            </GridItem>

            {/* төв самбар */}
            <GridItem colSpan={{ base: 6, lg: 8 }}>
              <Tile p={{ base: 5, md: 8 }} hover={false}>
                <VStack spacing={4}>
                  <Heading size={{ base: "lg", md: "xl" }} textAlign="center" lineHeight={1.2}>
                    X тайлангаа март,{" "}
                    <Text as="span" bgClip="text" bgGradient={gradMain}>X-SENDER-ийг ажиллуул</Text>
                  </Heading>
                  <Text textAlign="center" bgGradient={gradSub} bgClip="text" maxW="3xl">
                    Таны өмнөөс X тайланг хуулийн хугацаанд автоматаар илгээнэ
                  </Text>
                  <HStack spacing={3} wrap="wrap" justify="center">
                    {/* НЭВТРЭХ CTA */}
                    <Button
                      size="lg"
                      variant="cta"
                      role="group"            // group hover ашиглахын тулд
                      onClick={() => nav("/login")}
                    >
                      <HStack spacing={2}>
                        <Text>Системд нэвтрэх</Text>
                        <Icon
                          as={ArrowRight}
                          boxSize={5}
                          transition="transform .2s ease"
                          _groupHover={{ transform: "translateX(4px)" }}
                        />
                      </HStack>
                    </Button>

                    {/* FACEBOOK STYLE */}
                    <Button
                      size="lg"
                      variant="facebook"      // эсвэл "facebookOutline" хэрвээ тийм variant нэмсэн бол
                      leftIcon={<Facebook size={18} />}
                      as={CLink}
                      href="https://www.facebook.com/profile.php?id=61578621497518"
                      isExternal
                    >
                      Facebook Page
                    </Button>
                  </HStack>
                </VStack>
              </Tile>
            </GridItem>
          </Grid>
        </Stack>

        {/* ABOUT + HOW IT WORKS (зүүн)  |  PRICING (баруун) */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 420px" }} gap={6} alignItems="start" mb={12}>
          {/* LEFT: About + How it works */}
          <Box>
            <VStack align="stretch" spacing={6}>
              {/* About */}
              <Box mb={6}>
                <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">
                  X-SENDER гэж юу вэ?
                </Heading>

                <Tile as={Box} p={{ base: 6, md: 8 }}>
                  <Text fontSize="lg" color={muted}>
                    <Text as="span" fontWeight="semibold" color="brand.500">X-SENDER</Text>{" "}
                    нь Монголын ААН-уудын Х тайланг <Text as="span" fontWeight="semibold">албан ёсны eTax API</Text>{" "}
                    ашиглан автоматаар, алдаагүй, хуулийн хугацаанд багтааж таны өмнөөөс илгээх платформ юм.
                    Түүнчлэн Messenger chatbot + Web App хосолсон интерфейсээр хэрэглэгчид энгийн, хурдан,
                    найдвартай үйлчилгээ үзүүлдэг.
                  </Text>
                </Tile>
              </Box>


              {/* How it works */}
              <Box>
                <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">
                  Хэрхэн ажилладаг вэ?
                </Heading>
                <VStack spacing={4} align="stretch">
                  {["Нэвтрэх","Компанийн сонголт","Тайлангийн жагсаалт","Автомат илгээх","Мэдэгдэл"].map((title, idx) => (
                    <Tile key={idx} p={6} position="relative">
                      <Box
                        position="absolute" left={4} top={4} w="42px" h="42px"
                        rounded="full" bgGradient="linear(to-br, brand.500, brand.700)" color="white"
                        display="flex" alignItems="center" justifyContent="center"
                        fontWeight="bold" fontSize="md" boxShadow="0 8px 16px rgba(99,102,241,.35)"
                        _after={{
                          content: '""', position: "absolute", inset: "-4px", rounded: "full",
                          border: "2px solid", borderColor: ringBorder
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <VStack align="start" pl="60px" spacing={1}>
                        <Heading size="md">{title}</Heading>
                        <Text bgGradient={gradSub} bgClip="text">{stepLines[idx]}</Text>
                      </VStack>
                    </Tile>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>

          {/* RIGHT: Pricing (хөөрхөн нэмэлтүүдтэйгээ тэр чигт нь) */}
          <Box>
            <Heading size="lg" mb={4} textAlign="left" bgGradient={gradMain} bgClip="text">
              Үнэ төлбөр
            </Heading>

            <VStack align="stretch" spacing={4}>
              {/* 1) Үндсэн үнэ / давуу талууд */}
              <Tile as={Box} p={{ base: 6, md: 8 }}>
                <HStack align="baseline" spacing={2} mb={2} justify="center">
                  <Heading size="2xl" lineHeight={1} bgGradient={gradMain} bgClip="text">5,000₮</Heading>
                  <Text opacity={0.85}>/ тайлан</Text>
                </HStack>

                <VStack align="start" spacing={3} color={muted}>
                  <HStack><Icon as={Check} color="green.500" /><Text>Шинэ хэрэглэгч бүрт эхний 3 тайлан үнэгүй</Text></HStack>
                  <HStack><Icon as={Check} color="green.500" /><Text>Цэнэглэх доод дүн: <b>50,000₮</b></Text></HStack>
                  <HStack><Icon as={Check} color="green.500" /><Text>Уян хатан зарцуулалт — тайлан бүрт 5,000₮ суутна</Text></HStack>
                  <HStack><Icon as={Check} color="green.500" /><Text>QPay-ээр аюулгүй төлбөр тооцоо</Text></HStack>
                </VStack>

                <Button
                  mt={6}
                  size="md"
                  variant="cta"
                  leftIcon={<Icon as={Check} />}
                  w="full"
                  onClick={() => nav("/payment")}
                  _hover={{ transform: prefersReducedMotion ? undefined : "translateY(-2px)" }}
                >
                  QPay-ээр цэнэглэх
                </Button>
              </Tile>

              {/* 2) Түргэн цэнэглэх */}
              <Tile as={Box} p={{ base: 5, md: 6 }}>
                <Heading size="sm" mb={3}>Түргэн цэнэглэх</Heading>
                <SimpleGrid columns={{ base: 3 }} gap={3}>
                  <Button variant="outline" onClick={() => nav("/payment?amount=50000")}>50,000₮</Button>
                  <Button variant="outline" onClick={() => nav("/payment?amount=100000")}>100,000₮</Button>
                  <Button variant="outline" onClick={() => nav("/payment?amount=200000")}>200,000₮</Button>
                </SimpleGrid>
                <Text color={muted} fontSize="sm" mt={2}>10 / 20 / 40 тайлангийн эрх.</Text>
              </Tile>

              {/* 3) Сарын зардлын тооцоолуур */}
              <Tile as={Box} p={{ base: 5, md: 6 }}>
                <Heading size="sm" mb={3}>Сарын зардлын тооцоолуур</Heading>
                <HStack spacing={4}>
                  <Text minW="150px">Тайлангийн тоо: <b>{estReports}</b></Text>
                  <Slider flex="1" min={0} max={60} step={1} value={estReports} onChange={setEstReports}>
                    <SliderTrack><SliderFilledTrack /></SliderTrack>
                    <SliderThumb />
                  </Slider>
                </HStack>
                <HStack justify="space-between" mt={3}>
                  <Text color={muted}>Тооцоолол</Text>
                  <Heading size="md" bgGradient={gradMain} bgClip="text">
                    {asCur(estReports * pricePerReport)}₮
                  </Heading>
                </HStack>
                <Text color={muted} fontSize="xs" mt={1}>
                  Анхны бүртгэлд эхний 3 тайлан үнэгүй (шинэ хэрэглэгчдэд).
                </Text>
              </Tile>

              {/* 4) FAQ */}
              <Tile as={Box} p={{ base: 5, md: 6 }}>
                <Heading size="sm" mb={2}>Түгээмэл асуулт</Heading>
                <Accordion allowToggle reduceMotion>
                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">QPay яаж төлөх вэ?</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} color={muted}>
                      QPay-г сонгоод банкны апп-аар QR-ийг скан хийж баталгаажуулна. Төлбөр амжилттай болсны дараа эрх автоматаар нэмэгдэнэ.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">Эрх дуусвал?</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} color={muted}>
                      Цэнэглэсний дараагаас автоматаар үргэлжилнэ. Илгээхээс өмнө үлдэгдлийн сануулга явна.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem border="0">
                    <AccordionButton px={0}>
                      <Box as="span" flex="1" textAlign="left" fontWeight="semibold">НӨАТ баримт?</Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel px={0} color={muted}>
                      НӨАТ/суутгалын мэдээллээ төлбөрийн цонхноос шалгана. (Дотоод бодлогоор текстээ шинэчлээрэй.)
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Tile>
            </VStack>
          </Box>
        </Grid>


        {/* ✅ Зүүн — Технологи / Баруун — Аюулгүй байдал (ижил дизайн) */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} alignItems="start" mb={12}>
          {/* LEFT: Технологи */}
          <Box>
            <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">
              Технологи
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {techItems.map((t) => (
                <Tile key={t.title}>
                  <IconTitle icon={t.icon} title={t.title} gradient />
                  <Text color={muted}>{t.desc}</Text>
                </Tile>
              ))}
            </SimpleGrid>
          </Box>

          {/* RIGHT: Аюулгүй байдал */}
          <Box>
            <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">
              Аюулгүй байдал
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {securityItems.map((f) => (
                <Tile key={f.title}>
                  <IconTitle icon={f.icon} title={f.title} gradient />
                  <Text color={muted}>{f.desc}</Text>
                </Tile>
              ))}
            </SimpleGrid>
          </Box>
        </Grid>


        {/* FOOTER */}
        <VStack as="footer" py={10} spacing={2} opacity={0.9}>
          <Divider />
          <HStack><Heading size="sm">X-Sender</Heading><Badge colorScheme="brand">beta</Badge></HStack>
          <CLink href="mailto:hello@x-sender.mn" fontSize="sm">hello@x-sender.mn</CLink>
        </VStack>
      </Container>
    </Box>
  );
}
