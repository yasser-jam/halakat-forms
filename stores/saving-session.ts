import { type SavingSession } from "../types";

export const useSavingSessionStore = defineStore("saving-store", () => {
  const campaignId = useCookie("campaign_id");

  const savingSession = ref<SavingSession>(initSavingSession());
  const savingSessions = ref<SavingSession[]>([]);

  const filters = ref<SavingSessionFilter>({});

  const savingSessionsTotalCount = ref<number>(100)
  const paginationOptions = ref<PaginationOptions>(initPagination());

  const headers = ref<Header[]>([
    {
      title: "اسم الطالب",
      key: "student",
      sortable: false,
    },
    {
      title: "اسم الأستاذ",
      key: "teacher",
      sortable: false,
    },
    {
      title: "الكمية المسمعة",
      key: "content",
      sortable: false,
    },
    {
      title: "المدة",
      key: "duration",
      sortable: false,
    },
    {
      title: "التقييم",
      key: "rating",
      sortable: false,
    },
    {
      title: "تاريخ التسميع",
      key: "date",
      sortable: false,
    },
    {
      title: "",
      key: "actions",
      sortable: false,
    },
  ]);

  const filter = async (): Promise<SavingSession[]> => {
    const res = await api("saving-sessions/filter", {
      query: {
        dateFrom: filters.value?.dateFrom || undefined,
        dateTo: filters.value?.dateTo || undefined,
        campaignId: filters.value?.campaignId || undefined,
        teacherId: filters.value?.teacherId || undefined,
        studentId: filters.value?.studentId || undefined,
        mistakeId: filters.value?.mistakeId || undefined,
      },
    });

    savingSessions.value = res;

    return res;
  };

  const get = async (id: number): Promise<SavingSession> => {
    const res = await api(`saving-sessions/${id}`);

    savingSession.value = res;

    return savingSession.value;
  };


  const remove = async (id: number) => {
    await api(`saving-sessions/${id}`, {
      method: 'DELETE'
    });

    await filter();

    useToasterStore().success('تم حذف الجلسة بنجاح')
  }

  const create = async () => {
    await api(`saving-sessions`, {
      method: 'POST',
      body: {
        ...savingSession.value,
        campaignId: Number(campaignId.value),
        mistakes: savingSession.value.mistakes.map((mistake) => ({
          mistakeId: Number(mistake.id),
          pageNumber: Number(savingSession.value?.start)
        })),
      }
    });

    useToasterStore().success('تم إضافة الجلسة بنجاح')
  }

  return {
    savingSession,
    savingSessions,
    filters,
    savingSessionsTotalCount,
    paginationOptions,
    headers,

    filter,
    get,
    remove,
    create
  };
});
