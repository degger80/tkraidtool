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