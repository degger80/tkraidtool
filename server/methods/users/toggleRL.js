
Meteor.methods({
  toggleRL: function (userId) {
    var user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(401, 'You need to login to post new stories');
    }

    if (!Roles.userIsInRole(user, ['admin'])) {
      throw new Meteor.Error(403, 'только администратор может менять статус пользователей');
    }

    //Если у пользователя есть роль - отключаем, иначе включаем
    if (Roles.userIsInRole(userId, 'rl')) {


      Roles.removeUsersFromRoles(userId, ['rl']);
    } else {

      Roles.addUsersToRoles(userId, ['rl']);
    }
  },
})