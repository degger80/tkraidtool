import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http'


Accounts.onCreateUser(function (options, user) {

  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  user.username = user.profile.username;



  return user;
});

Accounts.onLogin((options) => {
  // TK - 138216321673461760
  if (!options.user.profile.isTK) {
    try {
      const result = HTTP.get(`https://discordapp.com/api/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${options.user.services.discord.accessToken}`
        }
      })
      console.log(result.data);
      let isTK = false
      result.data.map(el => {
        if (el.id === '138216321673461760') {
          isTK = true
        }
      })

      Meteor.users.update(options.user._id, {
        $set: {
          username: options.user.services.discord.username,
          "profile.username": options.user.services.discord.username,
          "profile.isTK": isTK,
          "profile.avatar": options.user.services.discord.avatar,
          "profile.id": options.user.services.discord.id

        }
      })
    } catch (error) {
      console.log(error);
    }
  }

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
