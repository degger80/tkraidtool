import { exec } from 'child_process'
// import { Log } from 'meteor/logging'

// import { fmtDate } from "/imports/ui/mixins/fmtDate";
Meteor.methods({
  'notifyEvent': function (eventId) {
    var userId = Meteor.userId();
    var eventItem = CollectionEvents.findOne(eventId);

    if (!userId) {
      throw new Meteor.Error(401, 'Надо залогиниться чтобы удалять ивенты');
    }

    if (!(Roles.userIsInRole(userId, 'admin') || (userId === eventItem.ownerId))) {
      throw new Meteor.Error(403, 'Только админ или владелец инвента может удалить ивент');
    }

    // this.unblock();
    console.log(eventItem.startDateTime);

    var date = moment(eventItem.startDateTime)
      .utcOffset(180)
      .format("H:mm DD MMMM YYYY");

    var msg = `${eventItem.ownerUsername} собирает ${date} ${eventItem.title} (${eventItem.eventType}) ${eventItem.description} ${eventItem.maxGroups * 5} мест`;
    console.log(msg);

    msg = msg.replace(/([^a-z0-9а-яА-Я():\.\s]+)/gi, ' ');

    console.log(`/home/tkraidtool/.nvm/versions/node/v20.14.0/bin/node /home/tkraidtool/tk_raid_tool/discord/notify.js ${eventId} "${msg}"`);
    exec(`/home/tkraidtool/.nvm/versions/node/v20.14.0/bin/node /home/tkraidtool/tk_raid_tool/discord/notify.js ${eventId} "${msg}"`);


    return true;
  }
});