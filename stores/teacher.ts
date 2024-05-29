import { defineStore } from "pinia";
import type { Teacher, Header, PaginationOptions } from "~/types";

export const useTeacherStore = defineStore("teacher", () => {

  const toasterStore = useToasterStore()

  const teacher = ref<Teacher>(initTeacher());

  const teachers = ref<Teacher[]>([]);

  const teachersTotalCount = ref<number>(0);

  const paginationOptions = ref<PaginationOptions>(initPagination());

  const headers = ref<Header[]>([
    {
      title: "الاسم",
      key: "name",
      sortable: false,
    },
    {
      title: "اسم الحلقة",
      key: "halakah_name",
      sortable: false,
    },
    {
      title: "مجاز",
      key: "mojaz",
      sortable: false,
    },
    {
      title: "الرقم",
      key: "phone_number",
      sortable: false,
    },
    {
      title: "",
      key: "actions",
      sortable: false,
    },
  ]);

  const search = ref<string>('')

  const reset = () => (teacher.value = initTeacher());

  const get = async (id: number) : Promise<Teacher> => {
    teacher.value = await api(`teachers/${id}`)
  
    return teacher.value
  }

  const list = async () : Promise<Teacher[]> => {
    const res = await api("teachers");

    teachersTotalCount.value = res.length;

    teachers.value = res;

    return teachers.value
  };

  const create = async () => {
    await api("teachers", {
      method: "POST",
      body: {
        ...teacher.value,
        birth_date: new Date(teacher.value.birth_date as string),
      },
    });

    toasterStore.success('تم إضافة الأستاذ بنجاح')
  };

  const update = async (id: number) => {
    await api(`teachers/${id}`, {
      method: "PUT",
      body: {
        ...teacher.value,
        birth_date: new Date(teacher.value.birth_date as string),
      },
    });

    toasterStore.success('تم تعديل الأستاذ بنجاح')
  };


  const remove = async (id: number) => {
    await api(`teachers/${id}`, {
      method: 'DELETE'
    })

    toasterStore.success('تم حذف الأستاذ بنجاح')
  }

  return {
    paginationOptions,
    search,
    headers,
    teacher,
    teachers,
    teachersTotalCount,
    reset,
    get,
    list,
    create,
    update,
    remove
  };
});
