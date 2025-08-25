// src/pages/home/Home.jsx
import React, { useMemo, useRef, useState } from "react";
import {
  Box, Container, Grid, GridItem, Heading, HStack, VStack, Text, Button, Badge, useToast,
  Switch, StackDivider, useDisclosure, useColorModeValue, usePrefersReducedMotion, Collapse,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter 
} from "@chakra-ui/react";
import { ArrowRight, CreditCard, RefreshCw, Eye, AlertTriangle, ChevronDown, ChevronUp, Link2, Facebook } from "lucide-react";

// ✅ Navbar + Footer
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

import StatCard from "../../components/card/card";
import GenericTable from "../../components/table/table";
import ReportStatusBadge from "../../components/status/ReportStatusBadge";
import FailureDrawer from "../../components/modals/FailureDrawer";

// --- Gradient ring wrapper (landing шиг hover хүрээ) ---
function HoverRing({ children, rounded = "2xl", p = 0, hover = true, ...rest }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <Box
      position="relative"
      rounded={rounded}
      p={p}
      transition="transform .18s ease"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        rounded,
        padding: "1px",
        bgGradient: "linear(to-br, brand.500, brand.300)",
        opacity: 0,
        transition: "opacity .2s ease",
        WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
        WebkitMaskComposite: "xor",
        pointerEvents: "none",
      }}
      _hover={
        hover
          ? { _before: { opacity: 0.7 }, ...(prefersReducedMotion ? {} : { transform: "translateY(-3px)" }) }
          : undefined
      }
      _focusWithin={{ boxShadow: "0 0 0 3px rgba(99,102,241,.35)", _before: { opacity: 0.9 } }}
      {...rest}
    >
      {children}
    </Box>
  );
}

// --- MOCK data ---
const REPORT_NAMES = { "x-pit": "ХХОАТ", "x-cit": "ААНОАТ", "x-vat": "НӨАТ" };
const COMPANY_LABELS = { io: "IO Tech LLC", chip: "Chipmo LLC" };
const MOCK = {
  stats: { connectedCompanies: 2, sentLast30: 12, successRate: 0.92, avgDurationMin: 1.8 },
  companies: [
    { id: "io", name: "IO Tech LLC", reg: "1234567", connected: true },
    { id: "chip", name: "Chipmo LLC", reg: "9876543", connected: false },
  ],
  reports: [
    { id: "XT-2025-08-01", company: "IO Tech LLC", period: "2025/07", status: "SENT", date: "2025-08-15 10:12" },
    { id: "XT-2025-07-01", company: "Chipmo LLC", period: "2025/06", status: "FAILED", date: "2025-07-15 09:05",
      failure: { reason: "ТТД-1 маягтын нийлбэр таарахгүй.\nДэлгэрэнгүй: мөр 12-т 0 биш.", etaxChatUrl: "https://etax.example/chat/123" } },
    { id: "XT-2025-06-01", company: "IO Tech LLC", period: "2025/05", status: "SENT", date: "2025-06-15 11:42" },
  ],
  autosend: { io: { "x-cit": true, "x-pit": false, "x-vat": false }, chip: { "x-pit": false, "x-cit": false, "x-vat": false } },
  etaxOnlyReports: [ { code: "x-vat", name: "НӨАТ", company: "IO Tech LLC" }, { code: "x-employee", name: "ХАОАТ ажилтан", company: "Chipmo LLC" } ],
  usageThisMonth: [
    { at: "2025-08-01 09:05", item: "X тайлан (IO Tech LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-01 10:40", item: "X тайлан (Chipmo LLC · 2025/06)", amount: 5000 },
    { at: "2025-08-02 08:32", item: "X тайлан (IO Tech LLC · 2025/07 Дахин илгээх)", amount: 0 },
    { at: "2025-08-02 15:18", item: "X тайлан (IO Tech LLC · 2025/07 Баталгаажсан)", amount: 5000 },
    { at: "2025-08-03 11:55", item: "X тайлан (Chipmo LLC · 2025/06 Дахин илгээх)", amount: 0 },
    { at: "2025-08-03 16:07", item: "X тайлан (Chipmo LLC · 2025/06 Баталгаажсан)", amount: 5000 },
    { at: "2025-08-04 09:22", item: "X тайлан (IO Tech LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-05 14:01", item: "X тайлан (Chipmo LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-06 10:30", item: "X тайлан (IO Tech LLC · 2025/07 Дахин илгээх)", amount: 0 },
    { at: "2025-08-06 12:44", item: "X тайлан (IO Tech LLC · 2025/07 Баталгаажсан)", amount: 5000 },
    { at: "2025-08-07 09:10", item: "X тайлан (Chipmo LLC · 2025/07 Дахин илгээх)", amount: 0 },
    { at: "2025-08-07 09:58", item: "X тайлан (Chipmo LLC · 2025/07 Баталгаажсан)", amount: 5000 },
    { at: "2025-08-09 11:02", item: "X тайлан (IO Tech LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-11 13:20", item: "X тайлан (Chipmo LLC · 2025/06)", amount: 5000 },
    { at: "2025-08-13 09:48", item: "X тайлан (IO Tech LLC · 2025/07 Дахин илгээх)", amount: 0 },
    { at: "2025-08-13 10:05", item: "X тайлан (IO Tech LLC · 2025/07 Баталгаажсан)", amount: 5000 },
    { at: "2025-08-18 15:35", item: "X тайлан (Chipmo LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-22 08:26", item: "X тайлан (IO Tech LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-25 10:12", item: "X тайлан (Chipmo LLC · 2025/07)", amount: 5000 },
    { at: "2025-08-29 17:45", item: "X тайлан (IO Tech LLC · 2025/07)", amount: 5000 },
  ],
};

export default function Home() {
  const [auto, setAuto] = useState(MOCK.autosend);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFailure, setSelectedFailure] = useState(null);
  const [showUsage, setShowUsage] = useState(false);
  const toast = useToast();

  // Toggle баталгаажуулалтын state
  const [confirm, setConfirm] = useState({
    open: false,
    companyKey: null,   // 'io' | 'chip'
    reportCode: null,   // 'x-pit' | 'x-cit' | 'x-vat'
    nextValue: false
    });
  const cancelRef = useRef();

  const ghost  = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const header = useColorModeValue("gray.700", "gray.200");

  const reportColumns = useMemo(() => [
    { key: "id", title: "ID" },
    { key: "company", title: "Компани" },
    { key: "period", title: "Тайлант үе" },
    { key: "status", title: "Төлөв", render: (row) => <ReportStatusBadge status={row.status} /> },
    { key: "date", title: "Огноо" },
    { key: "actions", title: "", render: (row) => row.status === "FAILED" ? (
      <Button size="xs" leftIcon={<AlertTriangle size={14} />} onClick={(e) => {
        e.stopPropagation();
        setSelectedFailure({ reportId: row.id, company: row.company, period: row.period, reason: row.failure?.reason || "Шалтгаан тодорхойгүй.", etaxChatUrl: row.failure?.etaxChatUrl || "https://etax.example/chat" });
        onOpen();
      }}>Шалтгаан харах</Button>
    ) : null },
  ], [onOpen]);

  // Switch дарсан үед — зөвхөн баталгаажуулах модал нээнэ
  const requestToggle = (companyKey, reportCode, nextValue) => {
    setConfirm({ open: true, companyKey, reportCode, nextValue });
  };
  const applyToggle = async () => {
    setAuto(s => ({
      ...s,
      [confirm.companyKey]: {
        ...s[confirm.companyKey],
        [confirm.reportCode]: confirm.nextValue
      }
    }));
    // TODO: энд backend рүү хадгалах API дууд
    // await api.saveAutosend(confirm.companyKey, confirm.reportCode, confirm.nextValue)

    toast({
      title: confirm.nextValue ? "Амжилттай асаалаа" : "Амжилттай унтраалаа",
      description: `${COMPANY_LABELS[confirm.companyKey]} компанид ${REPORT_NAMES[confirm.reportCode]} тайлангийн тохиргоо шинэчлэгдлээ.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setConfirm({ open: false, companyKey: null, reportCode: null, nextValue: false });
  };
  const cancelToggle = () => {
    setConfirm({ open: false, companyKey: null, reportCode: null, nextValue: false });
  };

  const autosendColumns = [
    { key: "name", title: "Тайлан" },
    { key: "io", title: "IO Tech LLC", render: (r) => (
      <Switch
        isChecked={!!auto.io[r.code]}
        onChange={(e) => requestToggle("io", r.code, e.target.checked)}
      />
    ) },
    { key: "chip", title: "Chipmo LLC", render: (r) => (
      <Switch 
        isChecked={!!auto.chip[r.code]}
        onChange={(e) => requestToggle("chip", r.code, e.target.checked)}
      />
    ) },
  ];


  const usageColumns = useMemo(() => [
    { key: "at", title: "Огноо/цаг", width: "190px" },
    { key: "item", title: "Гүйлгээ" },
    { key: "amount", title: "Дүн", width: "120px", render: (r) => <Text fontWeight="semibold">{r.amount.toLocaleString()} ₮</Text> },
  ], []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <Container maxW="7xl" px={{ base: 4, md: 8 }} py={6}>
        {/* 🔗 Top connect buttons — илүү сүртэй, төвд */}
        <VStack mb={6} align="center">
          <HoverRing p={3}>
            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button size="lg" leftIcon={<Link2 size={18} />} colorScheme="brand" rounded="2xl" px={6} onClick={() => alert("eTax OAuth (mock)")}
                _hover={{ transform: "translateY(-2px)" }}>eTax холбох</Button>
              <Button size="lg" leftIcon={<Facebook size={18} />} colorScheme="blue" rounded="2xl" px={6} onClick={() => alert("Facebook OAuth (mock)")}
                _hover={{ transform: "translateY(-2px)" }}>Facebook холбох</Button>
            </HStack>
          </HoverRing>
        </VStack>

        {/* Toggle confirmation */}
        <AlertDialog
          isOpen={confirm.open}
          leastDestructiveRef={cancelRef}
          onClose={cancelToggle}
        >
          <AlertDialogOverlay>
            <AlertDialogContent rounded="2xl">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {confirm.nextValue ? "Автомат илгээхийг асаах уу?" : "Автомат илгээхийг унтраах уу?"}
              </AlertDialogHeader>

              <AlertDialogBody>
                {COMPANY_LABELS[confirm.companyKey] && REPORT_NAMES[confirm.reportCode] ? (
                  <Text>
                    <b>{COMPANY_LABELS[confirm.companyKey]}</b> компанид{" "}
                    <b>{REPORT_NAMES[confirm.reportCode]}</b> тайланг X‑ээр{" "}
                    <b>{confirm.nextValue ? "АВТОМАТ ИЛГЭЭХ" : "АВТОМАТ ИЛГЭЭХЭЭС ХАСАХ"}</b> тохиргоо хийх гэж байна.
                    Та баталгаажуулна уу.
                  </Text>
                ) : (
                  <Text>Тохиргоо хийх үү?</Text>
                )}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={cancelToggle} mr={3}>
                  Үгүй
                </Button>
                <Button colorScheme="brand" onClick={applyToggle}>
                  Тийм
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
  
        {/* Top stats */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
          <HoverRing><StatCard title="Холбогдсон компани" value={MOCK.stats.connectedCompanies} delta="+1" deltaColor="green" /></HoverRing>
          <HoverRing><StatCard title="Сүүлийн 30 хоногт илгээсэн" value={`${MOCK.stats.sentLast30} тайлан`} /></HoverRing>
          <HoverRing><StatCard title="Амжилттай хувь" value={`${Math.round(MOCK.stats.successRate * 100)}%`} /></HoverRing>
          <HoverRing><StatCard title="Дундаж хугацаа" value={`${MOCK.stats.avgDurationMin} мин`} /></HoverRing>
        </Grid>

        {/* History */}
        <Box mt={8}>
          <HStack mb={3} justify="space-between">
            <Heading size="md" color={header}>X тайлангийн түүх</Heading>
            <Button size="sm" variant="ghost" rightIcon={<ArrowRight size={16} />} _hover={{ bg: ghost }}>Бүгдийг харах</Button>
          </HStack>
          <HoverRing p={0}>
            <GenericTable columns={reportColumns} data={MOCK.reports} rowKey={(r) => r.id} onRowClick={(r) => {
              if (r.status === "FAILED") {
                setSelectedFailure({ reportId: r.id, company: r.company, period: r.period, reason: r.failure?.reason, etaxChatUrl: r.failure?.etaxChatUrl });
                onOpen();
              }
            }} />
          </HoverRing>
        </Box>

        {/* Companies + Autosend (LEFT)  |  Balance (RIGHT) */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6} mt={8}>
          <GridItem>
            {/* Companies */}
            <Heading size="md" mb={3} color={header}>Бүртгэлтэй компаниуд</Heading>
            <HoverRing p={0}>
              <VStack divider={<StackDivider />} spacing={0} borderWidth="1px" rounded="2xl" overflow="hidden" bg={useColorModeValue("whiteAlpha.600","blackAlpha.400")} style={{ backdropFilter: "saturate(180%) blur(8px)" }}>
                {MOCK.companies.map((c) => (
                  <HStack key={c.id} w="full" p={4} justify="space-between" _hover={{ bg: ghost }}>
                    <VStack align="start" spacing={0}>
                      <HStack>
                        <Text fontWeight="semibold">{c.name}</Text>
                        <Badge colorScheme={c.connected ? "green" : "yellow"} rounded="lg" variant="subtle">{c.connected ? "ХОЛБОГДСОН" : "ХОЛБОХ ХЭРЭГТЭЙ"}</Badge>
                      </HStack>
                      <Text fontSize="sm" color="gray.500">Регистер: {c.reg}</Text>
                    </VStack>
                    <HStack>
                      <Button size="sm" variant="outline" leftIcon={<Eye size={16} />}>Нээх</Button>
                      {!c.connected && <Button size="sm" colorScheme="brand">Холбох</Button>}
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </HoverRing>

            {/* Autosend matrix under companies */}
            <Box mt={8}>
              <Heading size="md" mb={3} color={header}>X-ээр автомат илгээх тохиргоо</Heading>
              <HoverRing p={0}>
                <GenericTable columns={autosendColumns} data={[{ code: "x-pit", name: "XХОАТ" }, { code: "x-cit", name: "ААНОАТ" }, { code: "x-vat", name: "НӨАТ" }]} rowKey={(r) => r.code} emptyMessage="Тохируулга алга." />
              </HoverRing>
            </Box>
          </GridItem>

            {/* Balance on the right */}
            <GridItem>
              <Heading size="md" mb={3} color={header}>Дансны үлдэгдэл</Heading>
              <HoverRing>
                <VStack
                  align="stretch"
                  spacing={4}
                  borderWidth="1px"
                  rounded="2xl"
                  p={5}
                  bg={useColorModeValue("whiteAlpha.700", "blackAlpha.500")}
                  style={{ backdropFilter: "saturate(180%) blur(8px)" }}
                >
                  {/* --- Одоогийн үлдэгдэл — илүү “сүртэй” --- */}
                  <Box>
                    <Text color="gray.500" fontSize="sm">Одоогийн үлдэгдэл</Text>
                    <HStack spacing={3} align="baseline">
                      <Heading
                        size="2xl"
                        lineHeight={1}
                        bgGradient="linear(to-r, brand.400, brand.600)"
                        bgClip="text"
                      >
                        185,000 ₮
                      </Heading>
                    </HStack>
                  </Box>

                  {/* --- Энэ сарын хэрэглээ + Хэрэглээг харах (нэг мөр) --- */}
                  <HStack justify="space-between" w="full">
                    <HStack color="gray.500" fontSize="sm">
                      <RefreshCw size={14} />
                      <Text>Энэ оны хэрэглээ: <b>65,000 ₮</b></Text>
                    </HStack>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowUsage((v) => !v)}
                      rightIcon={showUsage ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      _hover={{ bg: ghost }}
                    >
                      Хэрэглээг харах
                    </Button>
                  </HStack>

                  <Collapse in={showUsage} animateOpacity>
                    <Box mt={2} maxH="300px" overflowY="auto" pr={1}>
                      <GenericTable
                        columns={usageColumns}
                        data={MOCK.usageThisMonth}
                        rowKey={(r, i) => `${r.at}-${i}`}
                        size="sm"
                      />
                    </Box>
                  </Collapse>

                  <Button leftIcon={<CreditCard size={16} />} rounded="xl" colorScheme="brand">
                    Дахин цэнэглэх
                  </Button>
                </VStack>
              </HoverRing>
            </GridItem>
          </Grid>

        {/* failure drawer */}
        <FailureDrawer isOpen={isOpen} onClose={onClose} failure={selectedFailure} />
      </Container>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
