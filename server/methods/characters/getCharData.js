import '/imports/collections/CollectionCharacters'

const getSkillData = (skillId) => {
  // console.log(skillId);

  let skillData = CollectionGWSkills.findOne({ id: skillId })
  if (!skillData) {
    console.log(`дергаем апи по skill  ${skillId}`);
    skillData = Meteor.call('updateSkillsCache', skillId)
  }

  if (!skillData.icon.includes('time-keepers')) Meteor.call('cacheSkillIcon', skillData);

  let skill = {
    id: skillData.id,
    name: skillData.name,
    description: skillData.description ? skillData.description.replace(/<(?:.|\n)*?>/gm, "") : "",
    icon: skillData.icon
  }

  return skill
}

Meteor.methods({
  'getCharData': function (characterId, eventType) {
    console.log('getCharData', characterId);

    check(eventType, Match.OneOf('wvw', 'pve', 'pvp'))

    try {
      const character = CollectionCharacters.findOne({ _id: characterId });

      // console.log(eventType);

      const charData = {
        name: character.name,
        profession: character.profession,
        stats: {
          Power: 0,
          Precision: 0,
          Ferocity: 0,
          Toughness: 0,
          Vitality: 0,
          ConditionDamage: 0,
          Healing: 0
        },
        specs: [],
        equipment: {},
        skills: []
      }

      // skills
      const eventTypeSkills = character.skills[eventType];
      //heal skill

      if (eventTypeSkills.heal) {
        charData.skills.push(getSkillData(eventTypeSkills.heal))
      }

      if (eventTypeSkills.utilities) {
        eventTypeSkills.utilities.map(el => {
          charData.skills.push(getSkillData(el))
        })
      }

      if (eventTypeSkills.elite) {
        charData.skills.push(getSkillData(eventTypeSkills.elite))
      }



      const eventTypeSpecs = character.specializations[eventType];
      // console.log(eventTypeSpecs);

      for (let index = 0; index < eventTypeSpecs.length; index++) {
        const spec = eventTypeSpecs[index];
        if (spec.id === 0) return charData
        // console.log(spec.id);

        let specData = CollectionGWSpecializations.findOne({ id: spec.id }, {
          fields: {
            id: 1,
            name: 1,
            major_traits: 1,
            minor_traits: 1,
            elite: 1
          }
        })
        // В базе нет какой то специализации - кешируем
        if (!specData) {
          console.log(`дергаем апи по специализации  ${spec.id}`);
          specData = Meteor.call('updateSpecializationCache', spec.id)
        }

        // меняем профу на название элитной
        if (specData.elite) charData.profession = specData.name

        // дергаем инфу по minor трейтам
        for (let index = 0; index < specData.minor_traits.length; index++) {
          let traitId = specData.minor_traits[index];
          let traitData = CollectionGWTraits.findOne({ id: traitId },
            {
              fields: {
                id: 1,
                name: 1,
                description: 1,
                specialization: 1
              }
            }
          )

          if (!traitData) { //нет данных - обновляем кеш
            console.log(`дергаем апи по трейту  ${traitId}`);
            traitData = Meteor.call('updateTraitCache', traitId)
          }
          traitData.active = true

          // console.log(traitData);

          traitData.description = traitData.description ? traitData.description.replace(/<(?:.|\n)*?>/gm, "") : "";
          specData.minor_traits[index] = traitData
        }




        // дергаем инфу по major трейтам
        for (let index = 0; index < specData.major_traits.length; index++) {
          let traitId = specData.major_traits[index];
          let traitData = CollectionGWTraits.findOne({ id: traitId }, {
            fields: {
              id: 1,
              name: 1,
              description: 1,
              // specialization: 1
            }
          })

          if (!traitData) { //нет данных - обновляем кеш
            console.log(`дергаем апи по трейту  ${traitId}`);
            traitData = Meteor.call('updateTraitCache', traitId)
          }
          traitData.active = spec.traits.includes(traitId)
          traitData.description = traitData.description ? traitData.description.replace(/<(?:.|\n)*?>/gm, "") : "";
          specData.major_traits[index] = traitData
        }

        // console.log(specData);
        charData.specs.push(specData)

      }

      // console.log('Данные по эквипу');


      const equipmentData = {
        bonusesQty: {}
      }
      // обрабатываем эквип
      character.equipment.map(item => {
        // console.log(item);
        let itemData = CollectionGWItems.findOne({ id: item.id })
        if (!itemData) {
          console.log('дергаем API updateItemCache ' + item.id);
          itemData = Meteor.call('updateItemCache', item.id)

        }

        if (!itemData.icon.includes('time-keepers')) Meteor.call('cacheItemIcon', itemData);

        // console.log(itemData);
        equipmentData[item.slot] = {
          id: itemData.id,
          name: itemData.name,
          rarity: itemData.rarity,
          icon: itemData.icon,
          description: itemData.description ? itemData.description.replace(/<(?:.|\n)*?>/gm, "") : "",
          stats: {}
        }


        if (itemData.details && itemData.details.min_power) {
          equipmentData[item.slot]['damage'] = "Damage: " + itemData.details.min_power;
        }
        if (itemData && itemData.details && itemData.details.max_power) {
          equipmentData[item.slot]['damage'] += "-" + itemData.details.max_power;
        }

        if (itemData.details && itemData.details.defense) {
          equipmentData[item.slot]['defense'] = "Defence: " + itemData.details.defense;
        }

        // выбираемое оружие имеет приписку названия и выбираемые базовые статы
        if (item.stats) {
          let statData = CollectionGWItemStats.findOne({ id: item.stats.id })
          if (!statData) {
            console.log('дергаем API updateItemStatsCache ' + item.stats.id);
            statData = Meteor.call('updateItemStatsCache', item.stats.id)
          }
          // приписка
          equipmentData[item.slot]['name'] = `${statData.name} ${equipmentData[item.slot]['name']}`

          // базовые статы для выбранного оружия
          if (item.stats.attributes) {
            for (const attr in item.stats.attributes) {


              if (item.stats.attributes.hasOwnProperty(attr)) {
                // console.log(attr);
                const value = item.stats.attributes[attr];
                charData.stats[attr] += value;
                equipmentData[item.slot]['stats'][attr] = equipmentData[item.slot]['stats'][attr] ? equipmentData[item.slot]['stats'][attr] + value : value;
              }
            }
          }
        }

        // infix_upgrade
        if (itemData.details &&
          itemData.details.infix_upgrade &&
          itemData.details.infix_upgrade.attributes) {

          itemData.details.infix_upgrade.attributes.map(function (el) {
            let attr = (el.attribute === 'CritDamage') ? 'Ferocity' : el.attribute

            charData.stats[attr] += el.modifier;
            equipmentData[item.slot]['stats'][attr] = equipmentData[item.slot]['stats'][attr] ? equipmentData[item.slot]['stats'][attr] + el.modifier : el.modifier;
          })
        }

        // что то вставлено
        if (item.upgrades) {
          equipmentData[item.slot]['upgrades'] = []
          for (let index = 0; index < item.upgrades.length; index++) {
            const upgradeId = item.upgrades[index];
            let upgradeData = CollectionGWItems.findOne({ id: upgradeId })
            if (!upgradeData) {
              console.log('дергаем API updateItemCache ' + upgradeId);
              upgradeData = Meteor.call('updateItemCache', upgradeId)
            }
            // console.log(`upgrade ${upgradeId}`);
            // console.log(upgradeData);


            if (!upgradeData.icon.includes('time-keepers')) Meteor.call('cacheItemIcon', upgradeData);

            let stats = {}

            //upgradte infix_stats
            // infix_upgrade
            if (upgradeData.details &&
              upgradeData.details.infix_upgrade &&
              upgradeData.details.infix_upgrade.attributes) {

              upgradeData.details.infix_upgrade.attributes.map(function (el) {
                let attr = (el.attribute === 'CritDamage') ? 'Ferocity' : el.attribute

                charData.stats[attr] += el.modifier;
                stats[attr] = el.modifier;
              })
            }

            let bonuses = []
            if (upgradeData.details &&
              upgradeData.details.bonuses) {
              bonuses = upgradeData.details.bonuses
              console.log(item.slot, equipmentData[item.slot]);
              if (['Coat', 'Boots', 'Gloves', 'Helm', 'Leggings', 'Shoulders'].includes(item.slot)) {
                if (!equipmentData['bonusesQty'][upgradeData.id]) {
                  equipmentData['bonusesQty'][upgradeData.id] = 1
                } else {
                  equipmentData['bonusesQty'][upgradeData.id] += 1
                }
              }

            }




            // console.log(upgradeData);
            equipmentData[item.slot]['upgrades'].push({
              id: upgradeData.id,
              name: upgradeData.name,
              icon: upgradeData.icon,
              description: upgradeData.details && upgradeData.details.infix_upgrade && upgradeData.details.infix_upgrade.buff && upgradeData.details.infix_upgrade.buff.description.replace(/<(?:.|\n)*?>/gm, ""),
              stats,
              bonuses
            })

          }
        }

        // что то вставлено
        if (item.infusions) {
          equipmentData[item.slot]['infusions'] = []
          for (let index = 0; index < item.infusions.length; index++) {
            const infusionId = item.infusions[index];
            let infusionData = CollectionGWItems.findOne({ id: infusionId })
            if (!infusionData) {
              console.log('дергаем API updateItemCache ' + infusionId);
              infusionData = Meteor.call('updateItemCache', infusionId)
            }
            // console.log(`infusion ${infusionId}`);

            if (!infusionData.icon.includes('time-keepers')) Meteor.call('cacheItemIcon', infusionData);

            let stats = {}

            //upgradte infix_stats
            // infix_upgrade
            if (infusionData.details &&
              infusionData.details.infix_upgrade &&
              infusionData.details.infix_upgrade.attributes) {

              infusionData.details.infix_upgrade.attributes.map(function (el) {
                let attr = (el.attribute === 'CritDamage') ? 'Ferocity' : el.attribute

                charData.stats[attr] += el.modifier;
                stats[attr] = el.modifier;
              })
            }

            // console.log(infusionData);
            equipmentData[item.slot]['infusions'].push({
              id: infusionData.id,
              name: infusionData.name,
              icon: infusionData.icon,
              description: infusionData.details && infusionData.details.infix_upgrade && infusionData.details.infix_upgrade.buff && infusionData.details.infix_upgrade.buff.description.replace(/<(?:.|\n)*?>/gm, ""),
              stats
            })

          }
        }

        charData['equipment'] = equipmentData
      })


      return charData


    } catch (e) {
      throw new Meteor.Error(500, 'exception in do_something', e);
    }


    //specialisations





  }
})