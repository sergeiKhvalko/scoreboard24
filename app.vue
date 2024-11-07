<template>
  <v-app>
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)"
    />

    <v-app-bar>
      <v-app-bar-title>SCOREBOARD24</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>

    <BottomNav :pages="pages" class="hidden-md-and-up" />
  </v-app>
</template>

<script setup>
const pages = [
  {
    title: "Stats",
    icon: "mdi-chart-bar",
    to: "/stats",
  },
  {
    title: "Leagues",
    icon: "mdi-soccer",
    to: "/leagues",
  },
  {
    title: "Matches",
    icon: "mdi-soccer-field",
    to: "/matches",
  },
];
</script>
