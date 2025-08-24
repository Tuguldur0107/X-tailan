// src/components/status/ReportStatusBadge.jsx
import React from "react";
import { Badge } from "@chakra-ui/react";

const colorMap = {
  SENT: "green",
  FAILED: "red",
  REVIEWING: "yellow",
  REJECTED: "orange",
  PENDING: "gray",
};

const labelMap = {
  SENT: "ИЛГЭЭСЭН",
  FAILED: "АМЖИЛТГҮЙ",
  REVIEWING: "ШАЛГАЖ БАЙНА",
  REJECTED: "ХҮЛЭЭЖ АВААГҮЙ",
  PENDING: "ХҮЛЭЭГДЭЖ БАЙНА",
};

export default function ReportStatusBadge({ status }) {
  const colorScheme = colorMap[status] || "gray";
  return (
    <Badge rounded="lg" colorScheme={colorScheme} variant="subtle">
      {labelMap[status] || status}
    </Badge>
  );
}
