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

const campaignId = route.params.campaign_id

const baseRoute = `/campaign/${campaignId}`

const links = ref<
  {
    title: string;
    link: string;
    icon: string;
  }[]
>([
  {
    title: "الرئيسية",
    link: `/${baseRoute}/dashboard`,
    icon: "mdi-mosque",
  },
  {
    title: "إدارة الحلقات",
    link: `/${baseRoute}/groups`,
    icon: "mdi-account-multiple",
  },
  {
    title: "الطلاب",
    link: `/${baseRoute}/students`,
    icon: "mdi-account-school",
  },
  {
    title: "الأستاتذة",
    link: `/${baseRoute}/teachers`,
    icon: "mdi-human-male-board",
  },
  {
    title: "سياسة الدورة",
    link: `/${baseRoute}/settings`,
    icon: "mdi-cog",
  },
]);
</script>
