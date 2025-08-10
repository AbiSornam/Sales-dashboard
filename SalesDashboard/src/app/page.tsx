'use client';

import { useState } from 'react';
import SalesChart from '@/src/components/sales-chart';
import ChartSwitcher from '@/src/components/chart-switcher';

// Define the data structure
interface SalesData {
  year: string;
  sales: number;
}

// Mock sales data for 2022, 2023, and 2024
const mockSalesData: SalesData[] = [
  // 2024
  { year: 'Jan 2024', sales: 12000 },
  { year: 'Feb 2024', sales: 13500 },
  { year: 'Mar 2024', sales: 12800 },
  { year: 'Apr 2024', sales: 14200 },
  { year: 'May 2024', sales: 15000 },
  { year: 'Jun 2024', sales: 15500 },
  { year: 'Jul 2024', sales: 14800 },
  { year: 'Aug 2024', sales: 16000 },
  { year: 'Sep 2024', sales: 14500 },
  { year: 'Oct 2024', sales: 17000 },
  { year: 'Nov 2024', sales: 17500 },
  { year: 'Dec 2024', sales: 18000 },

  // 2023
  { year: 'Jan 2023', sales: 10000 },
  { year: 'Feb 2023', sales: 11500 },
  { year: 'Mar 2023', sales: 10800 },
  { year: 'Apr 2023', sales: 11200 },
  { year: 'May 2023', sales: 12000 },
  { year: 'Jun 2023', sales: 12500 },
  { year: 'Jul 2023', sales: 11800 },
  { year: 'Aug 2023', sales: 13000 },
  { year: 'Sep 2023', sales: 12500 },
  { year: 'Oct 2023', sales: 14000 },
  { year: 'Nov 2023', sales: 14500 },
  { year: 'Dec 2023', sales: 15000 },

  // 2022
  { year: 'Jan 2022', sales: 8000 },
  { year: 'Feb 2022', sales: 9500 },
  { year: 'Mar 2022', sales: 8800 },
  { year: 'Apr 2022', sales: 9200 },
  { year: 'May 2022', sales: 10000 },
  { year: 'Jun 2022', sales: 10500 },
  { year: 'Jul 2022', sales: 9800 },
  { year: 'Aug 2022', sales: 11000 },
  { year: 'Sep 2022', sales: 10200 },
  { year: 'Oct 2022', sales: 11800 },
  { year: 'Nov 2022', sales: 12200 },
  { year: 'Dec 2022', sales: 12500 },
];

// Aggregate yearly sales for pie chart
const yearlySalesData: SalesData[] = [
  {
    year: '2022',
    sales: mockSalesData
      .filter(d => d.year.includes('2022'))
      .reduce((sum, d) => sum + d.sales, 0),
  },
  {
    year: '2023',
    sales: mockSalesData
      .filter(d => d.year.includes('2023'))
      .reduce((sum, d) => sum + d.sales, 0),
  },
  {
    year: '2024',
    sales: mockSalesData
      .filter(d => d.year.includes('2024'))
      .reduce((sum, d) => sum + d.sales, 0),
  },
];

const DashboardPage: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  return (
    <>
      <head>
        <title>My Awesome Sales Dashboard</title>
      </head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10">
        <div className="container mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700">
          {/* Dashboard Header */}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 text-center mb-8">
            Sales Dashboard
          </h1>

          {/* Chart Switcher */}
          <div className="flex justify-center mb-10">
            <ChartSwitcher chartType={chartType} setChartType={setChartType} />
          </div>

          {/* Chart */}
          <div className="w-full h-[450px] bg-gray-900 rounded-xl p-6 shadow-inner">
            <SalesChart
              data={chartType === 'pie' ? yearlySalesData : mockSalesData}
              chartType={chartType}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
