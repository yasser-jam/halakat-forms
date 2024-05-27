export const getParts = (parts: string) => {
    
    if (!parts.length) return 'لا يوجد'

    return JSON.parse(parts)?.['parts']?.length ? JSON.parse(parts)?.['parts'].split(',').length + '  أجزاء  ' : 'لا يوجد'
    
    // const data = JSON.parse(parts)

    // console.log(data);
    // return data.join(',')
} 