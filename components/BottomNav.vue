<template>
  <v-bottom-navigation color="indigo" grow height="66">
    <v-btn v-for="item in pages" :key="item.to" :to="item.to">
      <v-icon>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
const props = defineProps({
  pages: {
    type: Array,
    required: true,
    default: [],
  },
});
</script>
