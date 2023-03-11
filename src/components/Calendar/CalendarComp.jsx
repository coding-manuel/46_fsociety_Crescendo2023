import React, { useState } from "react"
import dayjs from "dayjs"
import { Calendar } from "@mantine/dates"
import { ActionIcon, Group, Stack, TextInput, Title } from "@mantine/core"
import { Plus } from "phosphor-react"
import useEventStore from "../../store/eventStore"

const CalendarComp = () => {
  const [selected, setSelected] = useState([dayjs()])
  const [eventName, setEventName] = useState("")
  const addNewEvent = useEventStore((state) => state.addNewEvent)

  const handleSelect = (date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, "date"))
    setSelected([date])
  }

  return (
    <Group align="flex-start">
      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, "date")),
          onClick: () => handleSelect(date),
        })}
      />
      <Stack sx={{ flexGrow: 2 }} h={"100%"}>
        <Title order={6}>Events</Title>
        <TextInput
          variant="unstyled"
          placeholder="Enter event here..."
          value={eventName}
          onChange={(event) => setEventName(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              variant="light"
              aria-label="Add task"
              onClick={() => addNewEvent(eventName, selected)}
            >
              <Plus size={16} />
            </ActionIcon>
          }
        />
      </Stack>
    </Group>
  )
}

export default CalendarComp
