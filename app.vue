<template>
  <v-app>
    <NuxtLoadingIndicator
      color="repeating-linear-gradient(to right,var(--c-primary) 0%,var(--c-primary-active) 100%)"
    />

    <v-app-bar flat>
      <v-app-bar-title>
        <v-btn
          variant="plain"
          size="x-large"
          to="/"
          >SCOREBOARD<span class="text-red-accent-2">24</span></v-btn
        >
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu
          v-for="page in pages"
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :prepend-icon="page.icon"
              :to="page.to"
            >
              {{ $t(page.title) }}
            </v-btn>
          </template>

          <v-list v-if="page.title === 'Stats'">
            <v-list-item
              v-for="stat in page.stats"
              :key="stat"
            >
              <v-list-item-title>
                <v-btn
                  flat
                  :to="`/stats/${stat}`"
                  >{{ stat }}</v-btn
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>

          <v-list
            v-if="page.title === 'Leagues'"
            min-width="100vw"
          >
            <v-row no-gutters>
              <v-col
                cols="3"
                offset="3"
                lg="2"
                offset-lg="4"
              >
                <v-card
                  class="overflow-y-auto"
                  height="300"
                >
                  <v-list-item
                    v-for="country in page.countries"
                    :key="country"
                  >
                    <v-list-item-title>
                      <v-btn
                        flat
                        :to="`/leagues/${country}`"
                        >{{ country }}</v-btn
                      ></v-list-item-title
                    >
                    <v-divider></v-divider>
                  </v-list-item>
                </v-card>
              </v-col>
              <v-col
                cols="6"
                lg="4"
              >
                <v-row no-gutters>
                  <v-col
                    cols="6"
                    v-for="league in page.leagues"
                    :key="league"
                  >
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn
                          flat
                          :to="league.link"
                          >{{ league.name }}</v-btn
                        ></v-list-item-title
                      >
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-divider
        class="mx-2 hidden-sm-and-down"
        vertical
        inset
      ></v-divider>
      <LangSelector color="grey-darken-2" />

      <ThemeSelector
        color="grey-darken-2"
        variant="menu"
      />
      <UserProfile />
    </v-app-bar>

    <v-main>
      <NuxtPage />
    </v-main>

    <BottomNav
      :pages="pages"
      class="hidden-md-and-up"
    />
  </v-app>
</template>

<script setup>
import LangSelector from "./i18n/components/LangSelector.vue";

const pages = [
  {
    title: "Stats",
    icon: "mdi-chart-bar",
    to: "/stats?season=2024",
    stats: ["Corners", "Yellow cards", "BTTS", "Total over 2.5"],
  },
  {
    title: "Leagues",
    icon: "mdi-soccer",
    to: "/leagues?season=2024",
    countries: [
      "Russia",
      "England",
      "Germany",
      "Italy",
      "Spain",
      "France",
      "Portugal",
      "Netherlands",
      "Switzerland",
    ],
    leagues: [
      {
        name: "RPL",
        link: "/leagues/rfpl?season=2024&league=235",
      },
      {
        name: "FNL",
        link: "/leagues/russia?season=2024&league=236",
      },
      {
        name: "Premier League",
        link: "/leagues/premier-league?season=2024&league=39",
      },
    ],
  },
  {
    title: "Matches",
    icon: "mdi-soccer-field",
    to: "/matches",
  },
];
</script>

<style lang="scss">
.v-theme--dark {
  --v-theme-background: 11, 18, 31;
  --v-theme-surface: 20, 31, 49;
  --v-theme-surface-light: 20, 31, 49;
}

.red24 {
  color: #d72638;
  font-weight: bold;
}
</style>
