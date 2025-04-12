export interface Header {
  title: string;
  key: string;
  sortable: boolean;
}

export interface PaginationOptions {
  itemsPerPage: number;
  page: number;
  sortBy: [];
  orderBy: [];
}

export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  student_mobile_number: string;
  current_mosque_name?: string;
  educational_class?: string;
  birth_date?: string;
  student_mobile?: string;
  school?: string;
  in_another_mosque: boolean;
  other_mosque_names?: string;
  student_health_status?: string;
  special_talent?: string;
  father_name?: string;
  father_status?: 'ALIVE' | 'MISSED' | 'DEAD';
  father_job?: string;
  father_income_level?: string;
  father_education_level?: string;
  father_health_status?: string;
  father_phone_number?: string;
  father_work_number?: string;
  mother_name?: string;
  mother_status?: 'ALIVE' | 'MISSED' | 'DEAD';
  mother_job?: string;
  mother_income_level?: string;
  mother_education_level?: string;
  mother_health_status?: string;
  mother_phone_number?: string;
  mother_home_number?: string;
  parent_marital_status?: 'MARRIED' | 'SEPARATED' | 'DIVORCED';
  student_home_number?: string;
  original_residence_address_area?: string;
  original_residence_address_street?: string;
  original_residence_address_building?: string;
  original_residence_address_floor?: string;
  current_residence_address_area?: string;
  current_residence_address_street?: string;
  current_residence_address_building?: string;
  current_residence_address_floor?: string;
  preserved_parts: string;
  parts_tested_by_the_endowments: string;
  image_url?: string;
}

export interface Teacher {
  id?: number;
  first_name: string;
  last_name: string;
  father_name: string;
  birth_date: string;
  special_talent?: string;
  mobile_phone_number: string;
  current_residence_address_area: string;
  image_url?: string;

  preserved_parts: string;
  parts_tested_by_the_endowments: string;
  is_mojaz: boolean;
  in_another_mosque?: boolean;
  other_mosque_names?: string;

  educational_level: string;
  university_name?: string;
  college_name?: string;
  is_working?: boolean;
  job_role?: string;
  workplace_name?: string;

  groups?: Group[]
}

export interface Campaign {
  id?: number;
  name: string;
  startDate: string;
  endDate?: string;
  assignEndDate?: string;
  assignStartDate?: string;
  isCampaignContinous?: boolean;
  limitedStudentsCount?: boolean;
  studentsCount: number;
  assignByLink?: boolean;
  completeCountApproach:
    | 'UNLIMIT_ASSIGN'
    | 'HOLD_ASSIGN'
    | 'PEND_ASSIGN'
    | 'STOP_ASSIGN';

    days: string
    startTime?: string
    endTime?: string
    timingApproach: 'hours' | 'pray_time'

  createdAt?: string;
  updatedAt?: string;
}

export interface Group {
  id?: number;
  title: string;
  currentTeacherId?: number;
  class: string;
  currentTeacher?: Teacher;
  students?: Student[];

  created_at?: string;
}
