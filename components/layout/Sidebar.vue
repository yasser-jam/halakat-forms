<template>
  <v-list>
    <v-list-item>
      <div class="flex flex-col items-center justify-center py-8">
        <v-responsive
          width="100"
          height="100"
          class="bg-gray-200 rounded-[3rem]"
        ></v-responsive>

        <div class="font-semibold text-sm text-center text-white mt-6">
          حلقات لإدارة الدورات القرآنية
        </div>
      </div>
    </v-list-item>
    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        v-for="item in links"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.link"
      ></v-list-item>
    </v-list>
  </v-list>
</template>

<script setup lang="ts">
const links = ref<
  {
    title: string;
    link: string;
    icon: string;
  }[]
>([
  {
    title: "الرئيسية",
    link: "/",
    icon: "mdi-mosque",
  },
  {
    title: "الطلاب",
    link: "/students",
    icon: "mdi-account-school",
  },
  {
    title: "الأستاتذة",
    link: "/teachers",
    icon: "mdi-human-male-board",
  },
  {
    title: "المسابقات",
    link: "/contests",
    icon: "mdi-trophy-award",
  },
]);
</script>
