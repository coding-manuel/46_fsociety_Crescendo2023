import { Group, Stack } from "@mantine/core";
import React from "react";
import CalendarComp from "../components/Calendar/CalendarComp";
import { HeadFootLayout } from "../components/Layout/Layout";
import Playlist from "../components/Playlist/Playlist";
import Pomodoro from "../components/Pomodoro/Pomodoro";
import Todo from "../components/Todo/Todo";
import Recommender from "../components/Recommender/Recommender";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <HeadFootLayout>
      <Stack spacing="xl">
        <Welcome />
        <Group align="flex-start" grow>
          <Pomodoro />
          <Todo />
        </Group>
        <Recommender />
        <Playlist />
        <CalendarComp />
      </Stack>
    </HeadFootLayout>
  );
};

export default Home;
