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
              :items="leaguesItems"
              item-image-key="image"
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
              :items="leaguesItems"
              item-image-key="image"
              item-title-key=""
              titleStats="yellow cards"
            />
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <div>
              <h3>Top BTTS Leagues</h3>
            </div>
          </v-col>
          <v-col
            cols="12"
            lg="6"
          >
            <div>
              <h3>Top Over 2.5 Goals by Teams</h3>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const leaguesItems = [
  {
    id: 1,
    name: "Premier League",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 2,
    name: "Bundesliga",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 3,
    name: "Championship",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 4,
    name: "Seria A",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 5,
    name: "RFPL",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 6,
    name: "La Liga",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 7,
    name: "League 1",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 8,
    name: "Bundesliga 2",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
  {
    id: 9,
    name: "Primeira",
    image: "",
    corners: {
      "Matches Played": 14,
      "Highest in Single Match": 17,
      "Over 9.5 Corners": "86%",
      "Over 10.5 Corners": "71%",
      "Over 11.5 Corners": "64%",
    },
    "yellow cards": {
      "Matches Played": 14,
      "Highest in Single Match": 9,
      "Over 3.5 Yellow cards": "86%",
      "Over 4.5 Yellow cards": "71%",
      "Over 5.5 Yellow cards": "64%",
    },
  },
];
</script>

<style>
.bg-block {
  /* background: #3e4c71; */
  background: #141f31;
}
</style>
