import { defineStore } from "pinia";
import type { Student, Header, PaginationOptions } from "~/types";

export const useStudentStore = defineStore("student", () => {
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
      title: "الرقم",
      key: "phoneNumber",
      sortable: false,
    },
    {
      title: "",
      key: "actions",
      sortable: false,
    },
  ]);

  const reset = (student.value = initStudent());

  const list = async () => {
    // const res = await api("students");

    const res = {
      count: 100,
      students: [
        {
          name: 'ياسر سعداوي',
          phoneNumber: '+963 011 275 6464',
          image_url: '',
        },
        {
          name: 'راشد الحناوي',
          phoneNumber: '+963 011 275 6464',
          image_url: '',
        },
        {
          name: 'كريم المسوتي',
          phoneNumber: '+963 011 275 6464',
          image_url: '',
        },
      ]
    }

    studentsTotalCount.value = res.count;

    students.value = res.students;
  };

  return {
    paginationOptions,
    headers,
    student,
    students,
    studentsTotalCount,
    reset,
    list,
  };
});
