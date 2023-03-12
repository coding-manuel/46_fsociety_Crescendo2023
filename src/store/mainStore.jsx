import { showNotification } from "@mantine/notifications"

import { supabase } from "../utils/supabaseClient"
import { notificationStyles } from "../globalStyles"
import produce from "immer"
import create from "zustand"
import { devtools, persist } from "zustand/middleware"

const useMainStore = create(
  persist(
    devtools((set, get) => ({
      userId: null,
      userDetails: null,
      subjectList: [],

      /* AUTH FUNCTION */
      useAuth() {
        const { data, error } = supabase.auth.getSession()
        set(() => ({
          userId: data,
        }))
        return data
      },

      async handleLogOut() {
        let { error } = await supabase.auth.signOut()
        set(() => ({
          userId: null,
        }))
      },

      async setUserData(session) {
        if (session === null) {
          showNotification({
            title: "Session Expired",
            message: "Cannot find your session",
            styles: notificationStyles,
          })
          set(() => ({
            userId: null,
          }))
          return
        }

        const userId = session.user.id

        //get user data
        const { data: userDetails } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)

        //set user details
        set((state) =>
          produce(state, (draftState) => {
            draftState.userDetails = userDetails[0]
            draftState.userId = userId
          })
        )
      },

      async refreshUserData() {
        supabase.auth.getSession().then(({ data: { session } }) => {
          get().setUserData(session)
        })
      },

      addSubject: (name) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.subjectList = [
              ...state.subjectList,
              { value: name, label: name, time: 0 },
            ]
          })
        )
      },

      addTimeToSubject: (time, subject) => {
        get().subjectList.map((el, index) => {
          if (el.value === subject)
            set((state) =>
              produce(state, (draftState) => {
                draftState.subjectList[index].time =
                  state.subjectList[index].time + time
              })
            )
        })
      },

      handleNewSubjectList: (newValue) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.subjectList = newValue
          })
        )
      },

      removeSubject: (value) => {
        set((state) =>
          produce(state, (draftState) => {
            draftState.subjectList = [...state.subjectList, value]
          })
        )
      },
    })),
    {
      name: "app-storage", // name of the item in the storage (must be unique)
    }
  )
)

export default useMainStore
