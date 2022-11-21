import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AlertProvider, Alert } from 'meteor/quave:alert-react-tailwind';
import { Header } from './Header';
import { Router } from './Router';

export const App = () => (
  <BrowserRouter>
    <AlertProvider>
      <Header />
      <Alert />
      <div>
        <div className="mx-auto max-w-4xl">
          <Router />
        </div>
      </div>
    </AlertProvider>
  </BrowserRouter>
);
