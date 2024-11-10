<template>
  <v-avatar size="32px">
    <v-img
      v-if="profile?.avatar?.length > 4"
      alt="User Avatar"
      v-ripple
      :src="profile.avatar"
      cover
      style="cursor: pointer"
    ></v-img>
    <v-btn
      v-else
      icon="mdi-account-circle-outline"
      variant="text"
      :color="color"
    />
  </v-avatar>
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

// const profile = computed(() => {
//   const user = useRepo(User).find(pb.authStore.model?.id);
//   return user ? user : pb.authStore.model;
// });
</script>
