'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import type { SalesPoint } from '../types';

export default function SalesChart({ data }: { data: SalesPoint[] }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-slate-500">No data for selected range.</div>;
  }

  return (
    <div aria-label="Sales chart" role="img">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Sales Over Time</h3>
        <div className="text-sm text-slate-500">Interactive · hover for details</div>
      </div>

      <div style={{ width: '100%', height: 360 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1}/>
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} />
            <Area type="monotone" dataKey="value" stroke="#7c3aed" fill="url(#colorSales)" fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
