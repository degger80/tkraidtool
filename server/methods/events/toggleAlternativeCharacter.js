

import '/imports/collections/CollectionEvents'
import '/imports/collections/CollectionEventSlots'
Meteor.methods({
  'toggleAlternativeCharacter': function (characterId, slotId) {

    // console.log(characterId, slotId);

    var userId = Meteor.userId();

    var eventSlot = CollectionEventSlots.findOne({ _id: slotId });
    // console.log(eventSlot);

    if (userId !== eventSlot.userId)
      throw new Meteor.Error(403, 'Только владелец персонажа может выбирать альтернативных персов в рейд');

    if (eventSlot.alternativeCharacters.includes(characterId)) { //персонаж в альтернативных
      CollectionEventSlots.update({ _id: slotId }, {
        $set: {
          alternativeCharacters: eventSlot.alternativeCharacters.filter(el => el !== characterId)
        }
      });
    } else {
      CollectionEventSlots.update({ _id: slotId }, {
        $set: {
          alternativeCharacters: [...eventSlot.alternativeCharacters, characterId]
        }
      });
    }
    return true;

  }
})

