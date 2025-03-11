export const getClassName = (classNumber: number) => {
    switch (classNumber) {
        case 1: return 'الصف الأول';
        case 2: return 'الصف الثاني';
        case 3: return 'الصف الثالث';
        case 4: return 'الصف الرابع';
        case 5: return 'الصف الخامس';
        case 6: return 'الصف السادس';
        case 7: return 'الصف السابع';
        case 8: return 'الصف الثامن';
        case 9: return 'الصف التاسع';
        case 10: return 'الصف العاشر';
        case 11: return 'الصف الحادي عشر';
        case 12: return 'بكالوريا';
        default: return 'جامعة';
    }
};