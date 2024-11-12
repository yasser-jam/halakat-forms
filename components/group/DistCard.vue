<template>
  <v-card class="rounded-md">
    <v-card-text class="!p-0">
      <div
        class="flex items-center gap-4 bg-teal-50 text-primary font-semibold py-4 px-4"
        >

        <v-avatar
          icon="mdi-account-multiple"
          size="small"
          color="primary"
        ></v-avatar>

        <div class="flex justify-between items-center w-full">
          <div>
            <div class="text-lg">{{ group.title }}</div>
            
            <div class="text-sm text-gray font-semibold">{{ `${group.currentTeacher?.first_name} ${group.currentTeacher?.last_name}` }}</div>
          </div>

          <v-btn rounded size="small" variant="tonal" icon="mdi-plus"></v-btn>
        </div>

      </div>


      <div class="flex flex-col max-h-[400px] p-4 overflow-auto">

        <div class="flex flex-col gap-4">
          <student-inline-card v-for="student in group.students" :student />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>


<script setup lang="ts">

defineProps<{
  group: Group
}>()

</script>