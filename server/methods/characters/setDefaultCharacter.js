import '/imports/collections/CollectionCharacters'
Meteor.methods({
  'setDefault': function (characterId) {
    this.unblock();

    var userId = Meteor.userId();
    var character = CollectionCharacters.findOne({ _id: characterId });

    if (character && character.userId === userId) {
      CollectionCharacters.update({ userId: userId, default: true }, { $set: { default: false } }, { multi: true });
      CollectionCharacters.update({ _id: characterId }, { $set: { default: true } });

      return true;
    } else {
      return false;
    }
  }
})