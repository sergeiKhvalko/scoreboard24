<template>
  <v-menu v-model="menu" :close-on-content-click="true" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="type === 'icon'"
        :color="color"
        icon="mdi-translate"
        v-bind="props"
      ></v-btn>
      <v-btn
        v-if="type === 'btn'"
        append-icon="mdi-translate"
        :color="color"
        :text="$t(text)"
        :variant="variant"
        :size="size"
        v-bind="props"
      ></v-btn>
    </template>

    <v-card rounded="lg" min-width="120">
      <v-card-title class="text-subtitle-2 text-disabled">{{
        $t("Languages")
      }}</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="loc in locales"
          :key="loc.code"
          :to="switchLocalePath(loc.code)"
          :append-icon="locale === loc.code ? 'mdi-check' : ''"
        >
          {{ $t(loc.code) }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script setup>
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

const { locale, setLocale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const props = defineProps({
  color: String,
  type: {
    type: String,
    default: "icon",
  },
  text: {
    type: String,
    default: "Change",
  },
  variant: {
    type: String,
    default: "outlined",
  },
  size: {
    type: String,
    default: "default",
  },
});
</script>
