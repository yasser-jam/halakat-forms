<template>
    <v-card>
      <v-card-text>
        <div class="text-xl font-semibold mb-6">توزع الأدوار والصلاحيات</div>
        
        <v-data-table item-value="id" :headers :items="roles">
          <template #item.role="{ item }">
            {{ item.name }}
          </template>

          <template v-for="(permission, index) in permissions" v-slot:[`item.${permission.key}`]="{item}">
              <div>
                <!-- {{ item.permissions.includes(headers[index + 1].key as any) }} -->
                <v-checkbox :model-value="hasAccess(item.id as number, permission)" color="primary" @update:model-value=""></v-checkbox>
                <!-- {{ item.permissions }} -->
              </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  
  </template>
  
  <script setup lang="ts">
  const campaignStore = useCampaignStore();
  const roleStore = useRoleStore()


  const { campaign } = storeToRefs(campaignStore);
  const { roles } = storeToRefs(roleStore)
  

  const { status } = useLazyAsyncData(() => roleStore.list())

  const hasAccess = (roleId: number, permission: any) => {
    const selectedRole = roles.value.find(item => item.id == roleId)

    return selectedRole?.permissions?.includes(permission.key)
  }

  const permissions = [
    {
      key: 'STUDENT_MANAGEMENT',
      name: 'إدارة الطلاب'
    },
    {
      key: 'TEACHER_MANAGEMENT',
      name: 'إدارة الأساتذة' 
    },
    {
      key: 'ROLES_MANAGEMENT',
      name: 'إدارة الأدوار'
    },
    {
      key: 'SAVING_SESSION_MANAGEMENT',
      name: 'إدارة التسميع'
    },
    {
      key: 'ATTENDANCE_MANAGEMENT',
      name: 'إدارة الحضور'
    },
    {
      key: 'CIRRUCULUM_MANAGEMENT',
      name: 'إدارة المناهج'
    },
    {
      key: 'SETTINGS_MANAGEMENT',
      name: 'إدارة الإعدادات'
    },
    {
      key: 'POINTS_MANAGEMENT',
      name: 'إدارة النقاط'
    },
    {
      key: 'AWARDS_MANAGEMENT',
      name: 'إدارة الجوائز'
    }
  ]

  const headers = ref([
    {
      key: 'role',
      title: 'الدور',
      sortable: false
    }, 
    ...permissions.map(el => ({
      key: el.key,
      title: el.name,
      sortable: false
    }))
  ])

  const updatePermission = (role: Role, permission: any) => {
    
  }

  </script>
  