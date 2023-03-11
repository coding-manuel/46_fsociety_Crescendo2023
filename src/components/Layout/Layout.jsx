import React from "react"
import {
  Button,
  Box,
  Group,
  Stack,
  useMantineColorScheme,
  Container,
} from "@mantine/core"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import HeaderComp from "./HeaderComp"
import LogoLight from "/assets/react.svg"

export function HeadFootLayout({ children }) {
  return (
    <div style={{ overflow: "auto" }}>
      <HeaderComp />
      <div style={{ minHeight: "100vh" }}>
        <Container size="md">{children}</Container>
      </div>
      <Footer />
    </div>
  )
}

export function FootLayout({ children }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const navigate = useNavigate()
  return (
    <Stack py={40} sx={{ minHeight: "100vh" }} justify="space-between">
      {children}
      <img
        src={colorScheme === "dark" ? LogoLight : LogoDark}
        onClick={() => navigate("/")}
        style={{ height: 20, cursor: "pointer" }}
      />
    </Stack>
  )
}
