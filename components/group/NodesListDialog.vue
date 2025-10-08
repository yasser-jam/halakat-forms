<template>
  <v-dialog
    v-model="isOpen"
    max-width="900"
    scrollable
    persistent
  >
    <v-card class="h-screen max-h-[90vh]">
      <!-- Dialog Header -->
      <v-card-title class="bg-primary text-white py-4 px-6 sticky top-0 z-10">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <v-icon size="28">mdi-book-open-page-variant</v-icon>
            <div>
              <div class="text-xl font-bold">دروس المنهج</div>
              <div v-if="template" class="text-sm opacity-90 mt-1">
                {{ template.name }}
              </div>
            </div>
          </div>
          
          <v-btn
            icon="mdi-close"
            variant="text"
            color="white"
            @click="closeDialog"
          />
        </div>
      </v-card-title>

      <!-- Dialog Content -->
      <v-card-text class="pa-0">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <v-progress-circular 
            indeterminate 
            color="primary" 
            size="64"
          />
          <div class="mt-4 text-xl font-semibold text-gray-600">
            جاري تحميل الدروس...
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!nodes || nodes.length === 0" class="text-center py-12">
          <v-icon size="80" color="grey-lighten-1">mdi-book-open-blank-variant</v-icon>
          <div class="text-xl font-semibold text-gray-600 mt-4">
            لا توجد دروس في هذا المنهج
          </div>
          <div class="text-sm text-gray-500 mt-2">
            يمكنك إضافة دروس جديدة من خلال إدارة المناهج
          </div>
        </div>

        <!-- Nodes Content -->
        <div v-else class="pa-4">
          <!-- Stats Header -->
          <div class="mb-6">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-card variant="tonal" color="primary" class="text-center pa-3">
                  <div class="text-2xl font-bold text-primary">{{ totalNodes }}</div>
                  <div class="text-sm text-gray-600">إجمالي الدروس</div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card variant="tonal" color="success" class="text-center pa-3">
                  <div class="text-2xl font-bold text-success">{{ completedNodes }}</div>
                  <div class="text-sm text-gray-600">مكتملة</div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card variant="tonal" color="warning" class="text-center pa-3">
                  <div class="text-2xl font-bold text-warning">{{ inProgressNodes }}</div>
                  <div class="text-sm text-gray-600">قيد التنفيذ</div>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card variant="tonal" color="grey" class="text-center pa-3">
                  <div class="text-2xl font-bold text-grey">{{ plannedNodes }}</div>
                  <div class="text-sm text-gray-600">مخططة</div>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Filters -->
          <div class="mb-4">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="searchQuery"
                  placeholder="البحث في الدروس..."
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  density="compact"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedNodeType"
                  :items="nodeTypeOptions"
                  item-title="text"
                  item-value="value"
                  placeholder="نوع الدرس"
                  variant="outlined"
                  density="compact"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="selectedStatus"
                  :items="statusOptions"
                  item-title="text"
                  item-value="value"
                  placeholder="الحالة"
                  variant="outlined"
                  density="compact"
                  clearable
                />
              </v-col>
            </v-row>
          </div>

          <!-- Nodes List -->
          <div class="space-y-3">
            <group-node-card
              v-for="node in filteredNodes"
              :key="node.id"
              :node="node"
            />
          </div>

          <!-- No Results -->
          <div v-if="filteredNodes.length === 0 && nodes.length > 0" class="text-center py-8">
            <v-icon size="60" color="grey-lighten-1">mdi-filter-remove</v-icon>
            <div class="text-lg font-semibold text-gray-600 mt-3">
              لا توجد نتائج مطابقة للبحث
            </div>
            <div class="text-sm text-gray-500 mt-1">
              جرب تغيير معايير البحث أو المرشحات
            </div>
          </div>
        </div>
      </v-card-text>

      <!-- Dialog Actions -->
      <v-card-actions class="bg-grey-lighten-4 px-6 py-4">
        <v-spacer />
        <v-btn
          color="grey"
          variant="text"
          @click="closeDialog"
        >
          إغلاق
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { CurriculumTemplate, CurriculumTemplateNode, NodeStatus } from '~/types';

interface Props {
  modelValue: boolean;
  template?: CurriculumTemplate | null;
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Store
const curriculumTemplateStore = useCurriculumTemplateStore();

// Reactive data
const nodes = ref<CurriculumTemplateNode[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const selectedNodeType = ref<string | null>(null);
const selectedStatus = ref<NodeStatus | null>(null);

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Filter options
const nodeTypeOptions = [
  { text: 'فصل', value: 'chapter' },
  { text: 'قسم', value: 'section' },
  { text: 'درس', value: 'lesson' },
  { text: 'نشاط', value: 'activity' },
  { text: 'تقييم', value: 'assessment' },
  { text: 'مراجعة', value: 'review' },
];

const statusOptions = [
  { text: 'مخطط', value: 'PLANNED' as NodeStatus },
  { text: 'قيد التنفيذ', value: 'IN_PROGRESS' as NodeStatus },
  { text: 'مكتمل', value: 'COMPLETED' as NodeStatus },
  { text: 'متخطى', value: 'SKIPPED' as NodeStatus },
];

// Filtered nodes
const filteredNodes = computed(() => {
  let filtered = [...nodes.value];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(node => 
      node.name.toLowerCase().includes(query) ||
      (node.description && node.description.toLowerCase().includes(query))
    );
  }

  // Node type filter
  if (selectedNodeType.value) {
    filtered = filtered.filter(node => node.node_type === selectedNodeType.value);
  }

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(node => node.status === selectedStatus.value);
  }

  // Sort by order_index
  return filtered.sort((a, b) => a.order_index - b.order_index);
});

// Statistics
const totalNodes = computed(() => nodes.value.length);

const completedNodes = computed(() => 
  nodes.value.filter(node => node.status === 'COMPLETED').length
);

const inProgressNodes = computed(() => 
  nodes.value.filter(node => node.status === 'IN_PROGRESS').length
);

const plannedNodes = computed(() => 
  nodes.value.filter(node => node.status === 'PLANNED').length
);

// Methods
const loadNodes = async () => {
  if (!props.template?.id) return;
  
  loading.value = true;
  try {
    nodes.value = await curriculumTemplateStore.getNodes(props.template.id);
  } catch (error) {
    console.error('Error loading nodes:', error);
    nodes.value = [];
  } finally {
    loading.value = false;
  }
};

const closeDialog = () => {
  isOpen.value = false;
  // Reset filters when closing
  searchQuery.value = '';
  selectedNodeType.value = null;
  selectedStatus.value = null;
};

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue && props.template) {
    loadNodes();
  }
});

watch(() => props.template, (newTemplate) => {
  if (newTemplate && props.modelValue) {
    loadNodes();
  }
});
</script>

<style scoped>
.space-y-3 > * + * {
  margin-top: 0.75rem;
}
</style>
