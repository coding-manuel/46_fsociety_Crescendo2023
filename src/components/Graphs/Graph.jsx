import { Group, Stack } from "@mantine/core";
import React from "react";
import Plot from "react-plotly.js";

class Graph extends React.Component {
  render() {
    var bardata = [
      {
        x: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        y: [4, 5, 6, 1, 4, 7, 2],
        type: "bar",
      },
    ];
    var piedata = [
      {
        values: [12, 5, 8, 4],
        labels: ["Web Development", "Blockchain", "Research", "Business"],
        type: "pie",
      },
    ];

    return (
      <Stack spacing="xl">
        <Group align="flex-start" grow>
          <Plot
            data={bardata}
            layout={{
              width: 400,
              height: 400,
              title: "Performance",
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: {
                color: '#fff'
              }
            }}
          />
          <Plot
            data={piedata}
            layout={{
              width: 400,
              height: 400,
              title: "Time Spent On Subjects",
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              font: {
                color: '#fff'
              }
            }}
          />
        </Group>
        <br />
      </Stack>
    );
  }
}

export default Graph;
