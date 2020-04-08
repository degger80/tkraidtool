import "/imports/collections/CollectionEvents"
import "/imports/collections/CollectionEventSlots"

Meteor.publish('event', function (eventId) {
  if (eventId) {
    return CollectionEvents.find({ _id: eventId });
  } else {
    this.ready()
  }

});

Meteor.publish('eventSlots', function (eventId) {

  if (eventId) {
    return CollectionEventSlots.find({ eventId: eventId });
  } else {
    this.ready()
  }
});

Meteor.publish("eventUsersInfo", function (eventId) {
  var slots = CollectionEventSlots.find({ eventId: eventId }, { fields: { userId: 1 } }).fetch();
  var userIds = [];
  slots.map(function (slot) {
    userIds.push(slot.userId);
  });

  return Meteor.users.find({ _id: { $in: userIds } },
    {
      fields: {
        'profile.avatar': 1,
        'profile.username': 1
      }
    });
});

Meteor.publish('upcomingEvents', function (limit) {
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
  }
  var startDateTime = new Date().addHours(-4);
  if (Roles.userIsInRole(this.userId, ['admin']))
    return CollectionEvents.find({
      startDateTime: {
        $gt: startDateTime
      }
    }, {
      sort: { startDateTime: 1 },
      limit: limit
    });
  else
    return CollectionEvents.find({
      startDateTime: {
        $gt: startDateTime
      },
      $or: [
        { isPrivate: false }, // публичный ивент
        { ownerId: this.userId }, //владелец ивента
        { invitedUsers: this.userId } //пользователь в списке приглашенных
      ]
    }, {
      sort: { startDateTime: 1 },
      limit: limit
    });
});

Meteor.publish('eventsOfTheDay', function (date, clientOffset) {
  // console.log(date);

  if (clientOffset !== parseInt(clientOffset, 10)) {
    return this.ready();
  }



  var serverTimeDiff = clientOffset - moment().utcOffset();
  console.log(clientOffset, serverTimeDiff);



  var startDateTime = moment(date).add(clientOffset, 'minutes').startOf('day').toDate();
  var endDateTime = moment(date).add(clientOffset, 'minutes').endOf('day').toDate();


  return CollectionEvents.find(
    {

      startDateTime: {
        $gt: startDateTime,
        $lt: endDateTime
      },
      $or: [
        { isPrivate: false }, // публичный ивент
        { ownerId: this.userId }, //владелец ивента
        { invitedUsers: this.userId } //пользователь в списке приглашенных
      ]

    },
    {
      sort: { startDateTime: 1 },

    });
});