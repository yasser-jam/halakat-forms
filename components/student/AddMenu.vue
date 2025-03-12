<template>
  <v-menu v-model="model" width="500" location="bottom" :close-on-content-click="false" @update:model-value="selected = []">
    <template #activator="{ props }">
      <v-btn v-bind="props" class="mt-2">إضافة طالب</v-btn>
    </template>

    <v-card>
      <v-card-title>اختر طالب</v-card-title>

      <v-card-text>
        <v-autocomplete
          v-model="selected"
          multiple
          chips
          density="compact"
          placeholder="اختر طالب"
          :loading="status == 'pending'"
          :items="students"
          return-object
          :item-title="(val: any) => `${val.first_name} ${val.last_name}`"
        >
          <!-- <template #item="{ item }">
                <v-list-item @click="">
                    <div class="flex justify-between">
                        <div>{{ `${item.raw.first_name} ${item.raw.last_name}` }}</div>
    
                        <v-chip>{{ getClassName(item.raw.educational_class) }}</v-chip>
                    </div>
                </v-list-item>
            </template> -->
        </v-autocomplete>

        <v-btn block @click="select">إضافة</v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const studentStore = useStudentStore();

const { students } = storeToRefs(studentStore);

const { status } = useLazyAsyncData('list_students', () => studentStore.list());

const selected = ref([])

const model = defineModel({ default: false })
const emit = defineEmits(['update:model-value', 'select'])

const select = () => {

    emit('select', selected.value)

    model.value = false
    // emit('update:model-value', false)

}
</script>
