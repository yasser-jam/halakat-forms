<template>
  <v-list>
    <v-list-item>
      <div class="flex flex-col items-center justify-center py-8">
        <v-avatar size="5rem" color="white">
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
        :active="isActive(item.key)"
      ></v-list-item>
    </v-list>
  </v-list>
</template>

<script setup lang="ts">
const route = useRoute();

const links = ref<
  {
    title: string;
    link: string;
    key: string;
    icon: string;
  }[]
>([
  {
    title: 'الرئيسية',
    link: `/`,
    key: 'home',
    icon: 'mdi-mosque',
  },
  {
    title: 'إدارة الحلقات',
    link: `/groups-management`,
    key: 'groups-management',
    icon: 'mdi-account-multiple',
  },
  {
    title: 'التفقد',
    link: `/attendance`,
    key: 'attendance',
    icon: 'mdi-check-outline',
  },
  {
    title: 'التسميع',
    link: `/savings`,
    key: 'savings',
    icon: 'mdi-book-outline',
  },
  {
    title: 'الطلاب',
    link: `/students`,
    key: 'students',
    icon: 'mdi-account-school-outline',
  },
  {
    title: 'الأستاتذة',
    link: `/teachers`,
    key: 'teachers',
    icon: 'mdi-human-male-board',
  },
  {
    title: 'سياسة الدورة',
    link: `/settings/general`,
    key: 'settings',
    icon: 'mdi-cog',
  },
]);

const isActive = (key: string) => {
  const route = useRoute()

  if (key == 'home' && route.fullPath == '/') return true

  return route.fullPath.includes(key)
}

</script>
