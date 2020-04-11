<template lang="pug">
.equipped-item(:class="[item.rarity, align]")
  img(:src="item.icon")
  .overlay
  .item-tooltip
    h5 {{item.name}}
    h5 {{item.rarity}}
    p(v-if="item.damage") {{item.damage}}
    p(v-if="item.description") {{item.description}}
    p(v-if="item.defense") {{item.defense}}
    p(v-for="item in stats") {{item}}

</template>
<script>
export default {
  props: ["item", "align"],
  computed: {
    stats() {
      const stats = [];
      for (const key in this.item.stats) {
        if (this.item.stats.hasOwnProperty(key)) {
          stats.push(`${key}: ${this.item.stats[key]}`);
        }
      }
      return stats;
    },
  },
};
</script>
