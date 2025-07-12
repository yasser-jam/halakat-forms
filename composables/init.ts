import type {
  Campaign,
  PaginationOptions,
  Student,
  Teacher,
  Group,
  Mistake,
  SavingSessionFilter,
  Evaluation,
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
  start_date: '',
  complete_count_approach: 'UNLIMIT_ASSIGN',
  students_count: 0,
  days: [],
  timing_approach: 'hours',
});

export const initGroup = (): Group => ({
  title: '',
  students: [],
  currentTeacherId: undefined,
});

export const initMistake = (): Mistake => ({
  title: '',
  reduced_marks: undefined,
});

export const initEvaluation = (): Evaluation => ({
  title: '',
  points: 0,
  minimum_marks: 0,
});

export const initSavingSession = (): SavingSession => ({
  start: 0,
  end: 0,
  rating: 0,
  duration: 0,
  mistakes: [],
});

export const initAttendance = () : Attendance => ({
  status: 'NOT_TAKEN',
  delayTime: -1,
  takenDate: new Date(),
  createdAt: new Date()
})