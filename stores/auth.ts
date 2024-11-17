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

    const login = async (email: string, password: string) => {
        const res = await api('auth/admin/login', {
            method: 'POST',
            body: {
                email,
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
    
    return {
        login,
        me
    }
})