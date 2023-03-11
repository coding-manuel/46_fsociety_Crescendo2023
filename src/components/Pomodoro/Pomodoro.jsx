import { useState, useEffect } from "react"
import {
  Stack,
  ActionIcon,
  Flex,
  Text,
  Badge,
  SegmentedControl,
} from "@mantine/core"
import { showNotification, cleanNotifications } from "@mantine/notifications"
import { useHotkeys } from "@mantine/hooks"

import {
  Alarm,
  ArrowCounterClockwise,
  ArrowsClockwise,
  Gear,
  Pause,
  Play,
} from "phosphor-react"
import usePomodoroStore from "../../store/pomodoroStore"
import Title from "../Layout/Title"

import PomodoroSettings from "./PomodoroSettings"

import pomodoroSound from "/assets/sounds/timer-complete.mp3"
import pomodoroTickingSound from "/assets/sounds/ticking.mp3"

const POMODORO_MODES = [
  { label: "Pomodoro", value: "pomodoro" },
  { label: "Short break", value: "short" },
  { label: "Long break", value: "long" },
]

const Pomodoro = ({ name }) => {
  const pomodoro = usePomodoroStore((state) => state.pomodoro)
  const shortBreak = usePomodoroStore((state) => state.shortBreak)
  const longBreak = usePomodoroStore((state) => state.longBreak)
  const pomodoroToday = usePomodoroStore((state) => state.pomodoroToday)
  const setPomodoroComplete = usePomodoroStore(
    (state) => state.setPomodoroComplete
  )
  const saveNewConfiguration = usePomodoroStore(
    (state) => state.saveNewConfiguration
  )
  const resetPomodoroComplete = usePomodoroStore(
    (state) => state.resetPomodoroComplete
  )

  useHotkeys([
    ["mod+P", () => setIsActive(!isActive)],
    ["mod+1", () => setMode("pomodoro")],
    ["mod+2", () => setMode("short")],
    ["mod+3", () => setMode("long")],
  ])

  const [mode, setMode] = useState(POMODORO_MODES[0].value)
  const [secondsLeft, setSecondsLeft] = useState(pomodoro * 60)
  const [isActive, setIsActive] = useState(false)
  const [opened, setOpened] = useState(false)
  const [sound, setSound] = useState(null)
  const [ticking, setTicking] = useState(null)

  useEffect(() => {
    var soundComplete = new Audio(pomodoroSound)
    var tickingSound = new Audio(pomodoroTickingSound)

    setSound(soundComplete)
    setTicking(tickingSound)
  }, [])

  useEffect(() => {
    restartPomodoro()
  }, [mode])

  // useEffect(() => {
  //   if (isActive) {
  //     ticking?.play()
  //     ticking.loop = true
  //   } else {
  //     ticking?.playing && ticking?.pause()
  //   }
  // }, [isActive])

  useEffect(() => {
    if (isActive) {
      cleanNotifications()

      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1)
      }, 1000)

      if (secondsLeft === 0) {
        sound.play()
        clearInterval(interval)
        restartPomodoro()

        let notif_text = POMODORO_MODES.find((elem) => elem?.value === mode)

        showNotification({
          title: `${notif_text?.label} time is over`,
          icon: <Alarm size={20} />,
        })
      }

      if (secondsLeft === 0 && mode == "pomodoro") {
        setPomodoroComplete()
      }

      return () => clearInterval(interval)
    }
  }, [isActive, secondsLeft])

  const formatTime = (seconds) => {
    return `${Math.floor(seconds / 60)}:${
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60)
    }`
  }

  const restartPomodoro = () => {
    setIsActive(false)

    switch (mode) {
      case "short":
        setSecondsLeft(shortBreak * 60)
        break
      case "long":
        setSecondsLeft(longBreak * 60)
        break
      default:
        setSecondsLeft(pomodoro * 60)
    }
  }

  const savePomodoroConfiguration = (newValues) => {
    switch (mode) {
      case "short":
        setSecondsLeft(newValues?.shortBreak * 60)
        break
      case "long":
        setSecondsLeft(newValues?.longBreak * 60)
        break
      default:
        setSecondsLeft(newValues?.pomodoro * 60)
    }
    saveNewConfiguration(newValues)
    setOpened(false)
    setIsActive(false)
  }

  return (
    <>
      <Stack>
        <Title text="Pomodoro">
          <ActionIcon
            variant="light"
            aria-label="Pomodoro settings"
            onClick={() => setOpened(true)}
          >
            <Gear size={18} />
          </ActionIcon>
        </Title>
        <Flex
          w="100%"
          sx={(_) => ({
            "@media (max-width: 768px)": {
              justifyContent: "center",
            },
          })}
        >
          <SegmentedControl
            size="xs"
            value={mode}
            data={POMODORO_MODES}
            onChange={(value) => setMode(value)}
          />
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          sx={(_) => ({
            "@media (max-width: 768px)": {
              justifyContent: "center",
              gap: 20,
            },
          })}
        >
          <Text fz={48} fw={600}>
            {formatTime(secondsLeft)}
          </Text>
          <Flex gap="xs">
            {isActive ? (
              <ActionIcon
                color="red"
                variant="outline"
                onClick={() => setIsActive(false)}
                aria-label="Pause pomodoro"
              >
                <Pause size={18} />
              </ActionIcon>
            ) : (
              <ActionIcon
                color="green"
                variant="light"
                onClick={() => setIsActive(true)}
                aria-label="Play pomodoro"
              >
                <Play size={18} />
              </ActionIcon>
            )}

            <ActionIcon
              variant="light"
              aria-label="Restart pomodoro"
              onClick={restartPomodoro}
            >
              <ArrowsClockwise size={18} />
            </ActionIcon>
          </Flex>
        </Flex>
        <Flex align="center" justify="space-between">
          <Text
            fz={14}
            sx={(_) => ({
              "@media (max-width: 768px)": {
                textAlign: "center",
              },
            })}
          >
            <Badge radius="sm" size="sm" mr={5}>
              {pomodoroToday}
            </Badge>
            completed today
          </Text>
          <ActionIcon
            variant="light"
            aria-label="Restart pomodoros today"
            onClick={resetPomodoroComplete}
          >
            <ArrowCounterClockwise size={18} />
          </ActionIcon>
        </Flex>
      </Stack>

      <PomodoroSettings
        open={opened}
        onClose={() => setOpened(false)}
        onSaveSettings={savePomodoroConfiguration}
      />
    </>
  )
}

export default Pomodoro
