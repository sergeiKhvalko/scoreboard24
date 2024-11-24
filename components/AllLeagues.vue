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
          disabled: true,
          href: '/leagues',
        },
      ]"
    />
    <v-divider></v-divider>

    <div class="d-flex align-center py-2">
      <!-- <v-img
        :src="currentLeague.flag"
        width="30"
        class="flex-0-1"
      ></v-img> -->
      <h1 class="text-capitalize mx-4">Football Leagues</h1>
      <span
        v-if="$vuetify.display.smAndUp"
        class="text-h6 text-grey-darken-1 mt-2"
        >Info & Stats</span
      >
    </div>
    <v-divider></v-divider>

    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-card
          v-for="item in data"
          rounded="lg"
          class="mt-8 pa-4"
        >
          <v-row>
            <v-col
              cols="3"
              sm="5"
              md="2"
            >
              <v-img
                :src="item['response'][0]['league']['logo']"
                width="150"
                height="150"
                contain
              ></v-img>
            </v-col>
            <v-col
              cols="5"
              md="3"
            >
              <v-btn
                variant="text"
                :size="$vuetify.display.mdAndUp ? 'x-large' : 'large'"
                class="mb-4"
                >{{ item["response"][0]["league"]["name"] }}</v-btn
              >
              <div class="pl-6 d-flex">
                <v-img
                  :src="item['response'][0]['league']['flag']"
                  width="30"
                  height="30"
                  class="flex-sm-0-1"
                ></v-img>
                <span class="ml-4 text-h6">{{
                  item["response"][0]["league"]["country"]
                }}</span>
              </div>
            </v-col>
            <v-divider
              v-if="$vuetify.display.mdAndUp"
              inset
              vertical
            ></v-divider>
            <v-col
              cols="5"
              md="3"
            >
              <div class="h-100 d-flex align-center">
                <div class="w-50 text-center">
                  <v-chip class="small-bubble pa-6 mb-2">
                    <h3 class="text-h4 font-weight-bold text-green-accent-2">
                      {{
                        (
                          item["response"][0]["league"]["totalGoals"] /
                          item["response"][0]["league"]["totalMatches"]
                        ).toFixed(2)
                      }}
                    </h3>
                  </v-chip>
                  <p>Goals/Match</p>
                </div>
                <div class="w-50 text-center">
                  <v-chip class="small-bubble pa-6 mb-2">
                    <h3 class="text-h4 font-weight-bold text-green-accent-2">
                      {{
                        Math.round(
                          (item["response"][0]["league"]["totalOver2.5"] /
                            item["response"][0]["league"]["totalMatches"]) *
                            100,
                        )
                      }}%
                    </h3>
                  </v-chip>
                  <p>Over 2.5</p>
                </div>
              </div>
            </v-col>
            <v-col
              cols="5"
              md="3"
            >
              <div
                class="h-100 d-flex flex-column justify-center align-center px-4"
              >
                <v-progress-linear
                  color="lime"
                  height="20"
                  :model-value="
                    getCompletedProgress(item['response'][0]['league'])
                  "
                  striped
                ></v-progress-linear>
                <div class="mt-4">
                  <span class="font-weight-bold">
                    {{ getCompletedProgress(item["response"][0]["league"]) }}%
                  </span>
                  Played
                </div>
              </div>
            </v-col>
            <!-- <v-col
              cols="4"
              md="1"
              ><v-btn icon
                ><v-icon>"mdi-arrow-right-bold"</v-icon></v-btn
              ></v-col
            > -->
          </v-row>
          <v-expansion-panels>
            <v-expansion-panel class="font-weight-bold">
              <v-expansion-panel-title class="mt-4">
                More Info
              </v-expansion-panel-title>
              <v-expansion-panel-text class="collection-text">
                <div class="py-4">
                  Key Stats for
                  <p>
                    the left column shows how many times such an event occurred
                    in one round
                  </p>
                  <p>
                    the right column shows how many such tours there were during
                    the entire season
                  </p>
                </div>
                <v-expansion-panels
                  v-for="(value, key) in getInfoForAllMatchweeks(
                    item['response'][0]['league']['matchweeksInfo'],
                  )"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-title class="mt-4">
                      {{ key }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="collection-text">
                      <!-- {{ value }} -->
                      <div
                        v-for="(numberOfMatchweeks, numberOfTimes, i) in value"
                        class="d-flex justify-space-between py-4"
                        :class="{
                          'border-b-thin': i !== Object.keys(value).length - 1,
                        }"
                      >
                        <div>
                          {{
                            numberOfTimes == 0
                              ? `Not a single match in matchweek`
                              : numberOfTimes < 4
                              ? `Only ${numberOfTimes} ${
                                  numberOfTimes === 1 ? "match" : "matches"
                                } in matchweek`
                              : `${numberOfTimes} matches in matchweek`
                          }}
                        </div>
                        <div>
                          {{ numberOfMatchweeks }}
                          {{
                            numberOfMatchweeks > 1 ? "Matchweeks" : "Matchweek"
                          }}
                          all season
                        </div>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-divider></v-divider>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const props = defineProps({
  seasonId: {
    type: String,
    required: true,
  },
});

const { data } = await useAsyncData("http://127.0.0.1:8000", async () => {
  const [
    rfplInfo,
    fnlInfo,
    eplInfo,
    chInfo,
    bundesInfo,
    bundes2Info,
    seriaAInfo,
    laLigaInfo,
    league1Info,
    primeraInfo,
  ] = await Promise.all([
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=235`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=235`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=236`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=236`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=39`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=39`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=40`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=40`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=78`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=78`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=79`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=79`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=135`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=135`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=140`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=140`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=61`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=61`,
    ),
    $fetch(
      // `https://sergeikhvalko-football-app-back-5e0a.twc1.net/matchweeks-info?season=${seasonId}&league=94`,
      `http://127.0.0.1:8000/matchweeks-info?season=${props.seasonId}&league=94`,
    ),
  ]);

  return {
    rfplInfo,
    fnlInfo,
    eplInfo,
    chInfo,
    bundesInfo,
    bundes2Info,
    seriaAInfo,
    laLigaInfo,
    league1Info,
    primeraInfo,
  };
});

function getCompletedProgress(league) {
  return Math.round(
    (league["totalMatches"] /
      (league["matchweeksInfo"][1]["count"] *
        2 *
        (league["matchweeksInfo"][1]["count"] * 2 - 1))) *
      100,
  );
}

function getInfoForAllMatchweeks(matchweeks) {
  console.log(matchweeks);

  const res = {};

  for (const key in matchweeks) {
    if (!res["home team win"]) res["home team win"] = {};
    if (!res["home team win"][matchweeks[key]["home team win"]])
      res["home team win"][matchweeks[key]["home team win"]] = 0;
    res["home team win"][matchweeks[key]["home team win"]] += 1;

    if (!res["away team win"]) res["away team win"] = {};
    if (!res["away team win"][matchweeks[key]["away team win"]])
      res["away team win"][matchweeks[key]["away team win"]] = 0;
    res["away team win"][matchweeks[key]["away team win"]] += 1;

    if (!res["draw"]) res["draw"] = {};
    if (!res["draw"][matchweeks[key]["draw"]])
      res["draw"][matchweeks[key]["draw"]] = 0;
    res["draw"][matchweeks[key]["draw"]] += 1;

    if (!res["favorite win"]) res["favorite win"] = {};
    if (!res["favorite win"][matchweeks[key]["favorite win"]])
      res["favorite win"][matchweeks[key]["favorite win"]] = 0;
    res["favorite win"][matchweeks[key]["favorite win"]] += 1;

    if (!res["favorite lost"]) res["favorite lost"] = {};
    if (!res["favorite lost"][matchweeks[key]["favorite lost"]])
      res["favorite lost"][matchweeks[key]["favorite lost"]] = 0;
    res["favorite lost"][matchweeks[key]["favorite lost"]] += 1;

    if (!res["both score yes"]) res["both score yes"] = {};
    if (!res["both score yes"][matchweeks[key]["both score yes"]])
      res["both score yes"][matchweeks[key]["both score yes"]] = 0;
    res["both score yes"][matchweeks[key]["both score yes"]] += 1;

    if (!res["both score no"]) res["both score no"] = {};
    if (!res["both score no"][matchweeks[key]["both score no"]])
      res["both score no"][matchweeks[key]["both score no"]] = 0;
    res["both score no"][matchweeks[key]["both score no"]] += 1;

    if (!res["total over 2.5"]) res["total over 2.5"] = {};
    if (!res["total over 2.5"][matchweeks[key]["total over 2.5"]])
      res["total over 2.5"][matchweeks[key]["total over 2.5"]] = 0;
    res["total over 2.5"][matchweeks[key]["total over 2.5"]] += 1;

    if (!res["total over 3.5"]) res["total over 3.5"] = {};
    if (!res["total over 3.5"][matchweeks[key]["total over 3.5"]])
      res["total over 3.5"][matchweeks[key]["total over 3.5"]] = 0;
    res["total over 3.5"][matchweeks[key]["total over 3.5"]] += 1;

    if (!res["total over 4.5"]) res["total over 4.5"] = {};
    if (!res["total over 4.5"][matchweeks[key]["total over 4.5"]])
      res["total over 4.5"][matchweeks[key]["total over 4.5"]] = 0;
    res["total over 4.5"][matchweeks[key]["total over 4.5"]] += 1;

    if (!res["total under 1.5"]) res["total under 1.5"] = {};
    if (!res["total under 1.5"][matchweeks[key]["total under 1.5"]])
      res["total under 1.5"][matchweeks[key]["total under 1.5"]] = 0;
    res["total under 1.5"][matchweeks[key]["total under 1.5"]] += 1;

    if (!res["total under 2.5"]) res["total under 2.5"] = {};
    if (!res["total under 2.5"][matchweeks[key]["total under 2.5"]])
      res["total under 2.5"][matchweeks[key]["total under 2.5"]] = 0;
    res["total under 2.5"][matchweeks[key]["total under 2.5"]] += 1;

    if (!res["home team corners win"]) res["home team corners win"] = {};
    if (!res["home team corners win"][matchweeks[key]["home team corners win"]])
      res["home team corners win"][
        matchweeks[key]["home team corners win"]
      ] = 0;
    res["home team corners win"][matchweeks[key]["home team corners win"]] += 1;

    if (!res["away team corners win"]) res["away team corners win"] = {};
    if (!res["away team corners win"][matchweeks[key]["away team corners win"]])
      res["away team corners win"][
        matchweeks[key]["away team corners win"]
      ] = 0;
    res["away team corners win"][matchweeks[key]["away team corners win"]] += 1;

    if (!res["corners over 9.5"]) res["corners over 9.5"] = {};
    if (!res["corners over 9.5"][matchweeks[key]["corners over 9.5"]])
      res["corners over 9.5"][matchweeks[key]["corners over 9.5"]] = 0;
    res["corners over 9.5"][matchweeks[key]["corners over 9.5"]] += 1;

    if (!res["corners over 10.5"]) res["corners over 10.5"] = {};
    if (!res["corners over 10.5"][matchweeks[key]["corners over 10.5"]])
      res["corners over 10.5"][matchweeks[key]["corners over 10.5"]] = 0;
    res["corners over 10.5"][matchweeks[key]["corners over 10.5"]] += 1;

    if (!res["corners over 11.5"]) res["corners over 11.5"] = {};
    if (!res["corners over 11.5"][matchweeks[key]["corners over 11.5"]])
      res["corners over 11.5"][matchweeks[key]["corners over 11.5"]] = 0;
    res["corners over 11.5"][matchweeks[key]["corners over 11.5"]] += 1;

    if (!res["corners over 12.5"]) res["corners over 12.5"] = {};
    if (!res["corners over 12.5"][matchweeks[key]["corners over 12.5"]])
      res["corners over 12.5"][matchweeks[key]["corners over 12.5"]] = 0;
    res["corners over 12.5"][matchweeks[key]["corners over 12.5"]] += 1;

    if (!res["corners over 13.5"]) res["corners over 13.5"] = {};
    if (!res["corners over 13.5"][matchweeks[key]["corners over 13.5"]])
      res["corners over 13.5"][matchweeks[key]["corners over 13.5"]] = 0;
    res["corners over 13.5"][matchweeks[key]["corners over 13.5"]] += 1;

    if (!res["corners under 8.5"]) res["corners under 8.5"] = {};
    if (!res["corners under 8.5"][matchweeks[key]["corners under 8.5"]])
      res["corners under 8.5"][matchweeks[key]["corners under 8.5"]] = 0;
    res["corners under 8.5"][matchweeks[key]["corners under 8.5"]] += 1;

    if (!res["corners under 9.5"]) res["corners under 9.5"] = {};
    if (!res["corners under 9.5"][matchweeks[key]["corners under 9.5"]])
      res["corners under 9.5"][matchweeks[key]["corners under 9.5"]] = 0;
    res["corners under 9.5"][matchweeks[key]["corners under 9.5"]] += 1;

    if (!res["home team yellow cards win"])
      res["home team yellow cards win"] = {};
    if (
      !res["home team yellow cards win"][
        matchweeks[key]["home team yellow cards win"]
      ]
    )
      res["home team yellow cards win"][
        matchweeks[key]["home team yellow cards win"]
      ] = 0;
    res["home team yellow cards win"][
      matchweeks[key]["home team yellow cards win"]
    ] += 1;

    if (!res["away team yellow cards win"])
      res["away team yellow cards win"] = {};
    if (
      !res["away team yellow cards win"][
        matchweeks[key]["away team yellow cards win"]
      ]
    )
      res["away team yellow cards win"][
        matchweeks[key]["away team yellow cards win"]
      ] = 0;
    res["away team yellow cards win"][
      matchweeks[key]["away team yellow cards win"]
    ] += 1;

    if (!res["yellow cards over 3.5"]) res["yellow cards over 3.5"] = {};
    if (!res["yellow cards over 3.5"][matchweeks[key]["yellow cards over 3.5"]])
      res["yellow cards over 3.5"][
        matchweeks[key]["yellow cards over 3.5"]
      ] = 0;
    res["yellow cards over 3.5"][matchweeks[key]["yellow cards over 3.5"]] += 1;

    if (!res["yellow cards over 4.5"]) res["yellow cards over 4.5"] = {};
    if (!res["yellow cards over 4.5"][matchweeks[key]["yellow cards over 4.5"]])
      res["yellow cards over 4.5"][
        matchweeks[key]["yellow cards over 4.5"]
      ] = 0;
    res["yellow cards over 4.5"][matchweeks[key]["yellow cards over 4.5"]] += 1;

    if (!res["yellow cards over 5.5"]) res["yellow cards over 5.5"] = {};
    if (!res["yellow cards over 5.5"][matchweeks[key]["yellow cards over 5.5"]])
      res["yellow cards over 5.5"][
        matchweeks[key]["yellow cards over 5.5"]
      ] = 0;
    res["yellow cards over 5.5"][matchweeks[key]["yellow cards over 5.5"]] += 1;

    if (!res["yellow cards over 6.5"]) res["yellow cards over 6.5"] = {};
    if (!res["yellow cards over 6.5"][matchweeks[key]["yellow cards over 6.5"]])
      res["yellow cards over 6.5"][
        matchweeks[key]["yellow cards over 6.5"]
      ] = 0;
    res["yellow cards over 6.5"][matchweeks[key]["yellow cards over 6.5"]] += 1;

    if (!res["yellow cards over 7.5"]) res["yellow cards over 7.5"] = {};
    if (!res["yellow cards over 7.5"][matchweeks[key]["yellow cards over 7.5"]])
      res["yellow cards over 7.5"][
        matchweeks[key]["yellow cards over 7.5"]
      ] = 0;
    res["yellow cards over 7.5"][matchweeks[key]["yellow cards over 7.5"]] += 1;

    if (!res["yellow cards under 2.5"]) res["yellow cards under 2.5"] = {};
    if (
      !res["yellow cards under 2.5"][matchweeks[key]["yellow cards under 2.5"]]
    )
      res["yellow cards under 2.5"][
        matchweeks[key]["yellow cards under 2.5"]
      ] = 0;
    res["yellow cards under 2.5"][
      matchweeks[key]["yellow cards under 2.5"]
    ] += 1;

    if (!res["yellow cards under 3.5"]) res["yellow cards under 3.5"] = {};
    if (
      !res["yellow cards under 3.5"][matchweeks[key]["yellow cards under 3.5"]]
    )
      res["yellow cards under 3.5"][
        matchweeks[key]["yellow cards under 3.5"]
      ] = 0;
    res["yellow cards under 3.5"][
      matchweeks[key]["yellow cards under 3.5"]
    ] += 1;

    if (!res["productive half 1 over 2"]) res["productive half 1 over 2"] = {};
    if (
      !res["productive half 1 over 2"][
        matchweeks[key]["productive half 1 over 2"]
      ]
    )
      res["productive half 1 over 2"][
        matchweeks[key]["productive half 1 over 2"]
      ] = 0;
    res["productive half 1 over 2"][
      matchweeks[key]["productive half 1 over 2"]
    ] += 1;

    if (!res["productive half 1 equal 2"])
      res["productive half 1 equal 2"] = {};
    if (
      !res["productive half 1 equal 2"][
        matchweeks[key]["productive half 1 equal 2"]
      ]
    )
      res["productive half 1 equal 2"][
        matchweeks[key]["productive half 1 equal 2"]
      ] = 0;
    res["productive half 1 equal 2"][
      matchweeks[key]["productive half 1 equal 2"]
    ] += 1;

    if (!res["productive half 2 over 1"]) res["productive half 2 over 1"] = {};
    if (
      !res["productive half 2 over 1"][
        matchweeks[key]["productive half 2 over 1"]
      ]
    )
      res["productive half 2 over 1"][
        matchweeks[key]["productive half 2 over 1"]
      ] = 0;
    res["productive half 2 over 1"][
      matchweeks[key]["productive half 2 over 1"]
    ] += 1;
  }

  return res;
}
</script>
