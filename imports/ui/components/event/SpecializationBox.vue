<template lang="pug">
  .spec-branch(:style="`backgroundImage: url(${assetsUrl}/s_bg/${spec.id}.png)`")
    .spec-name {{spec.name}}
    .spec-icon(:style="`backgroundImage: url(${assetsUrl}/s_icons/${spec.id}.png)`")
    SpecTrait(v-for="item,index in spec.minor_traits" :specId="spec.id" :trait="item" type="minor" :index="index+1")
    SpecTrait(v-for="item,index in spec.major_traits" :specId="spec.id" :trait="item" type="major" :index="index+1")
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
};
</script>
