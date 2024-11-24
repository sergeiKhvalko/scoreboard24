<template>
  <v-container>
    <BreadCrumbs
      :items="[
        {
          title: 'Scoreboard',
          disabled: false,
          href: '/',
        },
        {
          title: 'Leagues',
          disabled: false,
          href: '/leagues?season=2024',
        },
        {
          title: league,
          disabled: true,
          href: `/${league}?season=${seasonId}&league=${leagueId}`,
        },
      ]"
    />
    <v-divider></v-divider>
    <div class="d-flex align-center py-2">
      <v-img
        :src="currentLeague.flag"
        width="30"
        class="flex-0-1"
      ></v-img>
      <h1 class="text-capitalize mx-4">{{ currentLeague.name }}</h1>
      <span
        v-if="$vuetify.display.smAndUp"
        class="text-h6 text-grey-darken-1 mt-2"
        >Table & Stats</span
      >
    </div>
    <v-divider></v-divider>
    <v-row no-gutters>
      <v-col
        cols="12"
        lg="5"
      >
        <v-card
          flat
          class="d-flex ga-4 my-4 bg-transparent"
        >
          <v-sheet
            :height="155"
            :width="155"
            border
            rounded
            class="pa-4"
          >
            <v-img :src="currentLeague.logo"></v-img>
          </v-sheet>
          <div class="d-flex ga-6">
            <div class="d-flex flex-column ga-2">
              <div>Nation</div>
              <div>Teams</div>
              <div class="my-2">Season</div>
              <div>Matches</div>
              <div>Progress</div>
            </div>
            <div class="d-flex flex-column ga-2">
              <div class="font-weight-bold">{{ currentLeague.country }}</div>
              <div class="font-weight-bold">
                {{ currentLeague.standings.length }}
              </div>
              <div>
                <v-select
                  v-model="selectSeason"
                  :items="availableSeasons"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                  hide-details
                ></v-select>
              </div>
              <div>
                <span class="font-weight-bold">
                  {{ currentLeague.allMatches.total }}/{{
                    (currentLeague.standings.length - 1) *
                    2 *
                    (currentLeague.standings.length / 2)
                  }}
                </span>
                Played
              </div>
              <div>
                <v-progress-linear
                  color="lime"
                  height="20"
                  :model-value="getCompletedProgress()"
                  striped
                ></v-progress-linear>
                <div class="mt-2">
                  <span class="font-weight-bold">
                    {{ getCompletedProgress() }}%
                  </span>
                  Completed
                </div>
              </div>
            </div>
          </div>
        </v-card>
        <div class="d-flex py-6">
          <v-btn-group
            variant="outlined"
            divided
          >
            <v-btn>Overview</v-btn>
            <v-btn>Fixtures</v-btn>
            <v-btn>Detailed Stats</v-btn>
          </v-btn-group>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="7"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  league: {
    type: String,
    required: true,
  },
  seasonId: {
    type: String,
    required: true,
  },
  leagueId: {
    type: String,
    required: true,
  },
});

const { data } = await useFetch(
  // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/standings?season=${seasonId}&league=${leagueId}`,
  `http://127.0.0.1:8000/standings?season=${props.seasonId}&league=${props.leagueId}`,
);
const currentLeague = data.value["response"][0]["league"];

function getCompletedProgress() {
  return Math.round(
    (currentLeague.allMatches.total /
      ((currentLeague.standings.length - 1) *
        2 *
        (currentLeague.standings.length / 2))) *
      100,
  );
}

const selectSeason = ref({
  title: `${props.seasonId}/${+props.seasonId.slice(-2) + 1}`,
  value: `${props.seasonId}`,
});
const availableSeasons = ref([
  { title: "2024/25", value: "2024" },
  { title: "2023/24", value: "2023" },
  { title: "2022/23", value: "2022" },
  { title: "2021/22", value: "2021" },
  { title: "2020/21", value: "2020" },
  { title: "2019/20", value: "2019" },
]);
</script>
