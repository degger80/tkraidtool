
import '/imports/collections/CollectionEvents'
import '/imports/collections/CollectionEventSlots'
Meteor.methods({
  'putSlotToGroup': function (slotId, groupNumber, slotNumber) {

    var userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error(401, 'Надо залогиниться');
    }

    var es = CollectionEventSlots.findOne(slotId);
    if (!es) {
      return;
    }
    var eventItem = CollectionEvents.findOne(es.eventId);

    if (!((eventItem.ownerId == userId) || (Roles.userIsInRole(userId, 'admin')) || ((eventItem.subRls) && (_.contains(eventItem.subRls, userId))))) {
      throw new Meteor.Error(401, 'Только РЛ и замы данного рейда может сохранять статики в нем');
    }

    CollectionEventSlots.update({
      eventId: es.eventId,
      groupId: groupNumber,
      slotId: slotNumber
    }, {
      $set: {
        groupId: null,
        slotId: 'reserv'
      }
    });

    CollectionEventSlots.update(slotId, {
      $set: {
        groupId: groupNumber,
        slotId: slotNumber
      }
    });

  }
})