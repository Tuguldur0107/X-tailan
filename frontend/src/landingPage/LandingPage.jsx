// src/landingPage/LandingPage.jsx
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  usePrefersReducedMotion,
  Divider,
  Badge,
  Icon,
  Link as CLink,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  Tag,
  Stack,
  Center,
  Kbd,
} from "@chakra-ui/react";
import {
  ArrowRight,
  Facebook,
  BarChart3,
  ShieldCheck,
  Zap,
  Lock,
  Cloud,
  Server,
  Check,
  Cpu,
  Palette,
  Route,
  CloudCog,
  Rocket,
  Shield,
  CreditCard,
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
      bg={cardBg}
      borderWidth="1px"
      borderColor={border}
      rounded="2xl"
      p={{ base: 4, md: 5 }}
      shadow="elevated"
      position="relative"
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
      {...rest}
    >
      {children}
    </MotionBox>
  );
}

function IconTitle({ icon: I, title, right }) {
  return (
    <HStack align="center" justify="space-between" mb={1}>
      <HStack spacing={2}>
        {I && (
          <Center
            w="38px"
            h="38px"
            rounded="xl"
            borderWidth="1px"
            borderColor="border.base"
          >
            <Icon as={I} boxSize={5} />
          </Center>
        )}
        <Heading size="sm">{title}</Heading>
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
  const border     = useColorModeValue("border.base", "border.base");
  const ringBorder = useColorModeValue("brand.200", "whiteAlpha.400");

  // gradient variables (text)
  const gradMain = useColorModeValue(
    "linear(to-r, brand.400, brand.700)",
    "linear(to-r, brand.300, brand.500)"
  );
  const gradSub = useColorModeValue(
    "linear(to-r, brand.300, brand.600)",
    "linear(to-r, brand.400, brand.500)"
  );

  // Content
  const securityItems = [
    { icon: Lock,        title: "Нууц үг хадгалахгүй",    desc: "eTax нууц үгийг хадгалдаггүй, токеныг түр хугацаанд шифрлэж ашиглана." },
    { icon: ShieldCheck, title: "AES-256 шифрлэлт",       desc: "etax нэр, ent_id зэрэг эмзэг өгөгдлийг PostgreSQL дээр AES-256-аар шифрлэнэ." },
    { icon: ShieldCheck, title: "Нэвтрэлтийн хамгаалалт", desc: "Rate limit, 2FA, reCAPTCHA зэрэг хамгаалалтыг шат дараатай нэвтрүүлнэ." },
    { icon: Check,       title: "Нууцлалын шалгалт",      desc: "Эмзэг байдлын скан, pen-test, Privacy Policy хэрэгжүүлэлт." },
  ];

  const stepLines = [
    "Messenger чатботоор өөрийн eTax аккаунтаар нэг удаа нэвтэрнэ.",
    "Олон компанитай бол аль компанийг автоматаар удирдуулахыг сонгоно.",
    "Систем танай компанийн тайлангийн төлөвийг автоматаар хянаж байдаг.",
    "Хуулийн хугацаанд таны өмнөөс тайланг автоматаар илгээнэ.",
    "Амжилттай илгээгдсэнийг Facebook Messenger-р шууд мэдэгдэнэ.",
  ];

  return (
    <Box bg={pageBg} minH="100dvh">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Navbar />

        {/* HERO: Mosaic */}
        <Stack direction={{ base: "column", lg: "row" }} spacing={6} pt={{ base: 8, md: 12 }} pb={{ base: 8, md: 10 }}>
          <Grid templateColumns={{ base: "repeat(6, 1fr)", lg: "repeat(8, 1fr)" }} gap={4} flex="1">
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile>
                <IconTitle icon={Rocket} title="Автомат ажиллагаа" />
                <Text color={muted} fontSize="sm">Тайланг хугацаанд нь <Kbd>auto</Kbd> илгээж, алдааг бууруулна.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile>
                <IconTitle icon={Shield} title="Хамгаалалт" />
                <Text color={muted} fontSize="sm">AES-256 шифрлэлт, 2FA, rate limit.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile>
                <IconTitle icon={CloudCog} title="Cloud дэд бүтэц" />
                <Text color={muted} fontSize="sm">Railway клауд, тасралтгүй ажиллагаа.</Text>
              </Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile>
                <IconTitle icon={CreditCard} title="QPay төлбөр" />
                <Text color={muted} fontSize="sm">Хялбар, аюулгүй цэнэглэлт.</Text>
              </Tile>
            </GridItem>

            {/* Center board */}
            <GridItem colSpan={{ base: 6, lg: 8 }}>
              <Tile p={{ base: 5, md: 8 }} hover={false}>
                <VStack spacing={4}>
                  <Heading size={{ base: "lg", md: "xl" }} textAlign="center" lineHeight={1.2}>
                    X тайлангаа март,{" "}
                    <Text as="span" bgClip="text" bgGradient={gradMain}>
                      X-SENDER-ийг ажиллуул
                    </Text>
                  </Heading>
                  <Text textAlign="center" bgGradient={gradSub} bgClip="text" maxW="3xl">
                    Таны өмнөөс X тайланг хуулийн хугацаанд автоматаар илгээнэ
                  </Text>
                  <HStack spacing={3} wrap="wrap" justify="center">
                    <Button size="lg" colorScheme="brand" rightIcon={<ArrowRight size={18} />} onClick={() => nav("/login")}>
                      Системд нэвтрэх
                    </Button>
                    <Button
                      size="lg"
                      variant={useColorModeValue("outline", "solid")}
                      leftIcon={<Facebook size={18} />}
                      onClick={() => window.open("https://www.facebook.com/profile.php?id=61578621497518","_blank")}
                    >
                      Facebook Page
                    </Button>
                  </HStack>
                  <Wrap justify="center" spacing={3} pt={2}>
                    {["React 18","Chakra UI","React Router v7","Axios","Framer Motion","Lucide Icons","Railway Cloud","eTax API"].map((t) => (
                      <WrapItem key={t}>
                        <Tag
                          rounded="full"
                          px={4}
                          py={2}
                          variant="subtle"
                          colorScheme="blue"
                          transition="all .2s"
                          _hover={{
                            transform: prefersReducedMotion ? undefined : "translateY(-2px)",
                            boxShadow: prefersReducedMotion ? undefined : "0 10px 20px rgba(99,102,241,.18)",
                          }}
                        >
                          {t}
                        </Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </VStack>
              </Tile>
            </GridItem>

            {/* Bottom small tiles */}
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Cpu} title="React 18" /><Text color={muted} fontSize="sm">Concurrent, StrictMode.</Text></Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Palette} title="Chakra UI" /><Text color={muted} fontSize="sm">Theme-тэй, responsive.</Text></Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Route} title="React Router v7" /><Text color={muted} fontSize="sm">Route tree, lazy.</Text></Tile>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <Tile><IconTitle icon={Cloud} title="Axios" /><Text color={muted} fontSize="sm">Interceptors, retry.</Text></Tile>
            </GridItem>
          </Grid>
        </Stack>

        {/* ABOUT */}
        <Tile as={Box} p={{ base: 6, md: 8 }} mb={10}>
          <Heading size="lg" textAlign="center" mb={3} bgGradient={gradMain} bgClip="text">
            X-SENDER гэж юу вэ?
          </Heading>
          <Text fontSize="lg" color={muted} textAlign="center" maxW="4xl" mx="auto">
            <Text as="span" fontWeight="semibold" color="brand.500">X-SENDER</Text>{" "}
            нь Монголын ААН-уудын Х тайланг <Text as="span" fontWeight="semibold">албан ёсны eTax API</Text>{" "}
            ашиглан автоматаар, алдаагүй, хугацаанд нь илгээх платформ. Messenger chatbot + Web App хосолсон интерфейсээр
            хэрэглэгчид энгийн, хурдан, найдвартай үйлчилгээ авна.
          </Text>
        </Tile>

        {/* NEW: LEFT How it works + RIGHT Pricing */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 420px" }} gap={6} alignItems="start" mb={12}>
          {/* LEFT: How it works */}
          <Box>
            <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">
              Хэрхэн ажилладаг вэ?
            </Heading>
            <VStack spacing={4} align="stretch">
              {["Нэвтрэх","Компанийн сонголт","Тайлангийн жагсаалт","Автомат илгээх","Мэдэгдэл"].map((title, idx) => (
                <Tile key={idx} p={6} position="relative">
                  <Box
                    position="absolute"
                    left={4}
                    top={4}
                    w="42px"
                    h="42px"
                    rounded="full"
                    bgGradient="linear(to-br, brand.500, brand.700)"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="md"
                    boxShadow="0 8px 16px rgba(99,102,241,.35)"
                    _after={{
                      content: '""',
                      position: "absolute",
                      inset: "-4px",
                      rounded: "full",
                      border: "2px solid",
                      borderColor: ringBorder,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <VStack align="start" pl="60px" spacing={1}>
                    <Heading size="md">{title}</Heading>
                    {/* desc text as gradient */}
                    <Text bgGradient={gradSub} bgClip="text">{stepLines[idx]}</Text>
                  </VStack>
                </Tile>
              ))}
            </VStack>
          </Box>

          {/* RIGHT: Pricing */}
          <Box>
            <Heading size="lg" mb={4} textAlign="left" bgGradient={gradMain} bgClip="text">
              💳 Үнэ төлбөр
            </Heading>
            <Tile as={Box} p={{ base: 6, md: 8 }}>
              <HStack justify="space-between" mb={3}>
                <Heading size="md" color="brand.600">Стандарт</Heading>
                <Badge colorScheme="brand" variant="subtle" rounded="full" px={3}>
                  Хамгийн их ашиглагддаг
                </Badge>
              </HStack>

              <HStack align="baseline" spacing={2} mb={2} justify="center">
                <Heading size="2xl" lineHeight={1} bgGradient={gradMain} bgClip="text">
                  5,000₮
                </Heading>
                <Text opacity={0.85}>/ тайлан</Text>
              </HStack>

              <Text color={muted} mb={4}>Дараах нөхцөлтэйгээр энгийн, ойлгомжтой тариф.</Text>

              <VStack align="start" spacing={3} color={muted}>
                <HStack><Icon as={Check} color="green.500" /><Text>Эхний 3 тайлан үнэгүй — шинээр бүртгүүлсэнд автоматаар</Text></HStack>
                <HStack><Icon as={Check} color="green.500" /><Text>Цэнэглэх дүн: <b>50,000₮</b> (10 тайлангийн эрх)</Text></HStack>
                <HStack><Icon as={Check} color="green.500" /><Text>Уян хатан зарцуулалт — тайлан бүрт 5,000₮ суутна</Text></HStack>
                <HStack><Icon as={Check} color="green.500" /><Text>QPay-ээр аюулгүй төлбөр тооцоо</Text></HStack>
              </VStack>

              <Button
                mt={6}
                size="md"
                colorScheme="brand"
                leftIcon={<Icon as={Check} />}
                w="full"
                onClick={() => nav("/payment")}
                transition="all .2s"
                _hover={{ transform: prefersReducedMotion ? undefined : "translateY(-2px)" }}
              >
                QPay-ээр цэнэглэх
              </Button>
            </Tile>
          </Box>
        </Grid>

        {/* VALUE PROPS */}
        <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">Яагаад X-SENDER?</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={12}>
          {[
            { icon: Zap,          title: "Хурдтай",            desc: "Процессийг автоматжуулж, 1–2 минутанд бэлэн болгоно." },
            { icon: ShieldCheck,  title: "Найдвартай",         desc: "Алдааны менежмент, баталгаажуулалттай." },
            { icon: BarChart3,    title: "Өргөтгөх боломжтой", desc: "Дараа нь бусад тайлан, нэгжүүдийг холбох архитектур." },
          ].map((f, i) => (
            <Tile key={i}><IconTitle icon={f.icon} title={f.title} /><Text color={muted}>{f.desc}</Text></Tile>
          ))}
        </SimpleGrid>

        {/* SECURITY */}
        <Heading size="lg" mb={4} bgGradient={gradMain} bgClip="text">🔒 Аюулгүй байдал</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={12}>
          {securityItems.map((f, i) => (
            <Tile key={i}>
              <HStack mb={2} spacing={3}><Icon as={f.icon} boxSize={6} /><Heading size="md">{f.title}</Heading></HStack>
              <Text color={muted}>{f.desc}</Text>
            </Tile>
          ))}
        </SimpleGrid>

        {/* TECHNOLOGY */}
        <Heading size="lg" mb={2} bgGradient={gradMain} bgClip="text">🚀 Технологийн шийдэл</Heading>
        <Text fontSize="lg" mb={8} color={muted} maxW="700px">
          X-SENDER нь eTax системтэй албан ёсны API-р шууд холбогдож, найдвартай клауд дэд бүтэц дээр ажилладаг.
          Орчин үеийн технологиудыг ашиглан хурдтай, найдвартай, өргөтгөх боломжтой шийдлийг санал болгож байна.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
          {[
            { icon: Cloud,        title: "Cloud дэд бүтэц",     desc: "Railway клауд дээр байршуулсан, тасралтгүй ажиллагаатай, scale-д бэлэн орчин." },
            { icon: Server,       title: "Сүүлийн үеийн фреймворк", desc: "React 18, Chakra UI, React Router v7, Axios, Framer Motion." },
            { icon: ShieldCheck,  title: "Хамгаалалт",          desc: "Нууцлал, AES-256 шифрлэлт, CI/CD, логжуулалт, мониторинг." },
            { icon: Rocket,       title: "Автомат ажиллагаа",  desc: "Оролцоогүйгээр урсгалыг автоматжуулж, алдаагүй тайлан илгээнэ." },
          ].map((f, i) => (
            <Tile key={i}><IconTitle icon={f.icon} title={f.title} /><Text color={muted}>{f.desc}</Text></Tile>
          ))}
        </SimpleGrid>

        {/* FOOTER */}
        <VStack as="footer" py={10} spacing={2} opacity={0.9}>
          <Divider />
          <HStack>
            <Heading size="sm">X-Sender</Heading>
            <Badge colorScheme="brand">beta</Badge>
          </HStack>
          <CLink href="mailto:hello@x-sender.mn" fontSize="sm">hello@x-sender.mn</CLink>
        </VStack>
      </Container>
    </Box>
  );
}
