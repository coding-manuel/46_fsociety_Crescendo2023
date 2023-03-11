import {
  Stack,
  Flex,
  Modal,
  Button,
  NumberInput,
  TextInput,
  ActionIcon,
  Divider,
  Text,
  Paper,
  Group,
} from "@mantine/core"
import produce from "immer"
import { Plus, Trash } from "phosphor-react"
import { useState } from "react"
import useMainStore from "../store/mainStore"

const SubjectModal = ({ open, onClose, onSaveSettings }) => {
  const subjectList = useMainStore((state) => state.subjectList)
  const addSubject = useMainStore((state) => state.addSubject)
  const handleNewSubjectList = useMainStore(
    (state) => state.handleNewSubjectList
  )
  const [value, setValue] = useState("")
  const [newSubjectList, setNewSubjectList] = useState(subjectList)

  const deleteSubject = (name) => {
    let temp = [...subjectList]
    temp = temp.filter((el) => el.value !== name)

    handleNewSubjectList(temp)
  }

  return (
    <Modal
      opened={open}
      onClose={() => onClose(false)}
      title="Pomodoro settings"
      aria-label="Pomodoro settings"
      centered
    >
      <Stack spacing="xs">
        {subjectList.map((el, index) => (
          <Paper withBorder py={4} px={8}>
            <Group position="apart">
              <Text>{el.value}</Text>
              <ActionIcon onClick={() => deleteSubject(el.value)}>
                <Trash size={16} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
        {subjectList.length == 0 && <Text>No Subjets added as of yet</Text>}
        <Divider />
        <TextInput
          placeholder="Enter Subject name here..."
          variant="unstyled"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          mb={20}
          rightSection={
            <ActionIcon
              disabled={!value.length}
              onClick={() => {
                addSubject(value)
              }}
            >
              <Plus size={18} />
            </ActionIcon>
          }
        />
      </Stack>

      <Flex justify="space-between" mt={50}>
        <Button variant="subtle" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button onClick={onClose}>Save</Button>
      </Flex>
    </Modal>
  )
}

export default SubjectModal
