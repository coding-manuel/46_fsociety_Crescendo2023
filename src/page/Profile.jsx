import React from "react";
import { Avatar, Stack, Group, Box, TextInput } from "@mantine/core";
import { HeadFootLayout } from "../components/Layout/Layout";
import useMainStore from "../store/mainStore";

const Profile = () => {
  const userDetails = useMainStore((state) => state.userDetails);

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
      </Stack>
    </HeadFootLayout>
  );
};

export default Profile;
