import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const PullRequests = new Mongo.Collection('pullRequests');

let schema = new SimpleSchema({
  repoId: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  head: {
    type: Object,
    blackbox: true
  },
  base: {
    type: Object,
    blackbox: true
  },
  state: {
    type: String,
    defaultValue: 'open',
    allowedValues: [
      'open',
      'merged',
      'closed'
    ],
    optional: true
  },
  // when the pr was opened
  openedAt: {
    type: Date,
    optional: true,
    denyUpdate: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  }
});

PullRequests.attachSchema(schema);

export default PullRequests;
