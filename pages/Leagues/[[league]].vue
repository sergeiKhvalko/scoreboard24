<template>
  <League
    v-if="$route.params.league && $route.query.season && $route.query.league"
    :league="$route.params.league"
    :seasonId="$route.query.season"
    :leagueId="$route.query.league"
  />
  <AllLeagues
    v-else
    :seasonId="$route.query.season"
  />
</template>

<script setup></script>
