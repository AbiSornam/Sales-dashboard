'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type Filters = {
  start: string; // ISO date yyyy-mm-dd or empty
  end: string;   // ISO date or empty
  granularity: 'daily' | 'monthly' | 'yearly';
};

export default function SalesFilter({
  initialFilters,
  onChange,
  onReset
}: {
  initialFilters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
}) {
  const [local, setLocal] = useState<Filters>(initialFilters);
  const [error, setError] = useState<string | null>(null);
  const applyRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // keep local in sync if parent resets filters externally
    setLocal(initialFilters);
  }, [initialFilters]);

  function validate(f: Filters) {
    setError(null);
    if (f.start && f.end && f.start > f.end) {
      setError('Start date must be before end date.');
      return false;
    }
    return true;
  }

  function handleApply() {
    if (!validate(local)) return;
    onChange(local);
    // move focus to apply confirmation for screen readers
    applyRef.current?.focus();
  }

  function handleReset() {
    onReset();
    // also update local state to match reset
    const empties: Filters = { start: '', end: '', granularity: 'daily' };
    setLocal(empties);
    setError(null);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleApply();
      }}
      aria-label="Sales filters"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="startDate">Start date</label>
        <input
          id="startDate"
          aria-describedby="startHelp"
          value={local.start}
          onChange={(e) => setLocal({ ...local, start: e.target.value })}
          type="date"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-amber-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="endDate">End date</label>
        <input
          id="endDate"
          aria-describedby="endHelp"
          value={local.end}
          onChange={(e) => setLocal({ ...local, end: e.target.value })}
          type="date"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-rose-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="granularity">Granularity</label>
        <select
          id="granularity"
          value={local.granularity}
          onChange={(e) => setLocal({ ...local, granularity: e.target.value as Filters['granularity'] })}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-sky-300"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="sm:col-span-3 flex gap-2 mt-2">
        <button
          type="submit"
          ref={applyRef}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-md shadow hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          Apply filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Reset
        </button>

        {error && <div role="alert" className="ml-4 text-sm text-rose-600">{error}</div>}
      </div>
    </form>
  );
}
