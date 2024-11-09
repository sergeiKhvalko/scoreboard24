<template>
  <v-app>
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)"
    />

    <v-app-bar flat>
      <v-app-bar-title>SCOREBOARD24</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn
        v-for="page in pages"
          :to="page.to"
          :key="page.title"
          :prepend-icon="page.icon"
        >
          {{ page.title }}
        </v-btn> -->

        <v-menu v-for="page in pages" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :prepend-icon="page.icon" :to="page.to">
              {{ page.title }}
            </v-btn>
          </template>

          <v-list v-if="page.title === 'Stats'">
            <v-list-item v-for="stat in page.stats" :key="stat">
              <v-list-item-title>
                <v-btn flat :to="`/stats/${stat}`">{{
                  stat
                }}</v-btn></v-list-item-title
              >
            </v-list-item>
          </v-list>

          <v-list v-if="page.title === 'Leagues'" min-width="100vw">
            <v-row no-gutters>
              <v-col cols="6">
                <v-list-item v-for="country in page.countries" :key="country">
                  <v-list-item-title>
                    <v-btn flat :to="`/leagues/${country}`">{{
                      country
                    }}</v-btn></v-list-item-title
                  >
                </v-list-item>
              </v-col>
              <v-col cols="6">
                <v-list-item v-for="league in page.leagues" :key="league">
                  <v-list-item-title>
                    <v-btn flat :to="`/leagues/${league}`">{{
                      league
                    }}</v-btn></v-list-item-title
                  >
                </v-list-item>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-divider class="mx-2 hidden-sm-and-down" vertical inset></v-divider>
      <!-- <LangSelector color="grey-darken-2" />
      <AppThemeSelector color="grey-darken-2" variant="menu" />
      <AppProfile /> -->
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
    stats: ["Corners", "Yellow cards", "BTTS", "Total over 2.5"],
  },
  {
    title: "Leagues",
    icon: "mdi-soccer",
    to: "/leagues",
    countries: [
      "Russia",
      "England",
      "Germany",
      "Italy",
      "Spain",
      "France",
      "Portugal",
    ],
    leagues: ["RFPL", "FNL", "EPL", "Bundesliga", "Seria A"],
  },
  {
    title: "Matches",
    icon: "mdi-soccer-field",
    to: "/matches",
  },
];
</script>
