export const useAuthStore = defineStore('auth', () => {

    const toasterStore = useToasterStore()
    
    const users = ref([
        {
            userName: 'عمار عنوز',
            password: 'password'
        },
        {
            userName: 'محمد خير',
            password: 'password'
        },
        {
            userName: 'ياسر جمال الدين',
            password: 'password'
        },
    ])

    const user = ref<Teacher>(initTeacher())

    const token = useCookie('halakat_access_token')

    const login = async (phoneNumber: string, password: string) => {
        
        const organizationId = useCookie('organization_id')

        const res = await api('auth/login', {
            method: 'POST',
            body: {
                mobile_phone_number: phoneNumber,
                password
            }
        })

        token.value = res.access_token
        
        user.value = res.user

        toasterStore.success("تم تسجيل الدخول بنجاح");

        // save org_id in cookies and go to mosques page (if the user is organization_admin)
        if (res.user.role === 'ORGANIZATION_ADMIN' && res.assigned_organization?.id) {
            organizationId.value = res.assigned_organization?.id
            return navigateTo('/mosques')
        }

        return navigateTo('/campaigns')
    }

    const me = async () => {
        const res = await api('auth/profile', {
            method: 'POST'
        })

        // await listPermissions()

        // redirect the user if he has no access to dashboard
        // if (!permissions.value?.includes('DASHBOARD_ACCESS')) navigateTo('/has-no-access')

        user.value = res

        return user.value
    }

    const permissions = ref<string[]>([])

    const campaignId = useCookie('campaign_id')

    const listPermissions = async () => {
        const data = await api('auth/my-permissions', {
            method: 'POST',
        })

        permissions.value = data.permissions
    }
    
    return {
        login,
        me,
        listPermissions,
        permissions,
        user
    }
})