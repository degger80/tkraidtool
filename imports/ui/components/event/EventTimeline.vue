<template lang="pug">
  .event-timeline
    a.line(
      :href="`/event/${item._id}`"
      target="_blank"
      :style="`left: ${dims.l}%; width: ${dims.w}%`"
      ) {{item.duration}}ч - {{item.title}}
</template>
<script>
export default {
  props: ["item", "minDate", "maxDate"],
  computed: {
    dims() {
      let baseWidth = moment(this.maxDate).diff(moment(this.minDate)); // 100%;
      let left = moment(this.item.startDateTime).diff(moment(this.minDate));
      let right = moment(this.item.startDateTime)
        .add(this.item.duration, "hours")
        .diff(moment(this.minDate));

      let width = ((right - left) * 100.0) / baseWidth;
      let offset = (left * 100.0) / baseWidth;
      return {
        l: offset,
        w: width,
      };
    },
  },
  methods: {
    fmt(date) {
      return moment(this.item.startDateTime).format("H-mm");
    },
  },
};
</script>
