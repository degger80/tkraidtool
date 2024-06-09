import {exec} from 'child_process' 
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
  
      this.unblock();

      exec(`/home/tkraidtool/.nvm/versions/node/v20.14.0/bin/node /home/tkraidtool/tk_raid_tool/discord/notify.js ${eventId}`);

      return true;
    }
  });