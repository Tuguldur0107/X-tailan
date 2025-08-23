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
} from "@chakra-ui/react";
import { ArrowRight, Facebook, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Navbar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

function Feature({ icon, title, desc }) {
  return (
    <VStack
      align="start"
      p={5}
      rounded="xl"
      borderWidth="1px"
      spacing={2}
      borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}
      bg={useColorModeValue("white", "whiteAlpha.50")}
    >
      <HStack>
        <Icon as={icon} />
        <Heading size="sm">{title}</Heading>
      </HStack>
      <Text fontSize="sm" opacity={0.9}>
        {desc}
      </Text>
    </VStack>
  );
}

export default function LandingPage() {
  const nav = useNavigate();
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box minH="100dvh" bg={bg}>
      <Container maxW="6xl">
        {/* Top nav */}
        <Navbar />

        {/* Hero */}
        <VStack pt={{ base: 10, md: 20 }} pb={{ base: 10, md: 16 }} spacing={6} textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }} lineHeight={1.2}>
            ААН‑ийн <Text as="span" color="brand.400">X‑тайлан</Text> илгээхийг
            <br /> хялбар, алдаагүй болгоё
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="760px">
            Энэ бол олон нийтэд нээлттэй танилцуулгын хуудас. Та эндээс системийн талаар мэдээлэл авч,
            хүсвэл нэвтэрч демо хувилбарыг ашиглаж болно.
          </Text>

          <HStack>
            <Button
              size="lg"
              colorScheme="brand"
              rightIcon={<ArrowRight size={18} />}
              onClick={() => nav("/login")}
            >
              Систем рүү нэвтрэх
            </Button>
            <Button
              size="lg"
              variant={useColorModeValue("outline", "solid")}
              leftIcon={<Facebook size={18} />}
              onClick={() => window.open("https://facebook.com/yourpage", "_blank")}
            >
              Facebook хуудас
            </Button>
          </HStack>
        </VStack>

        {/* Features */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={12}>
          <Feature icon={Zap} title="Хурдтай" desc="Процессийг автоматжуулж, 1–2 минутанд бэлэн болгоно." />
          <Feature icon={ShieldCheck} title="Найдвартай" desc="Алдааны менежмент, баталгаажуулалттай." />
          <Feature icon={BarChart3} title="Өргөтгөх боломжтой" desc="Дараа нь бусад тайлан, нэгжүүдийг холбох архитектур." />
        </SimpleGrid>

        {/* Footer */}
        <VStack as="footer" py={10} spacing={2} opacity={0.9}>
          <Divider />
          <HStack>
            <Heading size="sm">X‑тайлан</Heading>
            <Badge colorScheme="brand">beta</Badge>
          </HStack>
          <Text fontSize="sm">© {new Date().getFullYear()} X‑тайлан — UFE Tech / IO Institute</Text>
          <CLink href="mailto:contact@example.com" fontSize="sm">
            contact@example.com
          </CLink>
        </VStack>
      </Container>
    </Box>
  );
}
