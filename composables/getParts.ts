export const getParts = (parts?: string) => {
    
    if (!parts?.length) return 'لا يوجد'

    return parts.split(',')?.length + ' أجزاء'
} 