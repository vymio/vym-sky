import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

const Presenations = new Mongo.Collection('presentations');

let schema = new SimpleSchema({
  repoId: {
    type: String
  },
  title: {
    type: String
  }
});

Presenations.attachSchema(schema);

export default Presenations;
