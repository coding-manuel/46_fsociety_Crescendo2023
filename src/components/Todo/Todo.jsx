import { useState, useRef, useEffect } from "react"
import {
  Stack,
  ActionIcon,
  Flex,
  Text,
  TextInput,
  Progress,
  ScrollArea,
  Tooltip,
  Modal,
  Button,
} from "@mantine/core"
import { useForm, isNotEmpty } from "@mantine/form"

import Tasks from "./Tasks"
import Title from "../Layout/Title"
import useTodoStore from "../../store/todoStore"
import { Plus, SortAscending, Trash } from "phosphor-react"

const Todo = () => {
  const tasks = useTodoStore((state) => state.tasks)
  const setNewTask = useTodoStore((state) => state.setNewTask)
  const deleteAllTasks = useTodoStore((state) => state.deleteAllTasks)
  const editTask = useTodoStore((state) => state.editTask)

  const [opened, setOpened] = useState(false)
  const [editedTask, setEditedTask] = useState({})
  const [progress, setProgress] = useState({
    progress: 0,
    percentage: 0,
    total: 0,
  })

  const task = useRef("")

  useEffect(() => {
    const progress = tasks?.filter((task) => task.ready === true)?.length ?? 0
    const percentage = Math.round((progress * 100) / tasks?.length) || 0

    setProgress({
      progress,
      percentage,
      total: tasks?.length,
    })
  }, [tasks])

  const addNewTask = (e) => {
    e && e?.preventDefault()

    if (task?.current?.value === "") return

    const new_tasks = [
      ...tasks,
      {
        text: task?.current?.value,
        ready: false,
      },
    ]

    setNewTask(new_tasks)

    task.current.value = ""
  }

  const deleteTask = (taskIndex) => {
    const temporal_tasks = [...tasks]
    temporal_tasks.splice(taskIndex, 1)

    setNewTask(temporal_tasks)
  }

  const moveTaskOrder = (fromIndex, toIndex) => {
    const temporal_tasks = [...tasks]
    const task = temporal_tasks[fromIndex]

    temporal_tasks?.splice(fromIndex, 1)
    temporal_tasks.splice(toIndex, 0, task)

    setNewTask(temporal_tasks)
  }

  const moveDoneTasksDown = () => {
    const temporal_tasks = [...tasks]
    temporal_tasks?.sort((a, b) => a?.ready - b?.ready)

    setNewTask(temporal_tasks)
  }

  const handleEditTaskClick = (taskIndex) => {
    let temporal_edited_task = tasks[taskIndex]
    setEditedTask({ ...temporal_edited_task, i: taskIndex })
    setOpened(true)
  }

  const handleEditTask = (newValue) => {
    editTask(editedTask?.i, newValue)

    setOpened(false)
  }

  return (
    <>
      <Stack>
        <Title text="To Do">
          <Flex align="center" gap={10}>
            <DeleteTasks onDeleteTasks={deleteAllTasks} />
            <Tooltip label="Move done tasks down">
              <ActionIcon
                variant="light"
                aria-label="Move done tasks down"
                onClick={moveDoneTasksDown}
              >
                <SortAscending size={18} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Title>
        <Stack spacing={5}>
          <Flex justify="space-between" align="center">
            <Text fz={12} c="dimmed" component="p" m={0}>
              Progress
            </Text>
            <Text fz={14} c="dimmed" component="p" m={0}>
              {progress?.percentage}%
            </Text>
          </Flex>
          <Progress
            value={progress?.percentage}
            color="green"
            aria-label="Progress"
          />
          <Text fz={12} c="dimmed" component="p" m={0} align="right">
            {progress?.progress}/{progress?.total} completed
          </Text>
        </Stack>
        <Stack mt={20}>
          <ScrollArea
            sx={(_) => ({
              maxHeight: "25vw",
              "@media (max-width: 680px)": {
                maxHeight: "100%",
              },
            })}
            type="auto"
            offsetScrollbars
          >
            <Tasks
              tasks={tasks}
              onTaskDelete={deleteTask}
              onTaskMove={moveTaskOrder}
              onTaskEdit={handleEditTaskClick}
            />
          </ScrollArea>
        </Stack>
        <form onSubmit={addNewTask}>
          <TextInput
            placeholder="Add new task..."
            ref={task}
            variant="unstyled"
            required
            rightSection={
              <ActionIcon
                variant="light"
                aria-label="Add task"
                onClick={addNewTask}
              >
                <Plus size={16} />
              </ActionIcon>
            }
          />
        </form>
      </Stack>
      <EditTask
        open={opened}
        onClose={() => setOpened(false)}
        task={editedTask}
        onTaskEdit={handleEditTask}
      />
    </>
  )
}

const DeleteTasks = ({ onDeleteTasks }) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Tooltip label="Delete all tasks">
        <ActionIcon
          color="red"
          variant="light"
          aria-label="Delete all tasks"
          onClick={() => setOpened(true)}
        >
          <Trash size={18} />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Delete all tasks"
        centered
      >
        <Text component="p" fz={14}>
          Are you sure you want to delete all tasks?
        </Text>

        <Flex justify="space-between" mt={50}>
          <Button variant="subtle" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDeleteTasks()
              setOpened(false)
            }}
            color="red"
          >
            Delete
          </Button>
        </Flex>
      </Modal>
    </>
  )
}

const EditTask = ({ open, onClose, task, onTaskEdit }) => {
  const form = useForm({
    initialValues: {
      taskInput: task?.text,
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
    validate: {
      taskInput: isNotEmpty("Task cannot be empty"),
    },
  })

  useEffect(() => {
    form?.setValues({ taskInput: task?.text })
  }, [task])

  return (
    <Modal
      opened={open}
      onClose={() => onClose(false)}
      title="Edit task"
      centered
    >
      <form onSubmit={form.onSubmit(() => onTaskEdit(form?.values?.taskInput))}>
        <TextInput
          placeholder="Task"
          label="Task"
          mb={20}
          {...form.getInputProps("taskInput")}
        />

        <Flex justify="space-between" mt={50}>
          <Button variant="subtle" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!form.isValid()}>
            Edit
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default Todo
