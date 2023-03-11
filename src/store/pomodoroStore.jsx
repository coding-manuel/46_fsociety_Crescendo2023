import produce from "immer"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

const usePomodoroStore = create(
  persist(
    devtools((set, get) => ({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 10,
      pomodoroToday: 0,

      saveNewConfiguration: (newValues) => {
        console.log(newValues)
        set((state) =>
          produce(state, (draftState) => {
            draftState.pomodoro = newValues.pomodoro
            draftState.shortBreak = newValues.shortBreak
            draftState.longBreak = newValues.longBreak
          })
        )
      },

      setPomodoroComplete: () => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.pomodoroToday = state.pomodoroToday + 1
          })
        )
      },

      resetPomodoroComplete: () => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.pomodoroToday = state.pomodoroToday + 1
          })
        )
      },
    })),
    {
      name: "pomodoro-storage", // name of the item in the storage (must be unique)
    }
  )
)

export default usePomodoroStore
