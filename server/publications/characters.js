import "/imports/collections/CollectionCharacters"

Meteor.publish("charactersByIds", function (characterIds) {
  return CollectionCharacters.find({ _id: { $in: characterIds } }, {
    fields: {
      'equipment': 1,
      'equipment_pvp': 1,
      'level': 1,
      'name': 1,
      'profession': 1,
      'updatedAt': 1,
      'specializations': 1,
      'userId': 1,
      'comment': 1,
      'skills': 1
    }
  });
});

Meteor.publish("characters", function () {
  return CollectionCharacters.find({
    userId: this.userId
  }, {
    fields: {
      'level': 1,
      'name': 1,
      'profession': 1,
      'updatedAt': 1,
      'default': 1,
      'userId': 1,
      'visible': 1,
      'passive': 1,
      'comment': 1
    }
  });
});