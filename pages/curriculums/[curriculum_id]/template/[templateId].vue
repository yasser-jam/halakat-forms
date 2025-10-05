<template>
  <base-dialog
    model-value="true"
    :title="`عقد قالب: ${
      template?.name || template?.curriculum?.name || 'غير محدد'
    }`"
    max-width="900"
    :loading
    @close="navigateTo(`/curriculums/${curriculumId}`)"
  >
    <div v-if="!nodes || nodes.length === 0" class="text-center my-8">
      <base-not-found>
        <template #action>
          <v-btn color="primary" variant="tonal" class="mt-4" @click="navigateToAddNode">
            <v-icon start>mdi-plus</v-icon>
            إضافة عقدة جديدة
          </v-btn>
        </template>
    </base-not-found>
    </div>

    <div v-else class="space-y-3">
      <!-- Add Node Button -->
      <div class="flex justify-end mb-4">
        <v-btn color="primary" variant="tonal" @click="navigateToAddNode">
          <v-icon start>mdi-plus</v-icon>
          إضافة عقدة جديدة
        </v-btn>
      </div>

      <template v-for="rootNode in hierarchicalNodes" :key="rootNode.id">
        <curriculum-template-node-card
          :node="rootNode"
          :level="0"
          @expand="handleExpand"
          @edit="handleEditNode"
          @delete="handleDeleteNode"
        />
      </template>
    </div>

    <template #actions>
      <v-spacer></v-spacer>
      <v-btn variant="plain" @click="navigateTo(`/curriculums/${curriculumId}`)"
        >إغلاق</v-btn
      >
    </template>

    <NuxtPage />
  </base-dialog>
</template>

<script setup lang="ts">
import type { CurriculumTemplate, CurriculumTemplateNode } from '~/types';

const route = useRoute();
const curriculumId = route.params.curriculum_id as string;
const templateId = Number(route.params.templateId);

const curriculumTemplateStore = useCurriculumTemplateStore();
const { nodes, curriculumTemplate: template } = storeToRefs(
  curriculumTemplateStore
);

const loading = ref(false);
const expandedNodes = ref<Set<number>>(new Set());

// Computed property to build hierarchical structure
const hierarchicalNodes = computed(() => {
  if (!nodes.value || nodes.value.length === 0) return [];

  const nodeMap = new Map<number, CurriculumTemplateNode>();
  const rootNodes: CurriculumTemplateNode[] = [];

  // Create a map of all nodes with children arrays
  nodes.value.forEach((node) => {
    nodeMap.set(node.id!, { ...node, children: [] });
  });

  // Build the hierarchy
  nodeMap.forEach((node) => {
    if (node.parent_id) {
      const parent = nodeMap.get(node.parent_id);
      if (parent) {
        parent.children!.push(node);
      }
    } else {
      rootNodes.push(node);
    }
  });

  // Sort by order_index
  const sortByOrder = (nodes: CurriculumTemplateNode[]) => {
    nodes.sort((a, b) => a.order_index - b.order_index);
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortByOrder(node.children);
      }
    });
  };

  sortByOrder(rootNodes);
  return rootNodes;
});

// Load template and nodes on mount
const { pending } = useLazyAsyncData(async () => {
  loading.value = true;
  try {
    // Load template details
    await curriculumTemplateStore.get(templateId);
    // Load nodes for this template
    await curriculumTemplateStore.getNodes(templateId);
  } finally {
    loading.value = false;
  }
});

const handleExpand = (nodeId: number) => {
  if (expandedNodes.value.has(nodeId)) {
    expandedNodes.value.delete(nodeId);
  } else {
    expandedNodes.value.add(nodeId);
  }
};

const navigateToAddNode = () => {
  navigateTo(`/curriculums/${curriculumId}/template/${templateId}/node/create`);
};

const handleEditNode = (node: CurriculumTemplateNode) => {
  navigateTo(
    `/curriculums/${curriculumId}/template/${templateId}/node/${node.id}`
  );
};

const handleDeleteNode = (node: CurriculumTemplateNode) => {
  // TODO: Implement delete confirmation dialog
  console.log('Delete node:', node);
};
</script>
