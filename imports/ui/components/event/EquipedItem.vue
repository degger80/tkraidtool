<template lang="pug">
.equipped-item(:class="[item.rarity, align]")
  img(:src="item.icon")
  .overlay
  .item-tooltip
    h5 {{item.name}}
    h5 {{item.rarity}}
    p(v-if="damage") {{damage}}
    p(v-if="defense") {{defense}}
    p(v-for="item in stats") {{item}}
    p(v-for="item in amuletStats") {{item}}

</template>
<script>
export default {
  props: ["item", "baseData", "align"],

  computed: {
    damage() {
      let damage = null;

      if (this.item && this.item.details && this.item.details.min_power) {
        damage = "Damage: " + this.item.details.min_power;
      }
      if (this.item && this.item.details && this.item.details.max_power) {
        damage += "-" + this.item.details.max_power;
      }
      return damage;
    },
    defense() {
      let defense = null;
      if (this.item && this.item.details && this.item.details.defense) {
        defense = "Defence: " + this.item.details.defense;
      }
      return defense;
    },
    amuletStats() {
      let stats = [];
      if (this.item.attributes) {
        for (const [attr, value] of this.item.attributes) {
          stats.push(`${attr}: ${value}`);
        }
      }
      return stats;
    },
    stats() {
      let stats = [];
      let attributes = {};
      if (
        this.item &&
        this.item.details &&
        this.item.details.infix_upgrade &&
        this.item.details.infix_upgrade.attributes
      ) {
        this.item.details.infix_upgrade.attributes.map(function (item) {
          // stats.push(item.attribute+": "+item.modifier);
          if (item.attribute === "CritDamage") {
            attributes["Ferocity"] = item.modifier;
          } else {
            attributes[item.attribute] = item.modifier;
          }
        });
      }

      if (this.baseData && this.baseData.stats) {
        // console.log(this.baseData.stats);
        for (const [attribute, modifier] of Object.entries(
          this.baseData.stats
        )) {
          if (attribute === "CritDamage") {
            attributes["Ferocity"] = modifier;
          } else {
            attributes[attribute] = modifier;
          }
        }
      }

      if (
        this.item &&
        this.item.details &&
        this.item.details.infix_upgrade &&
        this.item.details.infix_upgrade.buff
      ) {
        var re = /\+(\d+) (\w+)/g;
        var str = this.item.details.infix_upgrade.buff.description;
        var m;

        while ((m = re.exec(str)) !== null) {
          if (m.index === re.lastIndex) {
            re.lastIndex++;
          }

          if (attributes[m[2]]) {
            attributes[m[2]] = attributes[m[2]] + Number(m[1]);
          } else {
            attributes[m[2]] = Number(m[1]);
          }
        }
      }

      // console.log(attributes);

      for (const [attribute, value] of Object.entries(attributes)) {
        stats.push(`${attribute}: ${value}`);
      }

      return stats;
    },
  },
};
</script>
