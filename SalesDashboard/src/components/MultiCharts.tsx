'use client';

import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend, Filler);

const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200, 1900, 3000, 5000, 4200],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(75,192,192,1)',
      pointRadius: 5,
    },
  ],
};

const pieData = {
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      label: 'Sales',
      data: [300, 500, 200],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384cc', '#36A2EBcc', '#FFCE56cc'],
    },
  ],
};

export default function MultiCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4 text-center text-lg">Revenue Over Months (Line Chart)</h3>
        <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4 text-center text-lg">Sales Breakdown (Pie Chart)</h3>
        <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
      </div>
    </div>
  );
}
