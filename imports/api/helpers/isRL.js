import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

export default () => {
  return new Promise((resolve, reject) => {
    Tracker.autorun((c) => {
      // stop computation when Meteor.user() is ready
      Meteor.user() !== undefined && c.stop()
      // return false if user is a guest
      Meteor.user() === null && resolve(false)
      // return true if user is logged in

      Meteor.user() && Roles.userIsInRole(Meteor.userId, "rl") && resolve(true)
    })
  })
}