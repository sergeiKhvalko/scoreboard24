<template>
  <span>
    <v-btn
      v-if="variantsIs('basic')"
      flat
      icon
      :color="color"
      @click="toggleTheme(['light', 'dark'])"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>

    <span v-if="variantsIs('btn-toggle')">
      <v-btn-toggle v-model="userTheme" :color="color" borderless>
        <v-btn @click="setAppTheme('light')" value="light">
          <span class="hidden-sm-and-down__" v-if="!noLabel">{{
            $t("light")
          }}</span>
          <v-icon end>mdi-white-balance-sunny</v-icon>
        </v-btn>

        <v-btn @click="setAppTheme('system')" value="system">
          <span class="hidden-sm-and-down__" v-if="!noLabel">{{
            $t("system")
          }}</span>
          <v-icon end> mdi-theme-light-dark </v-icon>
        </v-btn>

        <v-btn @click="setAppTheme('dark')" value="dark">
          <span class="hidden-sm-and-down__" v-if="!noLabel">{{
            $t("dark")
          }}</span>
          <v-icon end>mdi-weather-night</v-icon>
        </v-btn>
      </v-btn-toggle>
    </span>

    <v-speed-dial
      v-if="variantsIs('speed-dial')"
      location="bottom center"
      transition="fade-transition"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn flat icon v-bind="activatorProps">
          <v-icon :color="color">mdi-theme-light-dark</v-icon>
        </v-btn>
      </template>

      <v-btn
        key="light"
        icon="mdi-lightbulb"
        @click="setAppTheme('light')"
      ></v-btn>
      <v-btn
        key="system"
        icon="mdi-cogs"
        @click="setAppTheme('system')"
      ></v-btn>
      <v-btn
        key="dark"
        icon="mdi-weather-night"
        @click="setAppTheme('dark')"
      ></v-btn>
    </v-speed-dial>

    <v-menu
      v-if="variantsIs('menu')"
      v-model="menu"
      :close-on-content-click="true"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          :color="color"
          icon="mdi-theme-light-dark"
          v-bind="props"
        ></v-btn>
      </template>

      <v-card rounded="lg" min-width="120">
        <v-card-title class="text-subtitle-2 text-disabled"
          >Theme {{ userTheme }}</v-card-title
        >
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="theme in themes"
            :key="theme"
            @click="
              setAppTheme(theme);
              userTheme = theme;
            "
            :append-icon="theme === userTheme ? 'mdi-check' : ''"
          >
            <span class="text-capitalize">{{ $t(theme) }}</span>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </span>
</template>

<script setup>
import { useTheme } from "vuetify";

const menu = ref(false);
const theme = useTheme();

const themes = ref(["light", "system", "dark"]);

function getTheme() {
  const userTheme = localStorage.getItem("userTheme") || "system";

  switch (userTheme) {
    case "dark":
    case "light":
      return userTheme;
    default:
    case "system":
      return "system";
  }
}

const userTheme = ref("dark");
onBeforeMount(() => {
  userTheme.value = getTheme();
});

const props = defineProps({
  variant: {
    type: String,
    default: "hidden",
  },
  color: {
    type: String,
    default: "primary",
  },
  noLabel: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  setAppTheme(userTheme.value, false);

  // Listen for changes of the users system theme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      setAppTheme(e?.matches ? "dark" : "light", false);
    });
});

function variantsIs(variant) {
  return props.variant === variant;
}

function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}

function setAppTheme(t, save = true) {
  switch (t) {
    case "system":
      theme.global.name.value = getSystemTheme();
      if (save) localStorage.setItem("userTheme", "system");
      break;
    case "dark":
    case "light":
      if (save) localStorage.setItem("userTheme", t);
      theme.global.name.value = t;
      break;
  }

  useHead({
    meta: [
      {
        name: "theme-color",
        content: theme.global.name.value === "dark" ? "#0B121F" : "#FFFFFF",
      },
    ],
  });
}

function toggleTheme(themes) {
  const index = themes.indexOf(theme.global.name.value);
  const nextIndex = (index + 1) % themes.length;
  setAppTheme(themes[nextIndex]);
}
</script>
