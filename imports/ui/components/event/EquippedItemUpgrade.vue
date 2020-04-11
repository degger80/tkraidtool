<template lang="pug">
  EquipedItem(:item="item" :align="align")
</template>
<script>
import EquipedItem from "/imports/ui/components/event/EquipedItem";
export default {
  props: ["align", "item"],
  components: {
    EquipedItem,
  },
};
</script>
