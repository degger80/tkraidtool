
import '/imports/collections/CollectionCharacters'
Meteor.methods({
  'updateCharacter': function (characterId, visible) {

    CollectionCharacters.update({
      userId: this.userId,
      _id: characterId
    }, {
      $set: {
        visible: !!visible
      }
    })

  }
})