export default (url: string, options?: any) => {
    
    const toasterStore = useToasterStore()

    const config = useRuntimeConfig()

    try {
        const res = $fetch(`${config.public.apiUrl}/${url}`, {
            ...options
        })

        return res

    } catch (error) {
        toasterStore.error('حدث خطأ ما، يرجى إعادة المحاولة')
    }

}