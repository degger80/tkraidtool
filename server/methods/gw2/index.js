Meteor.methods({
  'updateItemCache': function (itemId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/items/' + itemId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWItems.findOne({ id: itemId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWItems.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWItems.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateSpecializationCache': function (specId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/specializations?id=' + specId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWSpecializations.findOne({ id: specId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWSpecializations.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWSpecializations.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateTraitCache': function (traitId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/traits?id=' + traitId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWTraits.findOne({ id: traitId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWTraits.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWTraits.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateSkillsCache': function (skillId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/skills?id=' + skillId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWSkills.findOne({ id: skillId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWSkills.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWSkills.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateLegendsCache': function (legendId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/legends?id=' + legendId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });
      var result2 = HTTP.call('GET', 'https://api.guildwars2.com/v2/skills/' + result.data.swap, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWLegends.findOne({ id: legendId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      insertObject.icon = result2.data.icon;
      insertObject.name = result2.data.name;
      insertObject.description = result2.data.description;
      if (item) {
        //update

        CollectionGWLegends.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWLegends.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateAmuletsCache': function (amuletId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/pvp/amulets?id=' + amuletId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWAmulets.findOne({ id: amuletId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWAmulets.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWAmulets.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updatePetsCache': function (petId) {
    this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/pets/' + petId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWPets.findOne({ id: petId });
      var insertObject = result.data;
      console.log(insertObject);

      insertObject.updatedAt = new Date();
      if (item) {
        //update
        console.log('update', item._id);

        CollectionGWPets.update(item._id, { $set: insertObject });


      } else {
        //insert
        console.log('insert');

        CollectionGWPets.insert(insertObject);

      }

      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
})