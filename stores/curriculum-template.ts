import type { CurriculumTemplate, CurriculumTemplateNode, Header, PaginationOptions, NodeStatus } from "~/types";

export const useCurriculumTemplateStore = defineStore("curriculumTemplate", () => {
  const toasterStore = useToasterStore();

  const curriculumTemplate = ref<CurriculumTemplate>(initCurriculumTemplate());
  const curriculumTemplates = ref<CurriculumTemplate[]>([]);
  const curriculumTemplatesTotalCount = ref<number>(0);

  // For managing nodes
  const selectedNode = ref<CurriculumTemplateNode>(initCurriculumTemplateNode());
  const nodes = ref<CurriculumTemplateNode[]>([]);

  const paginationOptions = ref<PaginationOptions>(initPagination());

  const headers = ref<Header[]>([
    {
      title: "اسم القالب",
      key: "name",
      sortable: false,
    },
    {
      title: "المنهج",
      key: "curriculum.name",
      sortable: false,
    },
    {
      title: "الحملة",
      key: "campaign.name",
      sortable: false,
    },
    {
      title: "عدد العقد",
      key: "nodes_count",
      sortable: false,
    },
    {
      title: "تاريخ الإنشاء",
      key: "created_at",
      sortable: false,
    },
    {
      title: "",
      key: "actions",
      sortable: false,
    },
  ]);

  const nodeHeaders = ref<Header[]>([
    {
      title: "الاسم",
      key: "name",
      sortable: false,
    },
    {
      title: "النوع",
      key: "node_type",
      sortable: false,
    },
    {
      title: "الترتيب",
      key: "order_index",
      sortable: true,
    },
    {
      title: "عدد الدروس المقدر",
      key: "estimated_lessons_count",
      sortable: false,
    },
    {
      title: "المدة المقدرة (ساعة)",
      key: "estimated_duration_minutes",
      sortable: false,
    },
    {
      title: "نطاق الدرس",
      key: "lesson_span",
      sortable: false,
    },
    {
      title: "الحالة",
      key: "status",
      sortable: false,
    },
    {
      title: "",
      key: "actions",
      sortable: false,
    },
  ]);

  const search = ref<string>('');

  // Reset functions
  const reset = () => (curriculumTemplate.value = initCurriculumTemplate());
  const resetNode = () => (selectedNode.value = initCurriculumTemplateNode());

  // Curriculum Template CRUD operations
  const get = async (id: number): Promise<CurriculumTemplate> => {
    curriculumTemplate.value = await api(`curriculum-template/${id}`);
    return curriculumTemplate.value;
  };

  const list = async (campaignId?: number): Promise<CurriculumTemplate[]> => {
    const endpoint = campaignId 
      ? `curriculum-template?campaign_id=${campaignId}` 
      : "curriculum-template";
    
    const res = await api(endpoint);
    curriculumTemplatesTotalCount.value = res.length;
    curriculumTemplates.value = res;
    return curriculumTemplates.value;
  };

  const create = async () => {
    const campaignId = useCookie('campaign_id')
    await api("curriculum-template", {
      method: "POST",
      body: {
        ...curriculumTemplate.value,
        nodes: undefined,
        campaign_id: Number(campaignId.value),
      },
    });

    toasterStore.success('تم إضافة قالب المنهج بنجاح');
  };

  const update = async (id: number) => {
    await api(`curriculum-template/${id}`, {
      method: "PUT",
      body: {
        ...curriculumTemplate.value,
        // Remove nodes from update payload to avoid conflicts
        nodes: undefined,
      },
    });

    toasterStore.success('تم تعديل قالب المنهج بنجاح');
  };

  const remove = async (id: number) => {
    await api(`curriculum-template/${id}`, {
      method: 'DELETE'
    });

    toasterStore.success('تم حذف قالب المنهج بنجاح');
  };

  // Node management operations
  const getNodes = async (templateId: number): Promise<CurriculumTemplateNode[]> => {
    nodes.value = await api(`curriculum-template/${templateId}/nodes`);
    return nodes.value;
  };

  const getNode = async (templateId: number, nodeId: number): Promise<CurriculumTemplateNode> => {
    selectedNode.value = await api(`curriculum-template/${templateId}/node/${nodeId}`);
    return selectedNode.value;
  };

  const createNode = async (templateId: number) => {
    await api(`curriculum-template/node`, {
      method: "POST",
      body: {
        ...selectedNode.value,
        children: undefined,
        template_id: templateId,
      },
    });

    toasterStore.success('تم إضافة العقدة بنجاح');
  };

  const updateNode = async (templateId: number, nodeId: number) => {
    await api(`curriculum-template/${templateId}/node/${nodeId}`, {
      method: "PUT",
      body: {
        ...selectedNode.value,
        // Remove children from update payload to avoid conflicts
        children: undefined,
      },
    });

    toasterStore.success('تم تعديل العقدة بنجاح');
  };

  const removeNode = async (templateId: number, nodeId: number) => {
    await api(`curriculum-template/${templateId}/node/${nodeId}`, {
      method: 'DELETE'
    });

    toasterStore.success('تم حذف العقدة بنجاح');
  };

  const updateNodeStatus = async (templateId: number, nodeId: number, status: NodeStatus) => {
    await api(`curriculum-template/${templateId}/node/${nodeId}/status`, {
      method: "PUT",
      body: { status },
    });

    toasterStore.success('تم تحديث حالة العقدة بنجاح');
  };

  const reorderNodes = async (templateId: number, nodeUpdates: { id: number; order_index: number }[]) => {
    await api(`curriculum-template/${templateId}/node/reorder`, {
      method: "PUT",
      body: { updates: nodeUpdates },
    });

    toasterStore.success('تم إعادة ترتيب العقد بنجاح');
  };

  // Helper functions
  const getNodesByParent = (parentId?: number): CurriculumTemplateNode[] => {
    return nodes.value.filter(node => node.parent_id === parentId);
  };

  const getNodeChildren = (nodeId: number): CurriculumTemplateNode[] => {
    return nodes.value.filter(node => node.parent_id === nodeId);
  };

  const buildNodeHierarchy = (): CurriculumTemplateNode[] => {
    const nodeMap = new Map<number, CurriculumTemplateNode>();
    const rootNodes: CurriculumTemplateNode[] = [];

    // Create a map of all nodes
    nodes.value.forEach(node => {
      nodeMap.set(node.id!, { ...node, children: [] });
    });

    // Build the hierarchy
    nodeMap.forEach(node => {
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
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          sortByOrder(node.children);
        }
      });
    };

    sortByOrder(rootNodes);
    return rootNodes;
  };

  return {
    // State
    paginationOptions,
    search,
    headers,
    nodeHeaders,
    curriculumTemplate,
    curriculumTemplates,
    curriculumTemplatesTotalCount,
    selectedNode,
    nodes,

    // Template operations
    reset,
    get,
    list,
    create,
    update,
    remove,

    // Node operations
    resetNode,
    getNodes,
    getNode,
    createNode,
    updateNode,
    removeNode,
    updateNodeStatus,
    reorderNodes,

    // Helper functions
    getNodesByParent,
    getNodeChildren,
    buildNodeHierarchy,
  };
});
