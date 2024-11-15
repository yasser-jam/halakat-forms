import { defineStore } from "pinia";
import type { Student, Header, PaginationOptions } from "~/types";

export const useStudentStore = defineStore("student", () => {

  const toasterStore = useToasterStore()

  const student = ref<Student>(initStudent());

  const students = ref<Student[]>([]);

  const studentsTotalCount = ref<number>(0);

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
      title: "الأجزاء المحفوظة",
      key: "preserved_parts",
      sortable: false,
    },
    {
      title: "النقاط",
      key: "points",
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

  const reset = () => (student.value = initStudent());

  const get = async (id: number) : Promise<Student> => {
    student.value = await api(`students/${id}`)
  
    return student.value
  }

  const list = async () : Promise<Student[]> => {
    const res = await api("students");

    studentsTotalCount.value = res.length;

    students.value = res;

    return students.value
  };

  const listUnassigned = async (campaignId: number) : Promise<Student[]> => {
    const res = await api(`students/unassigned/${campaignId}`);

    students.value = res;

    return students.value
  };

  const create = async () => {
    await api("students", {
      method: "POST",
      body: {
        ...student.value,
        birth_date: new Date(student.value.birth_date as string),
      },
    });

    toasterStore.success('تم إضافة الطالب بنجاح')
  };

  const update = async (id: number) => {
    await api(`students/${id}`, {
      method: "PUT",
      body: {
        ...student.value,
        birth_date: new Date(student.value.birth_date as string),
      },
    });

    toasterStore.success('تم تعديل الطالب بنجاح')
  };


  const remove = async (id: number) => {
    await api(`students/${id}`, {
      method: 'DELETE'
    })

    toasterStore.success('تم حذف الطالب بنجاح')
  }

  return {
    paginationOptions,
    search,
    headers,
    student,
    students,
    studentsTotalCount,
    reset,
    get,
    list,
    listUnassigned,
    create,
    update,
    remove
  };
});
