import type { SalesPoint } from '../types';

type Filters = {
  start: string;
  end: string;
  granularity: 'daily' | 'monthly' | 'yearly';
};

/**
 * Simulated fetch — returns mock data, but performs validation and rejects for invalid ranges.
 * Replace with real fetch to /api/sales or an external service.
 */
export async function fetchSales(filters: Filters): Promise<SalesPoint[]> {
  // basic validation
  if (filters.start && filters.end && filters.start > filters.end) {
    return Promise.reject(new Error('Invalid date range: start is after end'));
  }

  // simulate network latency
  await new Promise((res) => setTimeout(res, 600 + Math.random() * 400));

  // generate deterministic mock data based on granularity and date range
  const points: SalesPoint[] = [];
  const now = new Date();
  const days = filters.granularity === 'daily' ? 30 : filters.granularity === 'monthly' ? 12 : 5;

  for (let i = days - 1; i >= 0; i--) {
    const dt = new Date(now);
    if (filters.granularity === 'daily') dt.setDate(now.getDate() - i);
    if (filters.granularity === 'monthly') dt.setMonth(now.getMonth() - i);
    if (filters.granularity === 'yearly') dt.setFullYear(now.getFullYear() - i);

    const label = dt.toLocaleDateString(undefined, filters.granularity === 'daily' ? { month: 'short', day: 'numeric' } : filters.granularity === 'monthly' ? { month: 'short', year: 'numeric' } : { year: 'numeric' });

    const base = 50000 + Math.round(Math.sin(i / 3) * 15000) + Math.round(Math.random() * 12000);
    points.push({ label, value: Math.max(0, base) });
  }

  // simple filter by start/end not implemented for mock
  return points;
}
