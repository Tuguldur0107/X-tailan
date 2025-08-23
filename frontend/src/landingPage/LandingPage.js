import React from "react";
import {
  ChakraProvider,
  extendTheme,
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Spacer,
  Icon,
  Link as CLink,
  useColorMode,
  useColorModeValue,
  Divider,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Moon, Sun, ArrowRight, Facebook, LogIn, BarChart3 } from "lucide-react";
import { extendTheme } from "@chakra-ui/react";

// --- Theme (system-aware dark/light)
const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  fonts: {
    heading: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    body: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  },
  colors: {
    brand: {
      50: "#e3f2ff",
      100: "#b7dcff",
      200: "#8bc6ff",
      300: "#5fb0ff",
      400: "#339bff",
      500: "#1a81e6",
      600: "#1265b4",
      700: "#0b4982",
      800: "#053052",
      900: "#011a2b",
    },
  },
});

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const IconComp = colorMode === "light" ? Moon : Sun;
  return (
    <Button onClick={toggleColorMode} size="sm" variant="ghost" leftIcon={<IconComp size={16} />}
      aria-label="Toggle color mode">
      {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
}

function NavBar() {
  return (
    <HStack as="nav" w="100%" py={3}>
      <HStack spacing={2}>
        <Icon as={BarChart3} />
        <Heading size="md">X‑тайлан</Heading>
        <Badge colorScheme="brand">beta</Badge>
      </HStack>
      <Spacer />
      <HStack spacing={2}>
        <ColorModeToggle />
        <Button leftIcon={<Icon as={LogIn} />} colorScheme="brand" onClick={() => (window.location.href = "/login")}>Нэвтрэх</Button>
      </HStack>
    </HStack>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <VStack align="start" p={5} rounded="xl" borderWidth="1px" borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}>
      <HStack>
        <Icon as={icon} />
        <Heading size="sm">{title}</Heading>
      </HStack>
      <Text fontSize="sm" opacity={0.9}>{desc}</Text>
    </VStack>
  );
}

function Hero() {
  return (
    <Box pt={{ base: 10, md: 20 }} pb={{ base: 10, md: 16 }}>
      <VStack spacing={6} textAlign="center">
        <Heading size={{ base: "xl", md: "2xl" }}>
          X‑тайлангаа <Text as="span" color="brand.400">автоматаар</Text> илгээгээрэй
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="720px">
          eTax интеграцтайгаар тайлан илгээх процессыг хялбарчилна. Одоогоор frontend бэлдэж байна — нэвтэрч орон
          системийн демог үзнэ үү.
        </Text>
        <HStack>
          <Button size="lg" colorScheme="brand" rightIcon={<ArrowRight size={18} />} onClick={() => (window.location.href = "/login")}>Систем рүү нэвтрэх</Button>
          <Button size="lg" variant={useColorModeValue("outline", "solid")} leftIcon={<Facebook size={18} />} onClick={() => window.open("https://facebook.com/yourpage", "_blank")}>Facebook хуудас</Button>
        </HStack>
      </VStack>

      <Box mt={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          <Feature icon={BarChart3} title="Хурдтай" desc="1–2 минутанд X‑тайлангаа илгээх урсгалыг бүрдүүлнэ." />
          <Feature icon={LogIn} title="Нэвтрэх" desc="Энгийн нэвтрэлт — дараа нь eTax‑тай уялдах SSO/Token төлөвлөсөн." />
          <Feature icon={ArrowRight} title="Өргөтгөх боломжтой" desc="Дараа нь ААН‑ийн бусад тайлан нэмэх боломжтой архитектур." />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function Footer() {
  return (
    <VStack as="footer" py={10} spacing={2} opacity={0.8}>
      <Divider />
      <Text fontSize="sm">© {new Date().getFullYear()} X‑тайлан — UFE Tech / IO Institute</Text>
      <CLink href="mailto:contact@example.com" fontSize="sm">contact@example.com</CLink>
    </VStack>
  );
}

export default function LandingApp() {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100dvh" bg={useColorModeValue("gray.50", "gray.900")}>
        <Container maxW="6xl">
          <NavBar />
          <Hero />
          <Footer />
        </Container>
      </Box>
    </ChakraProvider>
  );
}
