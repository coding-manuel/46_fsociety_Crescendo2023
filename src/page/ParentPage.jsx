import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { supabase } from "../utils/supabaseClient"
import {
  Avatar,
  Stack,
  Group,
  Box,
  TextInput,
  Badge,
  CopyButton,
  Button,
  Title,
  Table,
} from "@mantine/core"
import { HeadFootLayout } from "../components/Layout/Layout"
import Graph from "../components/Graphs/Graph"

const ParentPage = () => {
  const { userId } = useParams()
  const [userIdState, setUserId] = useState(null)
  useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    let x = await supabase.from("profiles").select("*").eq("id", userId)
    setUserId(x.data[0])
  }

  const avatar = (
    <Avatar alt="Avatar for badge" size={24} mr={5} src="./avatar.png" />
  )

  const elements = [
    { Name: "Web Development", Marks: 3 },
    { Name: "General Knowledge", Marks: userIdState?.quiz_scores[0] },
  ]

  const rows = elements.map((element) => (
    <tr>
      <td>{element.Name}</td>
      <td>{element.Marks}</td>
    </tr>
  ))

  return (
    <HeadFootLayout>
      <Stack>
        <h1>My Profile</h1>
        <Group align="flex-start">
          <Avatar
            radius="xl"
            size="xl"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
          <h1>{userIdState?.full_name}</h1>
        </Group>
        <br />
        <Group align="flex-start" grow>
          <Badge pl={0} size="lg" color="teal" radius="xl" leftSection={avatar}>
            10 Hrs Of Study
          </Badge>
          <Badge pl={0} size="lg" color="teal" radius="xl" leftSection={avatar}>
            Completed 10 Pomodoros
          </Badge>
          <Badge pl={0} size="lg" color="teal" radius="xl" leftSection={avatar}>
            Web Mastery
          </Badge>
          <Badge pl={0} size="lg" color="teal" radius="xl" leftSection={avatar}>
            Listen to Music
          </Badge>
        </Group>
        <Stack>
          <Title order={5}>Quiz Results</Title>
          <Table>
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Stack>
        <Graph />
      </Stack>
    </HeadFootLayout>
  )
}

export default ParentPage
