export const useAuthStore = defineStore('auth', () => {
    
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

    const token = useCookie('halakat_access_token')

    const login = async (userName: string, password: string) => {
        const selectedUser = users.value.find(user => user.userName == userName && user.password == password)

        if (selectedUser) {
            token.value = '12345'
        }
    }
    
    return {
        login
    }
})