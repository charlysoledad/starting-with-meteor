import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from './RoutePaths';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Banner } from './components/Banner';

export const Header = () => {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
  const navigate = useNavigate();

  const ProfileName = () => {
    return <p className="text-sm text-white"> Hello, {loggedUser.email}!</p>;
  };

  return (
    <>
      {Meteor.user() && !Meteor.user().emails[0].verified && (
        <Banner message="Please verify your email" />
      )}

      <header className="bg-indigo-600">
        <nav
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
            <div className="flex w-full justify-between">
              <a onClick={() => navigate(RoutePaths.HOME)}>
                <span className="sr-only">Meteor Wallet</span>
                <img className="h-10 w-auto" src="/images/logo.png" alt="" />
              </a>
              <div className="flex flex-row items-center gap-3">
                {!isLoadingLoggedUser && !loggedUser && (
                  <button
                    onClick={() => {
                      navigate(RoutePaths.ACCESS);
                    }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-700 hover:text-white"
                  >
                    Sign Up
                  </button>
                )}
                {!isLoadingLoggedUser && loggedUser && <ProfileName />}
                {!isLoadingLoggedUser && loggedUser && (
                  <button
                    onClick={() => {
                      Meteor.logout();
                    }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-indigo-700 hover:text-white"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
