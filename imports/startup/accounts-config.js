import { Accounts } from 'meteor/accounts-base';
Accounts.ui.config({
  requestPermissions: {
    discord: ['identify', 'guilds']
  }
});



