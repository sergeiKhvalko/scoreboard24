<template>
  <div class="py-8 bg-block">
    <v-container>
      <h1>Football Betting Stats</h1>
      <p>Stats and Insight for Your Predictions</p>
    </v-container>
  </div>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="3"
      >
        <v-row>
          <v-col cols="12">
            <h2>Betting Stats</h2>
          </v-col>
        </v-row>
        <v-row class="py-3">
          <v-col
            cols="6"
            md="12"
            class="bg-block"
          >
            <v-btn variant="plain">Corners</v-btn>
          </v-col>
          <v-col
            cols="6"
            md="12"
            class="bg-block"
            ><v-btn variant="plain">Yellow cards</v-btn></v-col
          >
          <v-col
            cols="6"
            md="12"
            class="bg-block"
            ><v-btn variant="plain">BTTS</v-btn></v-col
          >
          <v-col
            cols="6"
            md="12"
            class="bg-block"
            ><v-btn variant="plain">Total over 2.5</v-btn></v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12">
            <h2>About Our Stats</h2>
            <p class="my-4">
              Identify teams based on their performance in key performance
              metrics like goals over 0.5, 1.5, 2.5, both teams scoring, and
              more. This approach is highly effective in discerning valuable
              opportunities. All information is derived from currently active
              leagues, with a minimum of six matches played by a team for
              inclusion in our data.
            </p>
            <p>
              Many individuals are experiencing setbacks due to poor strategic
              decisions and a lack of data. Essentially, people are making
              decisions blind. The information we offer on this page is designed
              to enhance your strategic approach. We handle the in-depth
              analysis, providing you with straightforward information that
              boosts your confidence in decision-making. The data showcased here
              is just an introduction to what FootyStats offers. Our platform
              features over 1,500 leagues, rich with detailed statistics on
              goals, corners, cards, players, and much more.
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="9"
      >
        <v-row>
          <v-col cols="12">
            <h2>Explore Our Stats</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            lg="6"
          >
            <Collection
              rounded="lg"
              icon="mdi-image"
              title="Corners"
              :items="leaguesWithCorners"
              item-image-key="logo"
              item-title-key=""
              titleStats="corners"
            />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <Collection
              rounded="lg"
              icon="mdi-image"
              title="Yellow Cards"
              :items="leaguesWithYellows"
              item-image-key="image"
              item-title-key=""
              titleStats="yellow cards"
            />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <Collection
              rounded="lg"
              icon="mdi-image"
              title="Total Over"
              :items="leaguesWithTotals"
              item-image-key="image"
              item-title-key=""
              titleStats="total over"
            />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <Collection
              rounded="lg"
              icon="mdi-image"
              title="Both Score"
              :items="leaguesWithBothScore"
              item-image-key="image"
              item-title-key=""
              titleStats="both score"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
//   const [coupons, offers] = await Promise.all([
//     $fetch('/cart/coupons'),
//     $fetch('/cart/offers')
//   ])

//   return { coupons, offers }
// })

const { data } = await useAsyncData("http://127.0.0.1:8000", async () => {
  const [
    rfplCorners,
    fnlCorners,
    eplCorners,
    chCorners,
    bundesCorners,
    bundes2Corners,
    seriaACorners,
    laLigaCorners,
    league1Corners,
    primeraCorners,
  ] = await Promise.all([
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=235"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=236"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=39"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=40"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=78"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=79"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=135"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=140"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=61"),
    $fetch("http://127.0.0.1:8000/corners?season=2024&league=94"),
  ]);

  return {
    rfplCorners,
    fnlCorners,
    eplCorners,
    chCorners,
    bundesCorners,
    bundes2Corners,
    seriaACorners,
    laLigaCorners,
    league1Corners,
    primeraCorners,
  };
});

const leaguesWithCorners = [];
const leaguesWithYellows = [];
const leaguesWithTotals = [];
const leaguesWithBothScore = [];
for (const league in data.value) {
  leaguesWithCorners.push(getStatsForLeague(data.value[league]));
  leaguesWithYellows.push(getStatsForLeague(data.value[league]));
  leaguesWithTotals.push(getStatsForLeague(data.value[league]));
  leaguesWithBothScore.push(getStatsForLeague(data.value[league]));
}
leaguesWithCorners.sort(
  (a, b) =>
    b["corners"]["average Per Match"] - a["corners"]["average Per Match"],
);
leaguesWithYellows.sort(
  (a, b) =>
    b["yellow cards"]["average Per Match"] -
    a["yellow cards"]["average Per Match"],
);
leaguesWithTotals.sort(
  (a, b) =>
    b["total over"]["average Per Match"] - a["total over"]["average Per Match"],
);
leaguesWithBothScore.sort(
  (a, b) =>
    b["both score"]["average Per Match"] - a["both score"]["average Per Match"],
);

function getStatsForLeague(data) {
  const matchweeks = data["response"][0]["league"]["matchweeks"];
  let totalCorners = 0;
  let totalYellowCards = 0;
  let totalOver = 0;

  const res = {
    name: data["response"][0]["league"]["name"],
    logo: data["response"][0]["league"]["logo"],
    corners: {
      "average Per Match": 0,
      "Matches Played": 0,
      "Highest in Single Match": 0,
      "Over 9.5 Corners": 0,
      "Over 10.5 Corners": 0,
      "Over 11.5 Corners": 0,
      "Over 12.5 Corners": 0,
    },
    "yellow cards": {
      "average Per Match": 0,
      "Matches Played": 0,
      "Highest in Single Match": 0,
      "Over 3.5 Yellow Cards": 0,
      "Over 4.5 Yellow Cards": 0,
      "Over 5.5 Yellow Cards": 0,
      "Over 6.5 Yellow Cards": 0,
    },
    "yellow cards": {
      "average Per Match": 0,
      "Matches Played": 0,
      "Highest in Single Match": 0,
      "Over 3.5 Yellow Cards": 0,
      "Over 4.5 Yellow Cards": 0,
      "Over 5.5 Yellow Cards": 0,
      "Over 6.5 Yellow Cards": 0,
    },
    "total over": {
      "average Per Match": 0,
      "Matches Played": 0,
      "Highest Total Over in Single Match": 0,
      "Over 1.5 Total": 0,
      "Over 2.5 Total": 0,
      "Over 3.5 Total": 0,
      "Over 4.5 Total": 0,
      "Over 5.5 Total": 0,
    },
    "both score": {
      "average Per Match": 0,
      "Matches Played": 0,
      "Both Score": 0,
    },
  };

  for (const matchweek in matchweeks) {
    for (const matches in matchweeks[matchweek]) {
      //corners
      res["corners"]["Matches Played"] += 1;
      const match = matchweeks[matchweek][matches];
      const currentMatchTotalCorners =
        match["homeCorners"] + match["awayCorners"];
      totalCorners += currentMatchTotalCorners;

      res["corners"]["average Per Match"] = (
        totalCorners / res["corners"]["Matches Played"]
      ).toFixed(2);

      if (currentMatchTotalCorners > 9.5)
        res["corners"]["Over 9.5 Corners"] += 1;
      if (currentMatchTotalCorners > 10.5)
        res["corners"]["Over 10.5 Corners"] += 1;
      if (currentMatchTotalCorners > 11.5)
        res["corners"]["Over 11.5 Corners"] += 1;
      if (currentMatchTotalCorners > 12.5)
        res["corners"]["Over 12.5 Corners"] += 1;

      res["corners"]["Highest in Single Match"] = Math.max(
        res["corners"]["Highest in Single Match"],
        currentMatchTotalCorners,
      );

      //yellow cards
      res["yellow cards"]["Matches Played"] += 1;
      const currentMatchTotalYellow =
        match["homeYellowCards"].length + match["awayYellowCards"].length;

      totalYellowCards += currentMatchTotalYellow;

      res["yellow cards"]["average Per Match"] = (
        totalYellowCards / res["yellow cards"]["Matches Played"]
      ).toFixed(2);

      if (currentMatchTotalYellow > 3.5)
        res["yellow cards"]["Over 3.5 Yellow Cards"] += 1;
      if (currentMatchTotalYellow > 4.5)
        res["yellow cards"]["Over 4.5 Yellow Cards"] += 1;
      if (currentMatchTotalYellow > 5.5)
        res["yellow cards"]["Over 5.5 Yellow Cards"] += 1;
      if (currentMatchTotalYellow > 6.5)
        res["yellow cards"]["Over 6.5 Yellow Cards"] += 1;

      res["yellow cards"]["Highest in Single Match"] = Math.max(
        res["yellow cards"]["Highest in Single Match"],
        currentMatchTotalYellow,
      );

      // total over
      res["total over"]["Matches Played"] += 1;
      const currentMatchTotalOver =
        match["homeGoals"].length + match["awayGoals"].length;

      totalOver += currentMatchTotalOver;

      res["total over"]["average Per Match"] = (
        totalOver / res["total over"]["Matches Played"]
      ).toFixed(2);

      if (currentMatchTotalOver > 1.5) res["total over"]["Over 1.5 Total"] += 1;
      if (currentMatchTotalOver > 2.5) res["total over"]["Over 2.5 Total"] += 1;
      if (currentMatchTotalOver > 3.5) res["total over"]["Over 3.5 Total"] += 1;
      if (currentMatchTotalOver > 4.5) res["total over"]["Over 4.5 Total"] += 1;
      if (currentMatchTotalOver > 5.5) res["total over"]["Over 5.5 Total"] += 1;

      res["total over"]["Highest Total Over in Single Match"] = Math.max(
        res["total over"]["Highest Total Over in Single Match"],
        currentMatchTotalOver,
      );

      // both score
      res["both score"]["Matches Played"] += 1;
      if (match["homeGoals"].length > 0 && match["awayGoals"].length > 0) {
        res["both score"]["Both Score"] += 1;
      }
      res["both score"]["average Per Match"] = (
        res["both score"]["Both Score"] / res["both score"]["Matches Played"]
      ).toFixed(2);
    }
  }

  return res;
}
</script>

<style>
.bg-block {
  /* background: #3e4c71; */
  background: #141f31;
}
</style>
