import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { RoutePaths } from '../ui/RoutePaths';
import { WalletsCollection } from '../api/wallet/WalletsCollection';

Accounts.emailTemplates.resetPassword.html = (user, url) =>
  `Hello ${user}, <br /> <br /> Reset your password with this link: 
  <a href="${url}" target="_blank">Reset link</a> `;

Accounts.urls.resetPassword = (token) =>
  Meteor.absoluteUrl(`${RoutePaths.RESET_PASSWORD.substring(1)}/${token}`);

Accounts.onCreateUser((options, user) => {
  const customizedUser = { ...user };

  WalletsCollection.insert({
    userId: user._id,
    createdAt: new Date(),
  });

  customizedUser.email = user.emails[0].address;

  return customizedUser;
});

Accounts.setDefaultPublishFields({
  ...Accounts._defaultPublishFields.projection,
  email: 1,
});
