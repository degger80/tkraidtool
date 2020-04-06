

import '/imports/collections/CollectionEvents'
import '/imports/collections/CollectionEventSlots'
Meteor.methods({
  'selectAltCharacter': function (eventSlotId, characterId) {
    this.unblock();

    var userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error(401, 'Надо залогиниться и быть РЛом чтобы менять перса');
    }

    if (!Roles.userIsInRole(userId, 'rl')) {
      throw new Meteor.Error(403, 'Только РЛ может менять перса');
    }

    var eventSlot = CollectionEventSlots.findOne({ _id: eventSlotId });
    if (!eventSlot)
      throw new Meteor.Error(404, 'нет такого слота');

    var eventItem = CollectionEvents.findOne({ _id: eventSlot.eventId });

    if (!((eventItem.ownerId == userId) || (Roles.userIsInRole(userId, 'admin')) || ((eventItem.subRls) && (eventItem.subRls.includes(userId))))) {
      throw new Meteor.Error(401, 'Только РЛ и замы данного рейда может выбирать перса');
    }

    var character = CollectionCharacters.findOne({ _id: characterId });
    if (!character)
      throw new Meteor.Error(404, 'нет такого персонажа');

    CollectionEventSlots.update(eventSlot._id, {
      $set: {
        characterId: character._id,
        profession: character.profession,
        characterName: character.name
      }
    });

    return true;
  }
})

