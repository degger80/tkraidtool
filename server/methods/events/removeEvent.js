Meteor.methods({
  'removeEvent': function (eventId) {
    var userId = Meteor.userId();
    var eventItem = CollectionEvents.findOne(eventId);

    if (!userId) {
      throw new Meteor.Error(401, 'Надо залогиниться чтобы удалять ивенты');
    }

    if (!(Roles.userIsInRole(userId, 'admin') || (userId === eventItem.ownerId))) {
      throw new Meteor.Error(403, 'Только админ или владелец инвента может удалить ивент');
    }

    this.unblock();

    CollectionEventSlots.remove({ eventId: eventId });
    CollectionEvents.remove({ _id: eventId });
    return true;
  }
});