// src/components/table/table.jsx
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * columns: [{ key: 'name', title: 'Нэр', render?: (row) => node, width? }]
 * data: [{...}]
 */
export default function GenericTable({
  columns = [],
  data = [],
  rowKey = (row, i) => i,
  onRowClick,
  emptyMessage = "Илэрц олдсонгүй",
  size = "md",
  variant = "simple",
}) {
  const hoverBg = useColorModeValue("blackAlpha.50", "whiteAlpha.100");
  const headerBg = useColorModeValue("whiteAlpha.700", "blackAlpha.300");
  const border = useColorModeValue("border.base", "border.base");

  return (
    <Box borderWidth="1px" borderColor={border} rounded="2xl" overflow="hidden" bg={useColorModeValue("whiteAlpha.600","blackAlpha.400")}
         style={{ backdropFilter: "saturate(180%) blur(8px)" }}>
      <Table size={size} variant={variant}>
        <Thead bg={headerBg}>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key} width={col.width || "auto"}>{col.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length}>
                <Text py={6} textAlign="center" color="gray.500">
                  {emptyMessage}
                </Text>
              </Td>
            </Tr>
          ) : (
            data.map((row, idx) => (
              <Tr
                key={rowKey(row, idx)}
                cursor={onRowClick ? "pointer" : "default"}
                _hover={{ bg: hoverBg }}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <Td key={col.key}>
                    {typeof col.render === "function" ? col.render(row) : row[col.key]}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
