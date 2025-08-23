import { HStack, Heading, Spacer, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const nav = useNavigate();
  const authed = localStorage.getItem("authed") === "1";

  return (
    <HStack py={3}>
      <Heading size="md" cursor="pointer" onClick={() => nav("/")}>X‑Sender</Heading>
      <Spacer />
      <HStack>
        <IconButton
          aria-label="theme"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <Moon size={16}/> : <Sun size={16}/>}
          variant="ghost"
          size="sm"
        />
        {authed ? (
          <Button
            leftIcon={<LogOut size={16}/>}
            onClick={() => { localStorage.removeItem("authed"); nav("/"); }}>
            Гарах
          </Button>
        ) : (
          <Button leftIcon={<LogIn size={16}/>} onClick={() => nav("/login")}>Нэвтрэх</Button>
        )}
      </HStack>
    </HStack>
  );
}
