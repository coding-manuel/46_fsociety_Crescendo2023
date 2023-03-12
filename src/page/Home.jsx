import { Group, Stack, Button } from "@mantine/core";
import React from "react";
import CalendarComp from "../components/Calendar/CalendarComp";
import { HeadFootLayout } from "../components/Layout/Layout";
import Playlist from "../components/Playlist/Playlist";
import Pomodoro from "../components/Pomodoro/Pomodoro";
import Todo from "../components/Todo/Todo";
import Notes from "../components/Notes/Notes";
import Recommender from "../components/Recommender/Recommender";
import Welcome from "../components/Welcome";
import { Link } from "react-router-dom";

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
        <Button component={Link} to={"/notes"}>
          Notes
        </Button>
      </Stack>
    </HeadFootLayout>
  );
};

export default Home;
