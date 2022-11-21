import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createRoot } from 'react-dom/client';
import { App } from '../ui/App';
import '../api/methods';

Meteor.startup(() => {
  const root = createRoot(document.getElementById('react-target'));
  root.render(<App />);
});
