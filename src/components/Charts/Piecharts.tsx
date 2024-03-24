import React, { useEffect, useRef, useState } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

interface PieChartProps {
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartInstance, setChartInstance] = useState<Chart<'pie'> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChartRef = chartRef.current.getContext('2d');
      if (myChartRef) {
        if (chartInstance) {
          chartInstance.destroy(); // Destroy existing chart instance
        }
        const chartConfig: ChartConfiguration<'pie'> = {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        };
        const newChartInstance = new Chart(myChartRef, chartConfig);
        setChartInstance(newChartInstance);
      }
    }

    return () => {
      // Cleanup function to destroy the chart instance when the component unmounts
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
