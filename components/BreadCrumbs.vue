<template>
  <v-breadcrumbs :items="items">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: [], required: false },
});
</script>

<style scoped>
.v-breadcrumbs {
  padding-left: 0;
  padding-right: 0;
}
</style>
