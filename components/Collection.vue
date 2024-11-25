<template>
  <v-card>
    <v-toolbar v-if="!noToolbar">
      <v-icon
        v-if="icon"
        :style="`view-transition-name: collection-icon`"
        class="ml-4"
      >
        {{ icon }}
      </v-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-slide-x-reverse-transition>
        <v-text-field
          v-if="showSearch"
          ref="searchField"
          v-model="search"
          density="comfortable"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          style="max-width: 300px"
          variant="solo"
          clearable
          hide-details
          class="mx-4"
          append-icon="mdi-close"
          @blur="(e) => (showSearch = e.target.value ? true : false)"
          @click:append="showSearch = false"
        >
        </v-text-field>
      </v-slide-x-reverse-transition>
      <v-btn
        v-if="!showSearch"
        icon
        @click="
          showSearch = true;
          $nextTick(() => $refs.searchField.focus());
        "
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-data-iterator
      :items="items"
      :search="search"
      :page="page"
      :items-per-page="tableItemsPerPage"
    >
      <template v-slot:default="{ items }">
        <v-expansion-panels v-for="(item, i) in items">
          <v-expansion-panel class="font-weight-bold">
            <v-expansion-panel-title class="d-flex justify-space-between"
              ><div class="d-flex ga-2 align-center">
                <span class="text-h6">{{ i + 1 }}.</span>
                <v-img
                  :src="item.raw.logo"
                  width="30"
                ></v-img>
                <h2 class="ml-4">{{ item.raw.name }}</h2>
              </div>
              <v-spacer></v-spacer>
              <v-chip class="mx-4 small-bubble">
                <h3 class="text-h5 font-weight-bold text-green-accent-2">
                  {{ item.raw[titleStats]["average Per Match"] }}
                </h3>
                /Match
              </v-chip>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="collection-text">
              <div class="py-4">
                Key Stats for
                <v-btn
                  variant="text"
                  append-icon="mdi-arrow-right-circle-outline"
                  class="text-teal-accent-2"
                  >{{ item.raw.name }}</v-btn
                >
              </div>
              <div
                v-for="(value, key, i) in item.raw[titleStats]"
                class="d-flex justify-space-between py-4"
                :class="{
                  'border-b-thin':
                    i !== Object.keys(item.raw[titleStats]).length - 1,
                }"
              >
                <div>{{ key }}</div>
                <div class="d-flex">
                  <div>{{ value }}</div>
                  <div
                    v-if="key.startsWith('Over') || key.startsWith('Both')"
                    class="ml-2"
                  >
                    ({{
                      (
                        (value / item.raw[titleStats]["Matches Played"]) *
                        100
                      ).toFixed(2)
                    }}%)
                  </div>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-divider></v-divider>
        </v-expansion-panels>
      </template>

      <template v-slot:footer="{ pageCount, prevPage, nextPage }">
        <v-pagination
          v-if="pageCount > 1"
          v-model="page"
          :length="pageCount"
          :total-visible="7"
          @click__="setAttr('page', page)"
          rounded="circle"
          class="ma-8"
        >
        </v-pagination>
        <v-footer
          v-if="!noToolbar"
          absolute
          class="justify-space-between text-body-2"
        >
          Total: {{ items.length }}

          <div>Page {{ page }} of {{ pageCount }}</div>
        </v-footer>
      </template>
    </v-data-iterator>

    <!-- <v-data-table
      v-model:search="search"
      :items="items"
      :search="search"
      :page="page"
      :items-per-page="tableItemsPerPage"
      :headers="[
        {
          title: '',
          align: 'end',
          key: 'id',
        },
      ]"
    >
      <template v-slot:item.image="{ item }">
        <v-card class="my-2 mx-auto" elevation="0" rounded max-width="80">
          <v-img
            :src="getImageSrc(item)"
            :gradient="
              item?.image ? 'to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)' : ''
            "
            :style="`view-transition-name: img-${item.id}`"
            cover
          ></v-img>
        </v-card>
      </template>
    </v-data-table> -->
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const display = useDisplay();
const search = shallowRef("");
const showSearch = ref(false);

const route = useRoute();
const router = useRouter();

const page = ref(1);

const props = defineProps({
  items: {
    type: Array,
    required: false,
    default: [],
  },
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  titleStats: {
    type: String,
    required: true,
  },
  itemImageKey: {
    type: String,
    required: false,
    default: "image",
  },
  itemTitleKey: {
    type: String,
    required: false,
    default: "title",
  },
  noToolbar: {
    type: Boolean,
    default: false,
  },
});

const tableItemsPerPage = computed(() => {
  switch (display.name.value) {
    case "xs":
      return 3;
    case "sm":
      return 6;
    case "md":
      return 6;
    case "lg":
      return 6;
    case "xl":
      return 10;
    case "xxl":
      return 10;
    default:
      return 5;
  }
});

function getImageSrc(item) {
  if (item[props.itemImageKey]) {
    if (Array.isArray(item[props.itemImageKey])) {
      return item[props.itemImageKey][0]
        ? item[props.itemImageKey][0]
        : "/no-image.svg";
    }
    return item[props.itemImageKey]
      ? item[props.itemImageKey]
      : "/no-image.svg";
  } else {
    return "/no-image.svg";
  }
}

function setAttr(key, value, q = {}) {
  const query = { ...route.query, ...q };
  query[key] = value;
  router.push({ query });
}
</script>

<style></style>
