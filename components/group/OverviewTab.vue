<template>
  <div class="pa-4">
    <div v-if="loading" class="text-center py-8">
      <base-loader />
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <base-not-found>
        <template #subtitle>
          <div class="text-xl font-semibold mt-2 text-red-600">حدث خطأ في تحميل بيانات الحلقة</div>
          <div class="text-gray-600 mt-2">{{ error }}</div>
        </template>
        
        <template #action>
          <v-btn
            color="primary"
            class="mt-4"
            prepend-icon="mdi-refresh"
            @click="loadGroupData"
          >
            إعادة المحاولة
          </v-btn>
        </template>
      </base-not-found>
    </div>

    <div v-else-if="groupData">
      <!-- Group Information Card -->
      <v-card class="mb-6">
        <v-card-title class="text-xl font-bold text-primary">
          <v-icon start color="primary">mdi-account-group</v-icon>
          معلومات الحلقة
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-sm text-gray-600 mb-1">اسم الحلقة</div>
                <div class="text-lg font-semibold">{{ groupData.title }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="mb-4">
                <div class="text-sm text-gray-600 mb-1">الصف</div>
                <div class="text-lg font-semibold">{{ groupData.class ? getClassName(Number(groupData.class)) : 'غير محدد' }}</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Current Teacher Card -->
      <v-card v-if="groupData.currentTeacher" class="mb-6">
        <v-card-title class="text-xl font-bold text-success">
          <v-icon start color="success">mdi-account-tie</v-icon>
          المعلم الحالي
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <div class="text-center mb-4">
                <v-avatar size="80" class="mb-2" color="success" variant="tonal">
                  <v-img 
                    v-if="groupData.currentTeacher.image_url" 
                    :src="groupData.currentTeacher.image_url"
                    alt="صورة المعلم"
                  />
                  <v-icon v-else size="40" color="success">mdi-account</v-icon>
                </v-avatar>
                <div class="text-lg font-semibold">
                  {{ groupData.currentTeacher.first_name }} {{ groupData.currentTeacher.last_name }}
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">رقم الجوال</div>
                    <div class="font-medium">{{ groupData.currentTeacher.mobile_phone_number }}</div>
                  </div>
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">المستوى التعليمي</div>
                    <div class="font-medium">{{ groupData.currentTeacher.educational_level }}</div>
                  </div>
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">الموهبة الخاصة</div>
                    <div class="font-medium">{{ groupData.currentTeacher.special_talent || 'غير محدد' }}</div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">الأجزاء المحفوظة</div>
                    <v-chip color="success" variant="tonal">
                      {{ formatParts(groupData.currentTeacher.preserved_parts) }}
                    </v-chip>
                  </div>
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">الأجزاء المختبرة</div>
                    <v-chip color="warning" variant="tonal">
                      {{ formatParts(groupData.currentTeacher.parts_tested_by_the_endowments) }}
                    </v-chip>
                  </div>
                  <div class="mb-3">
                    <div class="text-sm text-gray-600 mb-1">مجاز</div>
                    <v-chip 
                      :color="groupData.currentTeacher.is_mojaz ? 'success' : 'warning'"
                      size="small"
                    >
                      {{ groupData.currentTeacher.is_mojaz ? 'نعم' : 'لا' }}
                    </v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Students List -->
      <div>
        <v-card-title class="text-xl font-bold text-info">
          <v-icon start color="info">mdi-account-multiple</v-icon>
          قائمة الطلاب ({{ groupData.students?.length || 0 }})
        </v-card-title>
        <v-card-text>
          <div v-if="!groupData.students || groupData.students.length === 0" class="text-center py-8">
            <v-icon size="64" color="info">mdi-account-multiple-outline</v-icon>
            <div class="text-lg font-semibold mt-2 text-info">لا يوجد طلاب في هذه الحلقة</div>
          </div>
          
          <v-row v-else>
            <v-col 
              v-for="student in groupData.students" 
              :key="student.id"
              cols="12" 
              md="6" 
              lg="4"
            >
              <v-card class="h-100" elevation="2">
                <v-card-text>
                  <div class="text-center mb-3">
                    <v-avatar size="60" class="mb-2" color="info" variant="tonal">
                      <v-img 
                        v-if="student.image_url" 
                        :src="student.image_url"
                        alt="صورة الطالب"
                      />
                      <v-icon v-else size="30" color="info">mdi-account</v-icon>
                    </v-avatar>
                    <div class="text-lg font-semibold">
                      {{ student.first_name }} {{ student.last_name }}
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ student.birth_date ? getAge(student.birth_date) : 'غير محدد' }} سنة
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">الصف:</span>
                      <v-chip size="small" color="primary" variant="tonal">
                        {{ student.educational_class ? getClassName(Number(student.educational_class)) : 'غير محدد' }}
                      </v-chip>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">المدرسة:</span>
                      <span class="text-sm font-medium">{{ student.school || 'غير محدد' }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">الأجزاء المحفوظة:</span>
                      <v-chip size="small" color="success" variant="tonal">
                        {{ student.preserved_parts }}
                      </v-chip>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">الأجزاء المختبرة:</span>
                      <v-chip size="small" color="warning" variant="tonal">
                        {{ student.parts_tested_by_the_endowments }}
                      </v-chip>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">الموهبة:</span>
                      <v-chip size="small" color="secondary" variant="tonal">
                        {{ student.special_talent || 'غير محدد' }}
                      </v-chip>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Group } from '~/types';
import { getClassName } from '~/composables/getClass';
import { getAge } from '~/composables/getAge';
import { getEducationalLevel } from '~/composables/getEducationalLevel';

// Props
interface Props {
  groupId: number;
}

const props = defineProps<Props>();

// Stores
const groupStore = useGroupStore();

// State
const loading = ref(true);
const error = ref<string | null>(null);
const groupData = ref<Group | null>(null);

// Methods
const loadGroupData = async () => {
  if (!props.groupId) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const response = await groupStore.get(props.groupId);
    groupData.value = response;
  } catch (err) {
    error.value = 'فشل في تحميل بيانات الحلقة';
    console.error('Error loading group data:', err);
  } finally {
    loading.value = false;
  }
};

// Helper functions
const formatParts = (parts: string | string[]): string => {
  if (Array.isArray(parts)) {
    return parts.join(', ');
  }
  if (typeof parts === 'string') {
    try {
      const parsed = JSON.parse(parts);
      if (Array.isArray(parsed)) {
        return parsed.join(', ');
      }
    } catch {
      // If parsing fails, return as is
    }
  }
  return parts || 'غير محدد';
};

// Load data on mount
onMounted(() => {
  loadGroupData();
});

// Watch for prop changes
watch(() => props.groupId, () => {
  loadGroupData();
}, { immediate: false });
</script>
