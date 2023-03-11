import produce from "immer"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

const useTodoStore = create(
  persist(
    devtools((set, get) => ({
      tasks: [],

      setNewTask: (newTasks) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.tasks = newTasks
          })
        )
      },

      setTaskStatus: (taskIndex, status) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.tasks[taskIndex].ready = status
          })
        )
      },

      editTask: (taskIndex, newTask) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.tasks[taskIndex].text = newTask
          })
        )
      },

      deleteAllTasks: () => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.tasks = []
          })
        )
      },
    })),
    {
      name: "todo-storage", // name of the item in the storage (must be unique)
    }
  )
)

export default useTodoStore
