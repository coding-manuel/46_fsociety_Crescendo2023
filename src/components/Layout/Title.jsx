import { Title as MantineTitle, Flex, Divider } from "@mantine/core"

const Title = ({ icon, text, children }) => {
  return (
    <>
      <Flex pt={8} align="center" gap={0} justify="space-between">
        <MantineTitle order={5}>{text}</MantineTitle>
        <div>{children}</div>
      </Flex>
      <Divider />
    </>
  )
}

export default Title
