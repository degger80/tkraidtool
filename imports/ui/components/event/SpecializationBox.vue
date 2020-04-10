<template lang="pug">
  .spec-branch(:style="`backgroundImage: url(${gwSpecializations.background})`" v-if="$subReady.gwSpecializations && $subReady.gwTraits")
    .spec-name {{gwSpecializations.name}}
    .spec-icon(:style="`backgroundImage: url(${gwSpecializations.icon})`")
    SpecTrait(v-for="item,index in gwSpecializations.minor_traits" :traitId="item" type="minor" :index="index+1" :isActive="true")
    SpecTrait(v-for="item,index in gwSpecializations.major_traits" :traitId="item" type="major" :index="index+1" :isActive="spec.traits.includes(item)")
</template>
<script>
import SpecTrait from "/imports/ui/components/event/SpecTrait";
export default {
  props: ["spec"],
  components: {
    SpecTrait,
  },
  data() {
    return {
      assetsUrl: Meteor.settings.public.assetsUrl,
    };
  },
  meteor: {
    $subscribe: {
      gwSpecializations() {
        return [this.spec.id]; // send the param to the server
      },
      gwTraits() {
        return [this.spec.id]; // send the param to the server
      },
    },
    gwSpecializations() {
      const sp = CollectionGWSpecializations.findOne({ id: this.spec.id });

      if (this.$subReady.gwSpecializations && !sp) {
        console.log("update FROM GW2!");

        Meteor.call("updateSpecializationCache", this.spec.id);
      }
      return sp;
    },
  },
};
</script>
