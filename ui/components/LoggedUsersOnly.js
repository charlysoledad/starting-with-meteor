import React from 'react';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from './Loading';
import { RoutePaths } from '../RoutePaths';

export const LoggedUsersOnly = ({ children }) => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const location = useLocation();

  if (isLoadingLoggedUser) {
    return <Loading />;
  }

  if (!loggedUser) {
    return (<Navigate to={RoutePaths.ACCESS} state={{ from: location }} replace />);
  }

  return children;
};
