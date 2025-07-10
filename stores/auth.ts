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
        const res = await api('auth/login/teacher', {
            method: 'POST',
            body: {
                mobile_phone_number: phoneNumber,
                password
            }
        })

        token.value = res.access_token
        
        toasterStore.success("تم تسجيل الدخول بنجاح");
    }

    const me = async () => {
        const res = await api('auth/profile', {
            method: 'POST'
        })

        user.value = res
    }

    const permissions = ref([])

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
        permissions
    }
})