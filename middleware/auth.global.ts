export default defineNuxtRouteMiddleware((to, from) => {

    const token = useCookie('halakat_access_token')

    if (token.value) return


    if (to.name?.includes('sign-student')) return
    if (to.name?.includes('sign-teacher')) return
    if (to.name?.includes('saving-teacher-success')) return
    
    if (to.name?.includes('auth')) return
  
    return navigateTo('/auth/login')
})