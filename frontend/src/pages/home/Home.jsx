import { Box, Container, VStack, Heading, Text, HStack, Button, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/navbar/Navbar";
import { ArrowRight, Facebook, BarChart3 } from "lucide-react";

function Feature({ icon: IconComp, title, desc }) {
  return (
    <VStack align="start" p={5} rounded="xl" borderWidth="1px" borderColor={useColorModeValue("gray.200", "whiteAlpha.200")}>
      <HStack><IconComp /><Heading size="sm">{title}</Heading></HStack>
      <Text fontSize="sm" opacity={0.9}>{desc}</Text>
    </VStack>
  );
}

export default function Home() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100dvh">
      <Container maxW="6xl">
        <Navbar />
        <VStack pt={{ base: 10, md: 20 }} pb={{ base: 10, md: 16 }} spacing={6} textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }}>
            X‑тайлангаа <Text as="span" color="brand.400">автоматаар</Text> илгээгээрэй
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="720px">
            eTax интеграц нь дараагийн шатанд. Одоогоор фронт‑энд демо.
          </Text>
          <HStack>
            <Button as="a" href="/login" size="lg" colorScheme="brand" rightIcon={<ArrowRight size={18} />}>
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

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={12}>
          <Feature icon={BarChart3} title="Хурдтай" desc="1–2 минутын урсгал." />
          <Feature icon={ArrowRight} title="Энгийн нэвтрэлт" desc="Дараа нь eTax‑тай уялдах." />
          <Feature icon={ArrowRight} title="Өргөтгөх боломжтой" desc="Бусад тайлан нэмэх архитектур." />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
