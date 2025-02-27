import type {
  Campaign,
  PaginationOptions,
  Student,
  Teacher,
  Group,
} from '~/types';

export const initStudent = (): Student => ({
  first_name: '',
  last_name: '',
  student_mobile_number: '',
  in_another_mosque: false,
  preserved_parts: '',
  parts_tested_by_the_endowments: '',
});

export const initTeacher = (): Teacher => ({
  first_name: '',
  last_name: '',
  father_name: '',
  birth_date: '',
  mobile_phone_number: '',
  educational_level: 'none',
  university_name: '',
  college_name: '',
  in_another_mosque: false,
  other_mosque_names: '',
  special_talent: '',
  current_residence_address_area: '',
  preserved_parts: '',
  parts_tested_by_the_endowments: '',
  image_url: '',
  is_mojaz: false,
  is_working: false,
  job_role: '',
  workplace_name: '',
});

export const initPagination = (): PaginationOptions => ({
  itemsPerPage: 0,
  page: 1,
  sortBy: [],
  orderBy: [],
});

export const initCampaign = (): Campaign => ({
  name: '',
  startDate: '',
  completeCountApproach: 'UNLIMIT_ASSIGN',
  studentsCount: 0,
  days: '',
  startTime: '',
  endTime: '',
  timingApproach: 'hours',
});

export const initGroup = (): Group => ({
  title: '',
  students: [],
  class: '',
  currentTeacherId: 0,
});
