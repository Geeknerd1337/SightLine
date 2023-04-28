import React from "react";
import { ResponsiveLine } from '@nivo/line';

  const data = [
    {
      id: 'Line 1',
      data: [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 15 },
        { x: 'Mar', y: 12 },
        { x: 'Apr', y: 8 },
        { x: 'May', y: 13 },
      ],
    },
    {
      id: 'Line 2',
      data: [
        { x: 'Jan', y: 5 },
        { x: 'Feb', y: 9 },
        { x: 'Mar', y: 14 },
        { x: 'Apr', y: 6 },
        { x: 'May', y: 11 },
      ],
    },
    {
      id: 'Line 3',
      data: [
        { x: 'Jan', y: 7 },
        { x: 'Feb', y: 11 },
        { x: 'Mar', y: 8 },
        { x: 'Apr', y: 14 },
        { x: 'May', y: 9 },
      ],
    },
  ];

  const theme = {
    axis: {
      legend: {
        text: {
          fontSize: 20,
          fontWeight: 'bold',
          fill: '#333'
        }
      },
      ticks: {
        line: {
          stroke: '#555',
        },
        text: {
          fill: '#333',
          fontSize: 12,
        }
      },
      domain: {
        line: {
          stroke: '#555',
        }
      }
    }
  }

export default function LineChart() {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      theme={theme}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "X Axis",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Y Axis",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      curve="cardinal"
      lineWidth={2}
      enableGridX={true}
      colors={{ scheme: "category10" }}
      pointSize={10}
      pointColor={{ from: "color" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.7 ] ] }}
      enablePointLabel={true}
      pointLabel="y"
      pointLabelYOffset={-12}
      animate={true}
      isInteractive={true}
      useMesh={true}
      enableCrosshair={false}
      // legends={[
      //   {
      //     anchor: 'bottom-right',
      //           direction: 'column',
      //           justify: false,
      //           translateX: 100,
      //           translateY: 0,
      //           itemsSpacing: 0,
      //           itemDirection: 'left-to-right',
      //           itemWidth: 80,
      //           itemHeight: 20,
      //           itemOpacity: 0.75,
      //           symbolSize: 12,
      //           symbolShape: 'circle',
      //           symbolBorderColor: 'rgba(0, 0, 0, .5)',
      //             effects: [
      //               {
      //                   on: 'hover',
      //                   style: {
      //                       itemBackground: 'rgba(0, 0, 0, .03)',
      //                       itemOpacity: 1
      //                   }
      //               }
      //           ]
      //   }
      // ]}
    />
  );
   
}