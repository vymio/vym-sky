import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import _ from 'lodash';

const SlideDecks = new Mongo.Collection('slideDecks');

let schema = new SimpleSchema({
  // Used in the url for sharing
  uid: {
    type: String,
    denyUpdate: true
  },
  prNumber: {
    type: Number
  },
  repoId: {
    type: String
  },
  repo: {
    type: Object
  },
  'repo.name': {
    type: String
  },
  'repo.ownerName': {
    type: String
  },
  'repo.meta': {
    type: Object
  },
  'repo.meta.id': {
    type: Number
  },
  // _id of the user that owns the slide deck
  ownerId: {
    type: String
  },
  // _id of all users, including the owner, who can access the slide deck
  collaboratorIds: {
    type: [ String ]
  },
  connectedUsers: {
    type: [ Object ],
    optional: true,
    defaultValue: []
  },
  'connectedUsers.$._id': {
    type: String
  },
  'connectedUsers.$.displayName': {
    type: String,
    optional: true
  },
  'connectedUsers.$.githubHandle': {
    type: String,
    optional: true
  },
  title: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  currentSlide: {
    type: Number,
    optional: true,
    defaultValue: 1
  },
  slides: {
    type: [ Object ],
    optional: true,
    defaultValue: []
  },
  'slides.$.uid': {
    type: String
  },
  'slides.$.number': {
    type: Number
  },
  'slides.$.type': {
    type: String,
    optional: true,
  },
  /** How the slide should be rendered
   *
   * Possible keys and values:
   * - display: 'horizontal', 'vertical'
   */
  'slides.$.options': {
    type: Object,
    blackbox: true,
    optional: true,
    defaultValue: {}
  },
  // hex code for the background color
  'slides.$.backgroundColor': {
    type: String,
    optional: true,
    defaultValue: '#FFFFFF'
  },
  // the content of the slide
  'slides.$.sections': {
    type: [ Object ],
    blackbox: true,
    optional: true,
  },
  // position of the section
  'slides.$.sections.$.position': {
    type: Number
  },
  // Slide decks do not get deleted but only disabled. This is to avoid cheating
  // the montly quota for lite plans
  disabled: {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (!this.isInsert) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }
});

SlideDecks.attachSchema(schema);

SlideDecks.helpers({
  getCurrentSlide() {
    let currentSlideNumber = this.currentSlide;

    return this.slides[currentSlideNumber - 1];
  },
  getSlideByNumber(number) {
    return _.find(this.slides, {number});
  },
  getLastSlide() {
    let slides = this.slides;

    return slides[slides.length - 1];
  },
  getFullRepoName() {
    return `${this.repo.ownerName}/${this.repo.name}`;
  }
});

export default SlideDecks;
