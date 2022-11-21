import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <h3 className="px-3 py-2 text-lg font-medium">Page not Found</h3>
      <button
        className="focus:outline-none bg-slate-300 hover:bg-slate-400
        focus:ring-slate-400 inline-flex justify-center rounded-md
        border border-transparent py-2 px-4 text-sm font-medium
        text-black shadow-sm focus:ring-2 focus:ring-offset-2"
        onClick={() => navigate(RoutePaths.HOME)}
      >
        Go Home
      </button>
    </div>
  );
};
