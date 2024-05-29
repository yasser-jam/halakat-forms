import type { PaginationOptions, Student } from "~/types";

export const initStudent = (): Student => ({
  first_name: "",
  last_name: "",
  student_mobile_number: "",
  in_another_mosque: false,
  preserved_parts: '',
  parts_tested_by_the_endowments: '',
});

export const initPagination = (): PaginationOptions => ({
  itemsPerPage: 0,
  page: 1,
  sortBy: [],
  orderBy: [],
});
