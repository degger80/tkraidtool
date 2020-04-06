<template lang="pug">
  .time-stamp(:style="`left: ${l}%; height: ${eventCount * 22 + 20} px`") {{fmt}}
</template>
<script>
export default {
  props: ["item", "minDate", "maxDate", "eventCount"],
  computed: {
    l() {
      let baseWidth = moment(this.maxDate).diff(moment(this.minDate)); // 100%;

      let left = moment(this.item.startDateTime).diff(moment(this.minDate));

      return (left * 100.0) / baseWidth;
    },
    fmt() {
      return moment(this.item.startDateTime).format("H-mm");
    },
  },
};
</script>
