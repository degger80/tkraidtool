<template lang="pug">
.trait(:class="[{active: isActive}, type, `t${index}`]")
  img(:src="trait.icon")
  .overlay
  .trait-tooltip
    h5 {{trait.name}}
    p.mb-0 {{description}}
</template>
<script>
export default {
  props: ["traitId", "isActive", "type", "index"],
  data() {
    return {
      assetsUrl: Meteor.settings.public.assetsUrl,
    };
  },
  computed: {
    description() {
      let d = "";
      if (this.trait.description) {
        d = this.trait.description.replace(/<(?:.|\n)*?>/gm, " ");
      }
      return d;
    },
  },
  meteor: {
    trait() {
      const sp = CollectionGWTraits.findOne({ id: this.traitId });
      if (!sp) {
        console.log("трейт не найден в базе - запрос за кешем");
        Meteor.call("updateTraitCache", this.traitId);
      }
      return sp;
    },
  },
};
</script>
