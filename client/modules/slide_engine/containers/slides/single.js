import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import SingleSlide from '/client/modules/slide_engine/components/slides/single/index.jsx';

export const composer = ({context, slide, files, slideDeckId}, onData) => {
  const {Meteor, Collections, Tracker} = context();

  onData(null, {slide, files, slideDeckId});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  setSection: actions.slideDecks.setSection,
  removeSection: actions.slideDecks.removeSection
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SingleSlide);
