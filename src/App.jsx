import React, { useEffect, useState, useRef } from "react"
import {
  ColorSchemeProvider,
  GlobalStyles,
  MantineProvider,
} from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { useLocalStorage } from "@mantine/hooks"
import { Route, Routes } from "react-router-dom"

import { supabase } from "./utils/supabaseClient"
import Home from "./page/Home"
import Profile from "./page/Profile"
import Quiz from "./page/Quiz"
import { SignIn } from "./page/SignIn"
import { SignUp } from "./page/SignUp"
import ParentPage from "./page/ParentPage"
import useMainStore from "./store/mainStore"
import Test from "./page/Test"

const SCREEN_ON_TIME_KEY = "screenOnTime"
const SCREEN_OFF_TIME_KEY = "screenOffTime"

const App = () => {
  const userId = useMainStore((state) => state.userId)
  const setUserData = useMainStore((state) => state.setUserData)

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  const theme = {
    components: GlobalStyles,
    colorScheme: colorScheme,
    primaryColor: "yellow",
    primaryShade: 5,

    black: "#323232",
    white: "#ffffff",

    colors: {
      red: [
        "#ffe3e3",
        "#feb6b6",
        "#f78888",
        "#f25959",
        "#d41212",
        "#ed2b2b",
        "#a60b0d",
        "#770608",
        "#4a0203",
        "#200000",
      ],
      yellow: [
        "#fff3dc",
        "#fbdfb3",
        "#f6ca86",
        "#f1b559",
        "#eea02b",
        "#e1921c",
        "#a5690b",
        "#774b06",
        "#482c00",
        "#1d0e00",
      ],
      // gray: [
      //   "#F2F2F2",
      //   "#DBDBDB",
      //   "#C4C4C4",
      //   "#ADADAD",
      //   "#969696",
      //   "#808080",
      //   "#666666",
      //   "#4D4D4D",
      //   "#333333",
      //   "#1A1A1A",
      // ],
      gray: [
        "#f2f2f2",
        "#d9d9d9",
        "#bfbfbf",
        "#a6a6a6",
        "#8c8c8c",
        "#737373",
        "#595959",
        "#404040",
        "#262626",
        "#0d0d0d",
      ],
    },

    fontFamily: "Sora, sans-serif",
    lineHeight: 1.3,

    headings: {
      fontFamily: "Sora, sans-serif",
      fontWeight: 500,
      sizes: {
        h1: { fontSize: "5.653rem" },
        h2: { fontSize: "3.998rem" },
        h3: { fontSize: "2.827rem" },
        h4: { fontSize: "2.499rem" },
        h5: { fontSize: "1.614rem" },
        h6: { fontSize: "1.107rem" },
      },
    },
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (userId) setUserData(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setUserData(session)
    })
  }, [])

  const [timeOnWebsite, setTimeOnWebsite] = useState(
    Number(localStorage.getItem(SCREEN_ON_TIME_KEY)) || 0
  )

  const [timeOffWebsite, setTimeOffWebsite] = useState(
    Number(localStorage.getItem(SCREEN_OFF_TIME_KEY)) || 0
  )

  const currentUrl = useRef(window.location.href)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        !document.hidden &&
        currentUrl.current.includes("http://127.0.0.1:5173/")
      ) {
        setTimeOnWebsite((prevTime) => prevTime + 1)
      } else {
        setTimeOffWebsite((prevTime) => prevTime + 1)
      }
    }, 1000)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        localStorage.setItem(SCREEN_ON_TIME_KEY, timeOnWebsite.toString())
        localStorage.setItem(SCREEN_OFF_TIME_KEY, timeOffWebsite.toString())
      }
    }

    const handleUrlChange = () => {
      currentUrl.current = window.location.href
    }

    window.addEventListener("popstate", handleUrlChange)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("popstate", handleUrlChange)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [currentUrl, timeOnWebsite])
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Notifications
            position="top-center"
            color="orange"
            autoClose={60000}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/test" element={<Test />} />
            <Route path="/parent/:userId" element={<ParentPage />} />
            <Route
              path="/quiz/557cb372-e9a7-41bb-b549-9d087ecb7c3f"
              element={<Quiz />}
            />
          </Routes>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
