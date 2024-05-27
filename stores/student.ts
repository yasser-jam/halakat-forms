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

  const reset = (student.value = initStudent());

  const list = async () => {
    // const res = await api("students");

    const res = {
      count: 100,
      students: [
        {
          name: "ياسر سعداوي",
          phoneNumber: "+963 011 275 6464",
          image_url: "",
        },
        {
          name: "راشد الحناوي",
          phoneNumber: "+963 011 275 6464",
          image_url: "",
        },
        {
          name: "كريم المسوتي",
          phoneNumber: "+963 011 275 6464",
          image_url: "",
        },
      ],
    };

    studentsTotalCount.value = res.count;

    students.value = res.students;
  };

  const create = async () => {
    await api("students", {
      method: "POST",
      body: {
        ...student.value,
        preserved_parts: JSON.stringify({
          parts: student.value.preserved_parts?.toString(),
        }),
        parts_tested_by_the_endowments: JSON.stringify({
          parts: student.value.parts_tested_by_the_endowments?.toString(),
        }),
        birth_date: new Date(student.value.birth_date as string),
      },
    });
  };

  return {
    paginationOptions,
    headers,
    student,
    students,
    studentsTotalCount,
    reset,
    list,
    create,
  };
});
