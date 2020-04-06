<template lang="pug">
v-card.elevation-3(outlined v-if="$subReady.charactersByIds")
  template( v-for="character in charactersByIds")
    v-list-item( @click="chooseAlt(character._id)")
      v-avatar.mr-2(tile size="20px")
        img( style="pointer-events: none;"  :src="`/images/professions/${character['profession']}_tango_icon_20px.png`")
      | {{character['name']}}
  
</template>
<script>
export default {
  props: ["eventSlotId", "charIds"],
  meteor: {
    $subscribe: {
      charactersByIds() {
        return [this.charIds]; // send the param to the server
      },
    },
    charactersByIds() {
      return CollectionCharacters.find({ _id: { $in: this.charIds } });
    },
  },
  methods: {
    chooseAlt(charId) {
      Meteor.call("selectAltCharacter", this.eventSlotId, charId);
      this.$emit("altCharacterClicked");
    },
  },
  mounted() {
    console.log(this.charIds);
  },
};
</script>
