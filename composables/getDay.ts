export const getDay = (date: 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday') => {
  switch (date) {
    case 'sunday': return 'الأحد';
    case 'monday': return 'الاثنين';
    case 'tuesday': return 'الثلاثاء';
    case 'wednesday': return 'الأربعاء';
    case 'thursday': return 'الخميس';
    case 'friday': return 'الجمعة';
    case 'saturday': return 'السبت';
  }
  return day;
}