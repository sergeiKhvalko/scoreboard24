<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <UserAvatar class="mx-2" v-bind="props" v-if="isLoggedIn" size="32px" />

      <v-btn v-else variant="plain" :color="color" :to="$localePath('/login')">
        {{ $t("Login") }}
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
          :title="profile.username ? profile.username : profile.email"
          :subtitle="profile.id.slice(0, 8)"
        >
          <template v-slot:prepend>
            <UserAvatar v-bind="props" size="42px" />
          </template>
          <template v-slot:append>
            <v-btn
              :class="fav ? 'text-red' : ''"
              icon="mdi-heart"
              variant="text"
              @click="fav = !fav"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div class="mx-2 text-disabled text-subtitle-1">{{ $t("Theme") }}:</div>
      <AppThemeSelector variant="btn-toggle" />
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="text" @click="menu = false"> {{ $t("Cancel") }} </v-btn>
        <v-btn color="warning" variant="text" @click="logout">
          {{ $t("Logout") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script setup>
// import User from "@/models/User";
// const pb = usePocketbase();

const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});

const isLoggedIn = false;
// const isLoggedIn = computed(() => {
//   return pb.authStore.isValid;
// });

const profile = ref({
  id: "",
  username: "",
  email: "",
});
// const profile = computed(() => {
//   const user = useRepo(User).find(pb.authStore.model?.id);
//   return user ? user : pb.authStore.model;
// });

// async function logout() {
//   await pb.authStore.clear();
//   navigateTo("/login");
// }

const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);
</script>
