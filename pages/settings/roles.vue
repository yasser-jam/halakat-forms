<template>
    <v-card>
      <v-card-text>
        <div class="text-xl font-semibold mb-6">توزع الأدوار والصلاحيات</div>
        
        <v-data-table item-value="id" :headers :items="roles">
          <template #item.role="{ item }">
            {{ item.name }}
          </template>

          <template v-for="(permission, index) in permissions" v-slot:[`item.${permission.key}`]="{item}">
              <!-- {{ item.permissions.includes(headers[index + 1].key as any) }} -->
              <v-checkbox :model-value="hasAccess(item.id as number, permission)" color="primary" 
              @update:model-value="updatePermission(item.id!, permission.key)"></v-checkbox>
              <!-- {{ item.permissions }} -->
          </template>
        </v-data-table>

        <teleport to='#actions'>
          <v-btn :loading="status == 'pending'" @click="save">حفظ التغييرات</v-btn>
        </teleport>

      </v-card-text>
    </v-card>
  
  </template>
  
  <script setup lang="ts">
import { Permission } from '~/types';

  const campaignStore = useCampaignStore();
  const roleStore = useRoleStore()


  const { campaign } = storeToRefs(campaignStore);
  const { roles } = storeToRefs(roleStore)
  

  const { status } = useLazyAsyncData(() => roleStore.list())

  const hasAccess = (roleId: number, permission: any) => {
    const selectedRole = roles.value.find(item => item.id == roleId)

    return selectedRole?.permissions?.includes(permission.key)
  }

  const permissions : { name: string, key: Permission }[] = [
    {
      key: Permission.STUDENT_MANAGEMENT,
      name: 'إدارة الطلاب'
    },
    {
      key: Permission.TEACHER_MANAGEMENT,
      name: 'إدارة الأساتذة' 
    },
    {
      key: Permission.ROLES_MANAGEMENT,
      name: 'إدارة الأدوار'
    },
    {
      key: Permission.SAVING_SESSION_MANAGEMENT,
      name: 'إدارة التسميع'
    },
    {
      key: Permission.ATTENDANCE_MANAGEMENT,
      name: 'إدارة الحضور'
    },
    {
      key: Permission.CIRRUCULUM_MANAGEMENT,
      name: 'إدارة المناهج'
    },
    {
      key: Permission.SETTINGS_MANAGEMENT,
      name: 'إدارة الإعدادات'
    },
    {
      key: Permission.POINTS_MANAGEMENT,
      name: 'إدارة النقاط'
    },
    {
      key: Permission.AWARDS_MANAGEMENT,
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

  const updatePermission = (roleId: number, permission: Permission) => {
  const selectedRole = roles.value.find(role => role.id === roleId);
  if (!selectedRole) return;

  const hasAccess = selectedRole.permissions.includes(permission);

  if (hasAccess) {
    selectedRole.permissions = selectedRole.permissions.filter(p => p !== permission);
  } else {
    selectedRole.permissions.push(permission);
  }
};


const save = async () => {
  status.value = 'pending'

  try {

    await roleStore.bulkUpdate()

  } finally {
    status.value = 'idle'
  }
}

  </script>
  