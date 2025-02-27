export const getEducationalLevel = (education: string) => {
    switch (education) {
        case 'primary': return 'ابتدائي'
        case 'secondary': return 'إعدادي'
        case 'high-school': return 'ثانوي'
        case 'college': return 'جامعي'
        case 'master': return 'ماجيستير'
        case 'phd': return 'دكتوراه'
    }
}