// Meteor.publish("userData", function () {
//   return Meteor.users.find({ _id: this.userId },
//     { fields: { 'profile': 1, 'roles': 1 } });
// });

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready()
  }
})

Meteor.publish(null, function () {
  if (Roles.userIsInRole(this.userId, ['admin', 'RL'])) {
    return Meteor.roleAssignment.find({});
  } else {
    this.ready()
  }
})

Meteor.publish('userlist', function () {
  if (Roles.userIsInRole(this.userId, ['admin', 'RL'])) {
    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        profile: 1,
        createdAt: 1,
        roles: 1,
        gwData: 1
      }
    });
  }

  return this.ready();
});