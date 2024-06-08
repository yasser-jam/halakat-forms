<template>
  <base-dialog width="600" @save="save" @close="goBack">
    <template #title> معلومات الحلقة </template>

    <v-form>
      <v-row>
        <v-col cols="12">
          <base-label>اسم الحلقة</base-label>
          <v-text-field v-model="group.title" placeholder="حلقة الإمام النووي"></v-text-field>
        </v-col>

        <v-col>
          <base-label>اسم الأستاذ</base-label>
          <teacher-select v-model="group.teacherId"></teacher-select>
        </v-col>

        <v-col cols="12">
          <base-label>قوائم الطلاب</base-label>
          <student-select v-model="group.students"></student-select>
        </v-col>
      </v-row>
    </v-form>
  </base-dialog>
</template>


<script setup lang="ts">
const groupStore = useGroupStore()

const { group } = storeToRefs(groupStore)

const route = useRoute()

const groupId = route.params.group_id

const editMode = groupId != 'create'

const { pending } = useLazyAsyncData<Group>(() => {
  groupStore.reset()

  if (editMode) return groupStore.get(Number(groupId))

  return Promise.resolve({} as Group)

})

const save = async () => {
    const loading = ref<boolean>(false)
    
    try {
        await groupStore.create()
    
        await groupStore.list()
        
    } finally {
        loading.value = false

        goBack()
    }
}

const goBack = () => navigateTo('/halakat')
</script>