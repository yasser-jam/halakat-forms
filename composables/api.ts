export default (url: string, options?: any) => {
    const config = useRuntimeConfig()

    return $fetch(`${config.public.apiUrl}/${url}`, {
        ...options
    })
}