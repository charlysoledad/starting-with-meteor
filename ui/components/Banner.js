import React from 'react';

import { MegaphoneIcon } from '@heroicons/react/24/outline';

export const Banner = ({ message }) => (
  <div className="sm bg-indigo-300">
    <div className="mx-auto max-w-4xl py-1">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex w-0 flex-1 items-center">
          <span className="flex rounded-lg bg-indigo-400 p-2">
            <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p className="ml-3 truncate font-medium text-white">
            <span className="md:hidden"> {message}</span>
            <span className="hidden md:inline">{message}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);
