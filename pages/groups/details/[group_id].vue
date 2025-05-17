<template>
  <v-container>
    <!-- Loading State -->
    <base-loader v-if="pending" />

    <template v-else>
      <!-- Group Title Card -->
      <v-card class="mb-4">
        <v-card-text>
          <div class="text-xl font-semibold">{{ group?.title }}</div>
          <div class="text-sm text-gray-500">{{ group?.class }}</div>
        </v-card-text>
      </v-card>

      <!-- Teacher and Curriculum Row -->
      <v-row class="mb-4">
        <!-- Teacher Card (7 columns) -->
        <v-col cols="12" md="7">
          <v-card>
            <v-card-text>
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <v-img
                    v-if="group?.currentTeacher?.image_url"
                    :src="group.currentTeacher.image_url"
                    :alt="group.currentTeacher.first_name"
                    class="w-full h-full rounded-full object-cover"
                  />
                  <v-icon v-else icon="mdi-account" class="text-gray-400" />
                </div>
                
                <div class="flex-grow">
                  <div class="text-sm font-medium">
                    {{ group?.currentTeacher ? `${group.currentTeacher.first_name} ${group.currentTeacher.last_name}` : 'No Teacher Assigned' }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ group?.currentTeacher?.mobile_phone_number || 'No Phone Number' }}
                  </div>
                </div>

                <v-chip
                  color="warning"
                  size="small"
                  class="ml-2"
                >
                  delayed
                </v-chip>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Curriculum Card (5 columns) -->
        <v-col cols="12" md="5">
          <v-card>
            <v-card-text>
              <div class="text-sm font-medium">مناهج</div>
              <div class="text-xs text-gray-500 mt-2">No curriculum assigned yet</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Students List Card -->
      <v-card>
        <v-card-title class="!text-base">طلاب الحلقة</v-card-title>
        <v-card-text>
          <v-row>
            <v-col v-for="student in group?.students" :key="student.id" cols="12" md="6" lg="4">
              <v-card density="compact">
                <v-card-text class="pa-2">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <v-img
                        v-if="student.image_url"
                        :src="student.image_url"
                        :alt="student.first_name"
                        class="w-full h-full rounded-full object-cover"
                      />
                      <v-icon v-else icon="mdi-account" class="text-gray-400" />
                    </div>
                    
                    <div class="flex-grow">
                      <div class="text-sm font-medium">
                        {{ student.first_name }} {{ student.last_name }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ student.student_mobile_number || 'No Phone Number' }}
                      </div>
                    </div>

                    <v-chip
                      color="warning"
                      size="small"
                      class="ml-2"
                    >
                      delayed
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import type { Group } from '~/types';

const route = useRoute();
const groupStore = useGroupStore();

const { group } = storeToRefs(groupStore);

const { pending } = useLazyAsyncData<Group>(() => 
  groupStore.get(Number(route.params.group_id))
);
</script>

<style scoped>
.student-card {
  transition: all 0.2s ease;
}

.student-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style> 