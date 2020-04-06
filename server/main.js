import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';
import './accounts.js';
import './publications';
import './methods';

Meteor.startup(() => {
  // console.log(_);

  ServiceConfiguration.configurations.upsert({
    service: 'discord',
  }, {
    $set:
    {
      loginStyle: "popup",
      clientId: Meteor.settings.discord.clientId,      // Your app id
      secret: Meteor.settings.discord.secret // Your app secret
    }
  });


  Roles.createRole('admin', { unlessExists: true });
  Roles.createRole('rl', { unlessExists: true });

  const firstUser = Meteor.users.find({}, {
    sort: {
      createdAt: 1
    },
    limit: 1
  }).fetch()[0];

  if (firstUser) {
    Roles.addUsersToRoles(firstUser, ['admin', 'rl']);
  }



});

