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
  Divider,
  Badge,
  Icon,
  Link as CLink,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  Tag,
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
} from "lucide-react";
import Navbar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

/** Reusable card-style feature */
function Feature({ icon, title, desc }) {
  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const text = useColorModeValue("gray.700", "gray.300");
  return (
    <VStack
      align="start"
      p={6}
      rounded="xl"
      borderWidth="1px"
      spacing={2}
      borderColor={border}
      bg={cardBg}
    >
      <HStack>
        <Icon as={icon} />
        <Heading size="sm">{title}</Heading>
      </HStack>
      <Text fontSize="sm" color={text}>{desc}</Text>
    </VStack>
  );
}

/** Tile for emoji steps (to keep hooks at top-level of a component) */
function StepTile({ emoji, title, desc }) {
  const cardBg = useColorModeValue("white", "whiteAlpha.50");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const text = useColorModeValue("gray.700", "gray.300");
  return (
    <VStack
      align="start"
      p={6}
      bg={cardBg}
      borderWidth="1px"
      borderColor={border}
      rounded="xl"
      shadow="sm"
    >
      <Text fontSize="3xl">{emoji}</Text>
      <Heading size="md">{title}</Heading>
      <Text color={text}>{desc}</Text>
    </VStack>
  );
}

/** Numbered timeline item */
function StepLine({ index, title, desc }) {
  const cardBg = useColorModeValue("white", "whiteAlpha.100");
  const border = useColorModeValue("gray.200", "whiteAlpha.200");
  const text = useColorModeValue("gray.700", "gray.300");
  return (
    <GridItem
      p={6}
      bg={cardBg}
      borderLeftWidth="4px"
      borderLeftColor="brand.500"
      borderWidth="1px"
      borderColor={border}
      rounded="xl"
      shadow="sm"
      position="relative"
      pl={14}
    >
      <Box
        position="absolute"
        left={4}
        top={6}
        w={10}
        h={10}
        rounded="full"
        bg="brand.600"
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="bold"
        shadow="md"
      >
        {index}
      </Box>
      <Heading size="md" mb={1}>{title}</Heading>
      <Text color={text}>{desc}</Text>
    </GridItem>
  );
}

export default function LandingPage() {
  const nav = useNavigate();

  // Top-level color values (safe for hooks)
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBgMain = useColorModeValue("white", "whiteAlpha.100");
  const borderMain = useColorModeValue("gray.200", "whiteAlpha.200");
  const muted = useColorModeValue("gray.700", "gray.300");

  const stepTiles = [
    { title: "Нэвтрэх", desc: "Messenger чатботоор өөрийн eTax аккаунтаар нэг удаа нэвтэрнэ.", emoji: "🔑" },
    { title: "Компанийн сонголт", desc: "Олон компанитай бол аль компанийг автоматаар удирдуулахыг сонгоно.", emoji: "🏢" },
    { title: "Тайлангийн жагсаалт", desc: "Систем танай компанийн тайлангийн төлөвийг автоматаар хянаж байдаг.", emoji: "📋" },
    { title: "Автомат илгээх", desc: "Хуулийн хугацаанд таны өмнөөс тайланг автоматаар илгээнэ.", emoji: "🚀" },
    { title: "Мэдэгдэл", desc: "Амжилттай илгээгдсэнийг Facebook Messenger-р шууд мэдэгдэнэ.", emoji: "📩" },
  ];

  const stepLines = [
    "Messenger чатботоор өөрийн eTax аккаунтаар нэг удаа нэвтэрнэ.",
    "Олон компанитай бол аль компанийг автоматаар удирдуулахыг сонгоно.",
    "Систем танай компанийн тайлангийн төлөвийг автоматаар хянаж байдаг.",
    "Хуулийн хугацаанд таны өмнөөс тайланг автоматаар илгээнэ.",
    "Амжилттай илгээгдсэнийг Facebook Messenger-р шууд мэдэгдэнэ.",
  ];

  return (
    <Box minH="100dvh" bg={bg}>
      <Container maxW="6xl">
        {/* Top nav */}
        <Navbar />

        {/* Hero */}
        <VStack pt={{ base: 10, md: 20 }} pb={{ base: 10, md: 16 }} spacing={6} textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }} lineHeight={1.2}>
            X тайлангаа март,
            <br />
            <Text as="span" color="brand.400">X-SENDER-ийг ажиллуул</Text>
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="760px">
            Таны өмнөөс X тайланг хуулийн хугацаанд автоматаар илгээнэ
          </Text>

          <HStack>
            <Button size="lg" colorScheme="brand" rightIcon={<ArrowRight size={18} />} onClick={() => nav("/login")}>
              Системд нэвтрэх
            </Button>
            <Button
              size="lg"
              variant={useColorModeValue("outline", "solid")}
              leftIcon={<Facebook size={18} />}
              onClick={() => window.open("https://www.facebook.com/profile.php?id=61578621497518", "_blank")}
            >
              Facebook Page
            </Button>
          </HStack>
        </VStack>

        {/* About */}
        <Box bg={cardBgMain} borderWidth="1px" borderColor={borderMain} p={{ base: 6, md: 10 }} rounded="2xl" shadow="md" mb={16}>
          <Heading size="lg" textAlign="center" mb={4}>X-SENDER гэж юу вэ?</Heading>
          <Text fontSize="lg" color={muted}>
            <Text as="span" fontWeight="semibold" color="brand.500">X-SENDER</Text> нь Монголын ААН-уудын Х тайланг{" "}
            <Text as="span" fontWeight="semibold">албан ёсны eTax API</Text> ашиглан автоматаар, алдаагүй, хугацаанд нь илгээх платформ.
            Messenger chatbot + Web App хосолсон интерфейсээр хэрэглэгчид энгийн, хурдан, найдвартай үйлчилгээ авна.
          </Text>
        </Box>

        {/* How it works – tiles */}
        <Box mb={16}>
          <Heading size="lg" textAlign="center" mb={8}>Хэрхэн ажилладаг вэ?</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {stepTiles.map((s, i) => <StepTile key={i} {...s} />)}
          </SimpleGrid>
        </Box>

        {/* How it works – numbered timeline */}
        <Box mb={16}>
          <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6}>
            {["Нэвтрэх","Компанийн сонголт","Тайлангийн жагсаалт","Автомат илгээх","Мэдэгдэл"]
              .map((title, idx) => (
                <StepLine key={idx} index={idx + 1} title={title} desc={stepLines[idx]} />
            ))}
          </Grid>
        </Box>

        {/* Value props */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={16}>
          <Feature icon={Zap} title="Хурдтай" desc="Процессийг автоматжуулж, 1–2 минутанд бэлэн болгоно." />
          <Feature icon={ShieldCheck} title="Найдвартай" desc="Алдааны менежмент, баталгаажуулалттай." />
          <Feature icon={BarChart3} title="Өргөтгөх боломжтой" desc="Дараа нь бусад тайлан, нэгжүүдийг холбох архитектур." />
        </SimpleGrid>

        {/* Pricing */}
        <Box bg={cardBgMain} borderWidth="1px" borderColor={borderMain} rounded="2xl" shadow="lg" p={{ base: 6, md: 10 }} mb={16}>
          <Heading size="lg" textAlign="center" mb={3}>Үнэ төлбөр</Heading>
          <Text textAlign="center" color={muted} mb={8}>
            X тайланг алдаагүй, автоматаар илгээх ухаалаг үйлчилгээг хямд үнээр ашиглаарай.
          </Text>

          <Box maxW="2xl" mx="auto" p={8} bg={useColorModeValue("white", "whiteAlpha.50")} borderWidth="1px"
               borderColor={borderMain} rounded="2xl" shadow="md">
            <Heading size="md" color="brand.600" mb={4}>5,000₮ / тайлан</Heading>
            <VStack align="start" spacing={4} color={muted}>
              <Text><Text as="span" color="green.600" fontWeight="semibold">✅ Эхний 3 тайлан үнэгүй:</Text> Шинээр бүртгүүлсэн хэрэглэгчид автоматаар нээгдэнэ.</Text>
              <Text><Text as="span" color="blue.600" fontWeight="semibold">💳 Цэнэглэх дүн:</Text> Хамгийн багадаа <b>50,000₮</b> буюу 10 тайлангийн эрхээр QPay-р цэнэглэнэ.</Text>
              <Text><Text as="span" color="purple.600" fontWeight="semibold">📊 Уян хатан зарцуулалт:</Text> Тайлан бүрт 5,000₮ хасагдаж, үлдэгдэл тань кредит хэлбэрээр хадгалагдана.</Text>
            </VStack>
            <Button mt={8} size="md" colorScheme="brand" leftIcon={<Icon as={Check} />} onClick={() => nav("/payment")}>
              QPay-ээр цэнэглэх
            </Button>
          </Box>
        </Box>

        {/* Security */}
        <Box mb={16}>
          <Heading size="lg" textAlign="center" mb={8}>Аюулгүй байдал</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Feature icon={Lock} title="Нууц үг хадгалахгүй" desc="eTax нууц үгийг хадгалдаггүй, токеныг түр хугацаанд шифрлэж ашиглана." />
            <Feature icon={ShieldCheck} title="AES-256 шифрлэлт" desc="etax нэр, ent_id зэрэг эмзэг өгөгдлийг PostgreSQL дээр AES-256-аар шифрлэнэ." />
            <Feature icon={ShieldCheck} title="Нэвтрэлтийн хамгаалалт" desc="Rate limit, 2FA, reCAPTCHA зэрэг хамгаалалтыг шат дараатай нэвтрүүлнэ." />
            <Feature icon={Check} title="Нууцлалын шалгалт" desc="Эмзэг байдлын скан, pen-test, Privacy Policy хэрэгжүүлэлт." />
          </SimpleGrid>
        </Box>

        {/* Technology */}
        <Box mb={20}>
          <Heading size="lg" textAlign="center" mb={4}>Технологийн шийдэл</Heading>
          <Text textAlign="center" mb={10} color={muted}>
            eTax системтэй албан ёсны API-р холбогдож, клауд дэд бүтэц дээр найдвартай ажиллана.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <Feature icon={Zap} title="Автомат ажиллагаа" desc="Таны оролцоогүйгээр бүх урсгалыг гүйцэтгэнэ." />
            <Feature icon={Cloud} title="Cloud дэд бүтэц" desc="Railway клауд дээр тасралтгүй ажиллагаатай." />
            <Feature icon={Server} title="Сүүлийн үеийн фреймворк" desc="Node.js, NestJS, Next.js зэрэг технологиуд." />
            <Feature icon={ShieldCheck} title="Хамгаалалт" desc="Нууцлал, шифрлэлт, CI/CD, логжуулалт бүрэн." />
          </SimpleGrid>

          <Wrap justify="center" spacing={3}>
            {["Next.js","NestJS","Node.js","PostgreSQL","Docker","Railway","ManyChat","QPay API","eTax API"].map((t) => (
              <WrapItem key={t}><Tag size="md" colorScheme="blue" variant="subtle">{t}</Tag></WrapItem>
            ))}
          </Wrap>
        </Box>

        {/* Footer */}
        <VStack as="footer" py={10} spacing={2} opacity={0.9}>
          <Divider />
          <HStack>
            <Heading size="sm">X-тайлан</Heading>
            <Badge colorScheme="brand">beta</Badge>
          </HStack>
          <Text fontSize="sm">© {new Date().getFullYear()} X-тайлан — UFE Tech / IO Institute</Text>
          <CLink href="mailto:contact@example.com" fontSize="sm">contact@example.com</CLink>
        </VStack>
      </Container>
    </Box>
  );
}
