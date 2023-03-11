import produce from "immer"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

const useEventStore = create(
  persist(
    devtools((set, get) => ({
      events: [],
      eventDays: [],

      addNewEvent: (event, date) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.events = [event, date]
          })
        )
      },
    })),
    {
      name: "event-storage", // name of the item in the storage (must be unique)
    }
  )
)

export default useEventStore
