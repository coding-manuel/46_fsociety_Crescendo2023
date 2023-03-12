import React from "react";
import { Avatar, Stack, Group, Box, TextInput, Badge } from "@mantine/core";
import { HeadFootLayout } from "../components/Layout/Layout";
import useMainStore from "../store/mainStore";

const Profile = () => {
  const userDetails = useMainStore((state) => state.userDetails);
  const avatar = (
    <Avatar alt="Avatar for badge" size={24} mr={5} src="./avatar.png" />
  );

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
          <h1>{userDetails.full_name}</h1>
        </Group>
        <br />
        <Box maw={300}>
          <TextInput label="Email" value={userDetails.email} disabled />
        </Box>
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
      </Stack>
    </HeadFootLayout>
  );
};

export default Profile;
