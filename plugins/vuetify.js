import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VNumberInput } from "vuetify/labs/VNumberInput";

// function getTheme() {
//   const userTheme = localStorage.getItem("userTheme") || "system";

//   switch (userTheme) {
//     case "dark":
//     case "light":
//       return userTheme;
//     default:
//     case "system":
//       return window.matchMedia &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
//   }
// }

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      VNumberInput,
    },
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            dark: "#0B121F",
            // primary: "#aef321",
            // background: "#FFFFFF",
            // surface: "#FFFFFF",
            // "surface-bright": "#FFFFFF",
            // "surface-light": "#EEEEEE",
            // "surface-variant": "#424242",
            // "on-surface-variant": "#EEEEEE",
            // "primary-darken-1": "#1F5592",
            // secondary: "#48A9A6",
            // "secondary-darken-1": "#018786",
            // error: "#B00020",
            // info: "#2196F3",
            // success: "#4CAF50",
            // warning: "#FB8C00",
          },
        },
      },
    },
    // theme: {
    //   dark: true,
    //   themes: {
    //     dark: {
    //       primary: "#ff595e",
    //       secondary: "#ffca3a",
    //       accent: "#8ac926",
    //       error: "#B00020",
    //       info: "#2196F3",
    //       success: "#4CAF50",
    //       warning: "#FB8C00",
    //     },
    //   },
    // },
  });
  nuxtApp.vueApp.use(vuetify);
});
