import SimpleSchema from 'simpl-schema';
CollectionEventSlots = new Mongo.Collection('eventSlots');

CollectionEventSlots.allow({
  insert: function (userId, doc) {
    return userId;
  },
  update: function (userId, doc, fields, modifier) {

    return Roles.userIsInRole(userId, 'admin');
  },
  remove: function (userId, doc) {
    // let eventOwnerId = CollectionEvents.findOne(doc.eventId).ownerId;
    return (userId === doc.ownerId) || (Roles.userIsInRole(userId, 'admin'));
  }

});

CollectionEventSlots.attachSchema(
  new SimpleSchema({
    eventId: {
      type: String,
    },
    groupId: {
      type: String,
      optional: true,
      defaultValue: null
    },
    slotId: {
      type: String,
      optional: true,
      defaultValue: null
    },
    userId: {
      type: String,
      autoValue: function () {
        if (this.isInsert) {
          return Meteor.userId();
        } else if (this.isUpsert) {
          return {
            $setOnInsert: Meteor.userId()
          };
        } else {
          this.unset(); // Prevent user from supplying their own value
        }
      }
    },
    characterId: {
      type: String
    },
    comment: {
      type: String,
      optional: true,
      defaultValue: null,
      max: 50
    },
    mark: { // 0 - red, 1-white, 2-yellow, 3-green
      type: String,
      optional: true,
      defaultValue: null
    },
    rl_comment: {
      type: String,
      optional: true,
      defaultValue: null
    },
    profession: {
      type: String,
      optional: true,
      defaultValue: null
    },
    characterName: {
      type: String,
      optional: true,
      defaultValue: null
    },
    createdAt: {
      type: Date,
      autoValue: function () {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {
            $setOnInsert: new Date
          };
        } else {
          this.unset(); // Prevent user from supplying their own value
        }
      }
    },
    alternativeCharacters: {
      type: Array,
      optional: true,
      defaultValue: null
    },
    'alternativeCharacters.$': {
      type: String
    },
  })
);