import { useState, useEffect, useRef } from "react"

const SCREEN_ON_TIME_KEY = "screenOnTime"
const SCREEN_OFF_TIME_KEY = "screenOffTime"

function Test() {
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
    <div>
      <p>Screen on time: {timeOnWebsite} seconds</p>
      <p>Screen on time: {timeOffWebsite} seconds</p>
    </div>
  )
}

export default Test
