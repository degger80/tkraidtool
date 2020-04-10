Meteor.publish("gwItems", function (itemIds) {
  return CollectionGWItems.find({ "id": { $in: itemIds } }, {
    fields: {
      'description': 1,
      'details.defense': 1,
      'details.bonuses': 1,
      'details.infix_upgrade': 1,

      'details.max_power': 1,
      'details.min_power': 1,

      'id': 1,
      'name': 1,
      'rarity': 1,
      'icon': 1

    }
  });
});

Meteor.publish("gwSpecializations", function (specId) {
  return CollectionGWSpecializations.find({ id: specId }, {
    fields: {
      'id': 1,
      'major_traits': 1,
      'minor_traits': 1,
      'name': 1,
      'profession': 1,

      'icon': 1,
      'background': 1

    }
  });
});

Meteor.publish("gwTraits", function (specId) {
  return CollectionGWTraits.find({ specialization: specId }, {
    fields: {
      'description': 1,
      'id': 1,
      //'facts' : 1,
      'name': 1,
      'specialization': 1,
      'icon': 1

    }
  });
});
Meteor.publish("gwSkills", function (skillIds) {
  if (skillIds)
    return CollectionGWSkills.find({ id: { $in: skillIds } });
  else
    return this.ready();
});
Meteor.publish("gwPets", function (petIds) {
  if (petIds)
    return CollectionGWPets.find({ id: { $in: petIds } });
  else
    return this.ready();
});
Meteor.publish("gwLegends", function (legendIds) {
  if (legendIds)
    return CollectionGWLegends.find({ id: { $in: legendIds } });
  else
    return this.ready();
});
Meteor.publish("gwAmulet", function (amuletId) {
  if (amuletId)
    return CollectionGWAmulets.find({ id: amuletId });
  else
    return this.ready();
});