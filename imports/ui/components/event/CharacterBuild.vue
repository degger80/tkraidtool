<template lang="pug">
.character-build  
  SkillBox(:skills="character.skills")
  .specialisations
    SpecializationBox(v-for="item in character.specs" :spec="item")
  
</template>
<script>
import SpecializationBox from "/imports/ui/components/event/SpecializationBox";
import SkillBox from "/imports/ui/components/event/SkillBox";
export default {
  props: ["character", "eventType"],
  components: { SpecializationBox, SkillBox },
};
</script>
