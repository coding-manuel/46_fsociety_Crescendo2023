import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "dayjs/locale/ru"
import { DatesProvider } from "@mantine/dates"

import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DatesProvider
      settings={{ locale: "en", firstDayOfWeek: 0, weekendDays: [0] }}
    >
      <App />
    </DatesProvider>
  </BrowserRouter>
)
