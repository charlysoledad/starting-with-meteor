import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import "../imports/api/collections";
import "../imports/api/publications";
import "../imports/api/methods";
import { WalletsCollection } from '../imports/api/wallet/WalletsCollection';
import '../infra/CustomError'

const walletSchema = new SimpleSchema({
  balance: Number,
  currency: String,
  createdAt: Date,
})

Meteor.startup(() => {
  if (!WalletsCollection.find().count()) {
    WalletsCollection.insert({
      createdAt: new Date,
      currency: 'USD'
    })
  }
});
