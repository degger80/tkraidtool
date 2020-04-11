<template lang="pug">
.trait(:class="[{active: trait.active}, type, `t${index}`]")
  img(:src="`${assetsUrl}/t/${specId}/${trait.id}.png`")
  .overlay
  .trait-tooltip
    h5 {{trait.name}}
    p.mb-0 {{trait.description}}
</template>
<script>
export default {
  props: ["specId", "trait", "type", "index"],
  data() {
    return {
      assetsUrl: Meteor.settings.public.assetsUrl,
    };
  },
};
</script>
