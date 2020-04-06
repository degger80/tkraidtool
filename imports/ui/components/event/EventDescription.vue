<template lang="pug">
  a.event-description(:href="`/event/${item._id}`" target="_blank" :class="`${item.eventType}`")
    span.et {{item.eventType}}
    | {{item.title}} / {{item.ownerUsername}}
</template>
<script>
export default {
  props: ["item"],
};
</script>
