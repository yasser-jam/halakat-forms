import type { Curriculum, Header, PaginationOptions } from "~/types";

export const useCurriculumStore = defineStore("curriculum", () => {
  const toasterStore = useToasterStore();

  const curriculum = ref<Curriculum>(initCurriculum());

  const curriculums = ref<Curriculum[]>([]);

  const curriculumsTotalCount = ref<number>(0);

  const paginationOptions = ref<PaginationOptions>(initPagination());

  const headers = ref<Header[]>([
    {
      title: "الاسم",
      key: "name",
      sortable: false,
    },
    {
      title: "الوصف",
      key: "description",
      sortable: false,
    },
    {
      title: "عدد الفئات",
      key: "categories_count",
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

  const search = ref<string>('');

  const reset = () => (curriculum.value = initCurriculum());

  const get = async (id: number): Promise<Curriculum> => {
    curriculum.value = await api(`curriculums/${id}`);
    
    return curriculum.value;
  };

  const list = async (): Promise<Curriculum[]> => {
    const res = await api("curriculums");

    curriculumsTotalCount.value = res.length;

    curriculums.value = res;

    return curriculums.value;
  };

  const create = async () => {
    await api("curriculums", {
      method: "POST",
      body: {
        ...curriculum.value,
      },
    });

    toasterStore.success('تم إضافة المنهج بنجاح');
  };

  const update = async (id: number) => {
    await api(`curriculums/${id}`, {
      method: "PUT",
      body: {
        ...curriculum.value,
        // Remove categories from update payload to avoid conflicts
        categories: undefined,
      },
    });

    toasterStore.success('تم تعديل المنهج بنجاح');
  };

  const remove = async (id: number) => {
    await api(`curriculums/${id}`, {
      method: 'DELETE'
    });

    toasterStore.success('تم حذف المنهج بنجاح');
  };

  return {
    paginationOptions,
    search,
    headers,
    curriculum,
    curriculums,
    curriculumsTotalCount,
    reset,
    get,
    list,
    create,
    update,
    remove
  };
});
