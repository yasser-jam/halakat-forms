export interface Header {
    title: string
    key: string
    sortable: boolean
}

export interface PaginationOptions {
    itemsPerPage: number
    page: number
    sortBy: []
    orderBy: []
}

export interface Student {
    id?: number
    first_name: string
    last_name: string
    student_mobile_number: string
    current_mosque_name?: string
    educational_class?: string
    birth_date?: string
    student_mobile?: string
    school?: string
    in_another_mosque?: boolean
    other_mosque_names?: string
    student_health_status?: string
    special_talent?: string
    father_name?: string
    father_status?: 'ALIVE' | 'MISSED' | 'DEAD'
    father_job?: string
    father_income_level?: string
    father_education_level?: string
    father_health_status?: string
    father_phone_number?: string
    father_work_number?: string
    mother_name?: string
    mother_status?: 'ALIVE' | 'MISSED' | 'DEAD'
    mother_job?: string
    mother_income_level?: string
    mother_education_level?: string
    mother_health_status?: string
    mother_phone_number?: string
    mother_home_number?: string
    parent_marital_status?: 'MARRIED' | 'SEPARATED' | 'DIVORCED'
    student_home_number?: string
    original_residence_address_area?: string
    original_residence_address_street?: string
    original_residence_address_building?: string
    original_residence_address_floor?: string
    current_residence_address_area?: string
    current_residence_address_street?: string
    current_residence_address_building?: string
    current_residence_address_floor?: string
    preserved_parts: any
    parts_tested_by_the_endowments: any
    image_url?: string    
}