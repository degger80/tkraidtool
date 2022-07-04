<template lang="pug">
v-card(outlined)
  v-card-title Выбери персонажа для участия
    span.subtitle-1.ml-3 (Показаны только персонажи выбранные в профиле)
  v-card-text
    v-row
      v-col(v-for="c in characters" cols="12" sm="6" md="4" lg="3" xl="2")
        v-card.relative(outlined)
          v-card-title
            img.ma-auto(:src="`${assetsUrl}/professions/${c.profession}_tango_icon_48px.png`")
          v-card-text.text-center {{c.name}}
          v-card-actions
            v-btn(
              text
              :class="{'blue darken-1 white--text':c.default}"
              @click="setDefaultCharacter(c._id)") Main
            v-spacer
            v-btn(
              v-if="userHasDefaultCharacter && userHasDefaultCharacter._id!==c._id" 
              text
              :class="{alt:isAlt(c._id)}"
              @click="toggleAlternative(c._id)") Alt
    v-row
      v-col(cols="12" sm="4")
        v-radio-group.ml-2(v-model="subType")
          v-radio(
            label='Пойду'
            value="3")
          v-radio(
            label='Под вопросом'
            value="2")
          v-radio(
            label='Не смогу'
            value="1")
      v-col(cols="12" sm="8")
        v-text-field(outlined v-model="comment" label='Послание РЛу')
      
        v-btn(block color="primary" @click="joinEvent" :disabled="!userHasDefaultCharacter") Вписаться
</template>
<script>
// import "/imports/collections/CollectionCharacters";

export default {
  data: () => ({
    subType: "3",
    comment: "",
    assetsUrl: Meteor.settings.public.assetsUrl,
  }),
  meteor: {
    $subscribe: {
      characters: [],
      eventSlots: [],
    },
    currentUser() {
      return Meteor.user();
    },
    characters() {
      return CollectionCharacters.find(
        { visible: true },
        { sort: { age: -1 } }
      );
    },
    evenSlot() {
      return CollectionEventSlots.findOne({
        userId: Meteor.userId(),
        eventId: this.$route.params.id,
      });
    },
    userHasDefaultCharacter() {
      return CollectionCharacters.findOne({
        userId: Meteor.userId(),
        default: true,
      });
    },
  },
  computed: {
    alts() {
      return this.evenSlot && this.evenSlot.alternativeCharacters;
    },
  },
  methods: {
    isAlt(characterId) {
      // console.log(this.eventSlot);

      return this.alts && this.alts.includes(characterId);
    },
    setDefaultCharacter(id) {
      Meteor.call("setDefault", id);
    },
    joinEvent() {
      // console.log(this.$route.params.id);

      Meteor.call(
        "subscribeToEvent",
        this.$route.params.id,
        this.comment,
        this.subType,
        function (error, result) {
          if (error) {
            console.log(error);
          }

          // console.log(result);
        }
      );
    },
    toggleAlternative(chId) {
      Meteor.call("toggleAlternativeCharacter", chId, this.evenSlot._id);
    },
  },
};
</script>
<style lang="stylus">
.event-page
  .v-btn.alt
    background-color #deffde
</style>
