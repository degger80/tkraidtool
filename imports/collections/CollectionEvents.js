import SimpleSchema from 'simpl-schema';
CollectionEvents = new Mongo.Collection('events');

CollectionEvents.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'rl');
  },
  update: function (userId, doc, fields, modifier) {
    return (userId === doc.ownerId) || (Roles.userIsInRole(userId, 'admin'));
  },
  remove: function (userId, doc) {
    return (userId === doc.ownerId) || (Roles.userIsInRole(userId, 'admin'));
  }

});

CollectionEvents.attachSchema(
  new SimpleSchema({
    title: {
      type: String,
      label: 'Назавние ивента',
      max: 30,
      min: 2
    },
    description: {
      type: String,
      label: 'Описание ивента',
      min: 2
    },
    eventType: { // 1-wvw, 2-pve, 3-pvp
      type: String,
      label: 'Тип ивента'
    },
    maxGroups: {
      type: Number,
      label: 'Количество групп в мейн составе',
      defaultValue: 7,
      min: 0,
      max: 10
    },
    approved: {
      type: Number,
      defaultValue: 0,
      optional: true
    },
    subscribed: {
      type: Number,
      defaultValue: 0,
      optional: true
    },
    startDateTime: {
      type: Date,
      label: 'DateTime начала ивента'
    },
    duration: {
      type: Number,

      label: 'Длительность в часах'
    },
    status: {
      type: Number,
      defaultValue: 0,
      optional: true
    },
    isPrivate: {
      type: Boolean,
      defaultValue: false,
      optional: true
    },
    invitedUsers: {
      type: Array,
      defaultValue: [],
      optional: true
    },
    'invitedUsers.$': {
      type: String
    },
    ownerId: {
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
    ownerUsername: {
      type: String,
      autoValue: function () {
        if (this.isInsert) {
          return Meteor.user().username;
        } else if (this.isUpsert) {
          return {
            $setOnInsert: Meteor.user().username
          };
        } else {
          this.unset(); // Prevent user from supplying their own value
        }
      }
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
    subRls: {
      type: Array,
      optional: true,
      defaultValue: []
    },
    'subRls.$': {
      type: String
    },
  })
);
