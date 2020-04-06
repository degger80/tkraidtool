import SimpleSchema from 'simpl-schema';
CollectionStatics = new Mongo.Collection('statics');

CollectionStatics.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'rl');
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, 'rl');
  },
  remove: function (userId, doc) {
    return (userId === doc.ownerId) || (Roles.userIsInRole(userId, 'admin'));
  }

});

CollectionStatics.attachSchema(
  new SimpleSchema({
    staticId: {
      type: String,
    },
    raidLeaderId: {
      type: String,
    },
    eventTypeId: {
      type: String,
    },
    characterId: {
      type: String,
      optional: true,
      defaultValue: null
    },
    userId: {
      type: String,
      optional: true,
      defaultValue: null
    },
    partyLeader: {
      type: Boolean,
    },
    characterName: {
      type: String,
      optional: true,
      defaultValue: null
    }
  })
);