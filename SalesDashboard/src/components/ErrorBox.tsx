import React from 'react';

export default function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="border-l-4 border-rose-400 bg-rose-50 p-4 rounded">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-rose-800">Error loading data</h4>
          <p className="text-sm text-rose-700 mt-1">{message}</p>
        </div>
        {onRetry && (
          <button onClick={onRetry} className="ml-2 inline-flex items-center gap-2 px-3 py-1 bg-white border rounded text-sm">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
