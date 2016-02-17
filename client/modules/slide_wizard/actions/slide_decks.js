function _showSlide(FlowRouter, slideNumber) {
  FlowRouter.setQueryParams({slideNumber: slideNumber});
}

export default {
  showSlide({FlowRouter}, slideNumber) {
    _showSlide(FlowRouter, slideNumber);
  },
  addSlide({Meteor, FlowRouter}, slideDeckId) {
    Meteor.call('slideDecks.addSlideInDeck', slideDeckId, function (err, newSlide) {
      FlowRouter.setQueryParams({slideNumber: newSlide.number});
    });
  },
  removeSlide({Meteor, FlowRouter}, slideDeckId, slideNumber) {
    Meteor.call('slideDecks.removeSlideInDeck', slideDeckId, slideNumber);
  }
};
