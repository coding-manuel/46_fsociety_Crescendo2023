import { Group, Stack } from "@mantine/core"
import React from "react"
import CalendarComp from "../components/Calendar/CalendarComp"
import { HeadFootLayout } from "../components/Layout/Layout"
import Playlist from "../components/Playlist/Playlist"
import Pomodoro from "../components/Pomodoro/Pomodoro"
import Todo from "../components/Todo/Todo"

const Home = () => {
  return (
    <HeadFootLayout>
      <Stack>
        <Group align="flex-start" grow>
          <Pomodoro />
          <Todo />
        </Group>
        <Playlist />
        <CalendarComp />
      </Stack>
    </HeadFootLayout>
  )
}

export default Home
