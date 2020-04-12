const https = require('https');
const fs = require('fs');

Meteor.methods({
  'updateItemCache': function (itemId) {
    // this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/items/' + itemId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });


      var item = CollectionGWItems.findOne({ id: itemId });
      var insertObject = result.data;
      if (result.statusCode === 404) {
        insertObject = {
          id: itemId,
          name: 'Фигня какая то которой нет в API',
          bug: true,
          icon: `/images/races/Asura_tango_icon_48px.png`
        }
      }
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWItems.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWItems.insert(insertObject);

      }

      return CollectionGWItems.findOne({ id: itemId });
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  'updateItemStatsCache': function (itemId) {
    // this.unblock();
    try {
      var result = HTTP.call('GET', 'https://api.guildwars2.com/v2/itemstats/' + itemId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      var item = CollectionGWItemStats.findOne({ id: itemId });
      var insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWItemStats.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWItemStats.insert(insertObject);

      }

      return CollectionGWItemStats.findOne({ id: itemId });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateSpecializationCache': function (specId) {
    // this.unblock();
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

      return CollectionGWSpecializations.findOne({ id: specId });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateTraitCache': function (traitId) {
    // this.unblock();
    try {
      const result = HTTP.call('GET', 'https://api.guildwars2.com/v2/traits?id=' + traitId);

      const item = CollectionGWTraits.findOne({ id: traitId });
      const insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        CollectionGWTraits.update(item._id, { $set: insertObject });
      } else {
        CollectionGWTraits.insert(insertObject);
      }

      return CollectionGWTraits.findOne({ id: traitId });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  'updateSkillsCache': function (skillId) {
    // this.unblock();
    try {
      const result = HTTP.call('GET', 'https://api.guildwars2.com/v2/skills?id=' + skillId, {
        // headers: {
        //     Authorization: "Bearer " + key
        // }
      });

      const item = CollectionGWSkills.findOne({ id: skillId });
      const insertObject = result.data;
      insertObject.updatedAt = new Date();
      if (item) {
        //update

        CollectionGWSkills.update(item._id, { $set: insertObject });


      } else {
        //insert

        CollectionGWSkills.insert(insertObject);

      }

      return CollectionGWSkills.findOne({ id: skillId });;
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
  cacheItemIcon (item) {
    this.unblock()

    // return
    // console.log(item.id);

    if (item.bug) return


    let newPath = `${Meteor.settings.public.assetsPath}/e/i/${item.id}.png`
    try {
      // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      let result = HTTP.get(item.icon, {
        // responseType: "buffer",
        npmRequestOptions: {
          requestCert: false,
          encoding: null,

          rejectUnauthorized: false // TODO remove when deploy
        },
      })
      // console.log(result);

      if (result.statusCode === 200) {
        fs.writeFileSync(newPath, result.content)
        CollectionGWItems.update({ id: item.id }, {
          $set: {
            icon: `${Meteor.settings.public.assetsUrl}/e/i/${item.id}.png`
          }
        })
      }
    } catch (error) {
      console.log(error);

    }

  },

  cacheSkillIcon (item) {
    this.unblock()

    if (item.bug) return


    let newPath = `${Meteor.settings.public.assetsPath}/e/s/${item.id}.png`
    try {
      // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      let result = HTTP.get(item.icon, {
        // responseType: "buffer",
        npmRequestOptions: {
          requestCert: false,
          encoding: null,
          rejectUnauthorized: false // TODO remove when deploy
        },
      })
      // console.log(result);

      if (result.statusCode === 200) {
        fs.writeFileSync(newPath, result.content)
        CollectionGWSkills.update({ id: item.id }, {
          $set: {
            icon: `${Meteor.settings.public.assetsUrl}/e/s/${item.id}.png`
          }
        })
      }
    } catch (error) {
      console.log(error);

    }

  }
})