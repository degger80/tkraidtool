<template lang="pug">
  v-list-item.relative
    v-avatar.mr-2(tile size="30px" :class="{hasAlts: hasAlts}" @click.stop="toggleShowAlts")
      img( style="pointer-events: none;"  :src="`/images/professions/${eventSlot['profession']}_tango_icon_20px.png`")
    | {{eventSlot['characterName']}}
    div.alts(v-if="showAlts&&hasAlts")
      AltChars(:charIds="alts" :eventSlotId="eventSlot._id" v-on:altCharacterClicked="showAlts=false")
        
      
</template>
<script>
import AltChars from "/imports/ui/components/event/AltChars";
export default {
  props: ["eventSlot"],
  components: {
    AltChars,
  },
  data: () => ({
    showAlts: false,
  }),
  computed: {
    alts() {
      return this.eventSlot.alternativeCharacters.filter(
        (el) => el !== this.eventSlot.characterId
      );
    },
    hasAlts() {
      return (
        this.eventSlot.alternativeCharacters.filter(
          (el) => el !== this.eventSlot.characterId
        ).length > 0
      );
    },
  },
  methods: {
    toggleShowAlts(e) {
      if (this.hasAlts) this.showAlts = !this.showAlts;
    },
  },
};
</script>
<style lang="stylus" scoped>
.v-avatar
  box-sizing border-box
  border 1px solid #BBDEFB
  img
    width 20px
    height 20px
  &.hasAlts

    border-bottom 3px double #BBDEFB
    border-right  3px double #BBDEFB
    border-radius 4px
.alts
  position absolute
  bottom -40px
  left 60px
  z-index 10
</style>
