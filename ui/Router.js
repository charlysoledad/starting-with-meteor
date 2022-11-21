import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './NotFound';
import { RoutePaths } from './RoutePaths';
import { Access } from './Access';
import { ForgotPassword } from './ForgotPassword';
import { ResetPassword } from './ResetPassword';
import { LoggedUsersOnly } from './components/LoggedUsersOnly';
import { AnonymousOnly } from './components/AnonymousOnly';

export const Router = () => (
  <Routes>
    {' '}
    <Route
      path={RoutePaths.HOME}
      element={
        <LoggedUsersOnly>
          <Home />
        </LoggedUsersOnly>
    } />
    <Route
      path={RoutePaths.ACCESS}
      element={
        <AnonymousOnly>
          <Access />
        </AnonymousOnly>
      } />
    <Route
      path={RoutePaths.FORGOT_PASSWORD}
      element={
        <AnonymousOnly>
          <ForgotPassword />
        </AnonymousOnly>
      } />
    <Route
      path={`${RoutePaths.RESET_PASSWORD}/:token`}
      element={
        <AnonymousOnly>
          <ResetPassword />
        </AnonymousOnly>
      } />
    <Route path="*" element={<NotFound />} />{' '}
  </Routes>
);
