'use client';

import React, { useEffect, useState } from 'react';
import SalesChart from '../components/sales-chart';
import SalesFilter from '../components/sales-filter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBox from '../components/ErrorBox';
import MultiCharts from '../components/MultiCharts'; // Import your new chart component
import { fetchSales } from '../lib/api';
import type { SalesPoint } from '../types';

export default function DashboardPage() {
  const [data, setData] = useState<SalesPoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    start: string;
    end: string;
    granularity: 'daily' | 'monthly' | 'yearly';
  }>({
    start: '',
    end: '',
    granularity: 'daily',
  });

  const [lastUpdated, setLastUpdated] = useState('');

  // Set timestamp after hydration to avoid SSR hydration mismatch
  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, []);

  // Fetch sales data when filters change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchSales(filters)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err) || 'Failed to load sales');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters]);

  return (
    <section aria-labelledby="dashboard-heading" className="space-y-6">
      {/* Header with Last Updated */}
      <div className="flex items-center justify-between">
        <h2 id="dashboard-heading" className="text-2xl font-bold">
          Overview
        </h2>
        <div className="text-sm text-slate-600">Last updated: {lastUpdated}</div>
      </div>

      {/* Filters */}
      <div id="filters" className="bg-white p-4 rounded-lg shadow-sm">
        <SalesFilter
          initialFilters={filters}
          onChange={(f) => setFilters(f)}
          onReset={() => setFilters({ start: '', end: '', granularity: 'daily' })}
        />
      </div>

      {/* Charts and Insights */}
      <div id="charts" className="grid lg:grid-cols-3 gap-6">
        {/* Main charts column spans 2 */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
          {loading && <LoadingSpinner label="Loading chart data" />}
          {error && <ErrorBox message={error} onRetry={() => setFilters({ ...filters })} />}
          {!loading && !error && data && (
            <>
              <SalesChart data={data} />
              <div className="mt-8">
                <MultiCharts />
              </div>
            </>
          )}
        </div>

        {/* Insights sidebar */}
        <aside className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold">Insights</h3>
          <p className="text-sm text-slate-600 mt-2">
            Quick take: the dashboard uses mock data; integrate a real API by editing{' '}
            <code>src/lib/api.ts</code>.
          </p>
        </aside>
      </div>
    </section>
  );
}
