<template lang="pug">
.character-build  
  .specialisations
    SpecializationBox(v-for="item in character.specs" :spec="item")
</template>
<script>
import SpecializationBox from "/imports/ui/components/event/SpecializationBox";
export default {
  props: ["character", "eventType"],
  components: { SpecializationBox },
};
</script>
