Meteor.users.deny({ update: function () { return true; } });

Meteor.methods({
  toggleAdmin: function (userId) {

    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, 'You need to login to post new stories');
    }

    if (!Roles.userIsInRole(user, 'admin')) {
      throw new Meteor.Error(403, 'только администратор может менять статус пользователей');
    }

    var firstUser = Meteor.users.find({}, {
      sort: {
        createdAt: 1
      },
      limit: 1
    }).fetch()[0];
    if (userId === firstUser._id) {
      throw new Meteor.Error(403, 'Атата, у это дяди не отнять администратора');
    }

    if (Roles.userIsInRole(userId, 'admin')) {

      var admins = Roles.getUsersInRole('admin');

      if (admins && admins.count() <= 1) {
        throw new Meteor.Error(422, 'в системе должен оставаться хотя бы один администратор');
      }

      Roles.removeUsersFromRoles(userId, ['admin']);
    } else {

      Roles.addUsersToRoles(userId, ['admin']);
    }
  }
})