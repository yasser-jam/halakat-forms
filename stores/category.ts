import type { Category, Header, PaginationOptions } from "~/types";

export const useCategoryStore = defineStore("category", () => {
  const toasterStore = useToasterStore();

  const category = ref<Category>(initCategory());

  const categories = ref<Category[]>([]);

  const categoriesTotalCount = ref<number>(0);

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
      title: "اللون",
      key: "color",
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

  const reset = () => (category.value = initCategory());

  const get = async (id: number): Promise<Category> => {
    category.value = await api(`category/${id}`);
    
    return category.value;
  };

  const list = async (): Promise<Category[]> => {
    const res = await api("category");

    categoriesTotalCount.value = res.length;

    categories.value = res;

    return categories.value;
  };

  const create = async () => {
    await api("category", {
      method: "POST",
      body: {
        ...category.value,
      },
    });

    toasterStore.success('تم إضافة الفئة بنجاح');
  };

  const update = async (id: number) => {
    await api(`category/${id}`, {
      method: "PUT",
      body: {
        ...category.value,
      },
    });

    toasterStore.success('تم تعديل الفئة بنجاح');
  };

  const remove = async (id: number) => {
    await api(`category/${id}`, {
      method: 'DELETE'
    });

    toasterStore.success('تم حذف الفئة بنجاح');
  };

  return {
    paginationOptions,
    search,
    headers,
    category,
    categories,
    categoriesTotalCount,
    reset,
    get,
    list,
    create,
    update,
    remove
  };
});
