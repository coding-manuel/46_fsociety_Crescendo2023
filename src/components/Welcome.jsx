import React, { useState, useEffect } from "react";
import useMainStore from "../store/mainStore";
import { Title, Stack, Text, Group } from "@mantine/core";
import dayjs from "dayjs";

var hrs;

export default function Welcome() {
  const userDetails = useMainStore((state) => state.userDetails);
  const [greeting, setGreeting] = useState();

  useEffect(() => {
    hrs = dayjs().hour();
    handleGreeting();
  }, []);

  const handleGreeting = () => {
    if (hrs < 12) setGreeting("Good Morning");
    else if (hrs >= 12 && hrs <= 17) setGreeting("Good Afternoon");
    else if (hrs >= 17 && hrs <= 24) setGreeting("Good Evening");
  };

  return (
    <Group pt={16} align="flex-end" position="apart">
      <Stack spacing={0}>
        <Title order={5}>Welcome</Title>
        <Text fz={"xs"}>{greeting}</Text>
      </Stack>
      <Text fz={"xs"}>{dayjs().format("DD/MM/YYYY")}</Text>
    </Group>
  );
}
