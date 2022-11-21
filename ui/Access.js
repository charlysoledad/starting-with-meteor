import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from './RoutePaths';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from './components/ErrorAlert';

export const Access = () => {
  const navigate = useNavigate();

  const [isSingUp, setIsSignUp] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const singUp = (e) => {
    e.preventDefault();
    Accounts.createUser({ email, password }, (errorResponse) => {
      if (errorResponse) {
        setError(errorResponse.reason);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  const singIn = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (errorResponse) => {
      if (errorResponse) {
        setError(errorResponse.reason);
        return;
      }
      navigate(RoutePaths.HOME);
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="py-2 text-lg font-medium">
        {isSingUp ? 'Sign Up' : 'Sign In'}
      </h3>
      {error && <ErrorAlert message={error} />}
      <form className="mt-6 w-1/3">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:outline-none mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:outline-none mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex justify-around py-3">
          <button
            className="focus:outline-none bg-slate-50 hover:text-slate-600 text-slate-400 hover:bg-slate-100 focus:ring-slate-50 inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:ring-2 focus:ring-offset-2"
            onClick={() => navigate(RoutePaths.HOME)}
          >
            Back to Home
          </button>
          {isSingUp && (
            <button
              className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              onClick={singUp}
              type="submit"
            >
              Sign Up
            </button>
          )}
          {!isSingUp && (
            <button
              className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              onClick={singIn}
              type="submit"
            >
              Sign In
            </button>
          )}
        </div>
        <div className="text-center">
          <a
            className="cursor-pointer text-sm hover:text-blue-500"
            onClick={() => setIsSignUp(!isSingUp)}
          >
            {isSingUp
              ? 'If you already have an account, sign in!'
              : 'Create an account!'}
          </a>
        </div>
        <div className="text-center">
          <a
            className="cursor-pointer text-sm hover:text-blue-500"
            onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};
