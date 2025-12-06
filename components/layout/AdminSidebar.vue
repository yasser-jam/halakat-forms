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

          <div class="font-semibold text-sm text-center text-white mt-6">نسخة مدير مؤسسة</div>
        </div>
      </v-list-item>
  
      <v-divider></v-divider>
  
      <v-list nav>
        <template v-for="item in links" :key="item.key">
          <!-- Regular menu item without children -->
          <v-list-item
            v-if="!item.children"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.link"
            :active="isActive(item.key)"
          ></v-list-item>
          
          <!-- Menu group with children -->
          <v-list-group
            v-else
            :value="item.key"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :prepend-icon="item.icon"
                :title="item.title"
              ></v-list-item>
            </template>
            
            <v-list-item
              v-for="child in item.children"
              :key="child.key"
              :prepend-icon="child.icon"
              :title="child.title"
              :to="child.link"
              :active="isActive(child.key)"
            ></v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-list>
  </template>
  
  <script setup lang="ts">
  const route = useRoute();
  
  interface MenuItem {
    title: string;
    link?: string;
    key: string;
    icon: string;
    children?: MenuItem[];
  }
  
  const links = ref<MenuItem[]>([
    {
      title: 'الرئيسية',
      link: `/`,
      key: 'home',
      icon: 'mdi-home',
    },
    // {
    //   title: 'إدارة الحلقات',
    //   link: `/groups-management`,
    //   key: 'groups-management',
    //   icon: 'mdi-account-multiple',
    // },
    // {
    //   title: 'التفقد',
    //   link: `/attendance`,
    //   key: 'attendance',
    //   icon: 'mdi-check-outline',
    // },
    // {
    //   title: 'التسميع',
    //   link: `/savings`,
    //   key: 'savings',
    //   icon: 'mdi-book-outline',
    // },
    
    {
      title: 'المساجد',
      link: `/admin/mosques`,
      key: 'mosques',
      icon: 'mdi-mosque',
    },
    {
      title: 'الطلاب',
      link: `/students`,
      key: 'students',
      icon: 'mdi-account-school-outline',
    },
    {
      title: 'الأساتذة',
      link: `/teachers`,
      key: 'teachers',
      icon: 'mdi-human-male-board',
    },
    {
      title: 'المناهج',
      key: 'curriculum',
      icon: 'mdi-book-multiple',
      children: [
        {
          title: 'المناهج',
          link: `/curriculums`,
          key: 'curriculums',
          icon: 'mdi-book-outline',
        },
        {
          title: 'الفئات',
          link: `/categories`,
          key: 'categories',
          icon: 'mdi-tag-multiple',
        },
      ],
    },
    // {
    //   title: 'سياسة الدورة',
    //   link: `/settings/general`,
    //   key: 'settings',
    //   icon: 'mdi-cog',
    // },
  ]);
  
  const isActive = (key: string) => {
    const route = useRoute()
  
    if (key == 'home' && route.fullPath == '/') return true
  
    return route.fullPath.includes(key)
  }
  
  </script>
  