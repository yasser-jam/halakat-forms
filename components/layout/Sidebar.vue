<template>
  <v-list>
    <v-list-item>
      <div class="flex flex-col items-center justify-center py-8">
        <v-avatar size="5rem"  color="white">
          <v-icon size="3rem" color="primary">mdi-mosque</v-icon>
        </v-avatar>

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

const route = useRoute()


const links = ref<
  {
    title: string;
    link: string;
    icon: string;
  }[]
>([
  {
    title: "الرئيسية",
    link: `/dashboard`,
    icon: "mdi-mosque",
  },
  {
    title: "إدارة الحلقات",
    link: `/groups-management`,
    icon: "mdi-account-multiple",
  },
  {
    title: "التفقد",
    link: `/attendance`,
    icon: "mdi-check-outline",
  },
  {
    title: "الطلاب",
    link: `/students`,
    icon: "mdi-account-school",
  },
  {
    title: "الأستاتذة",
    link: `/teachers`,
    icon: "mdi-human-male-board",
  },
  {
    title: "سياسة الدورة",
    link: `/settings/general`,
    icon: "mdi-cog",
  },
]);
</script>
