export const useRoleStore = defineStore('role', () => {
    
    const toasterStore = useToasterStore()

    const roles = ref<Role[]>([])

    const list = async (): Promise<Role[]> => {
        const campaignId = useCookie('campaign_id')
        
        const res = await api('roles')

        roles.value = res

        return roles.value

    }

    const bulkUpdate = async (roles: { role_id: number, permissions: string[] }) : Promise<void> => {
        await api('/roles/bulk-update-permissions', {
            body: roles
        })
    }



    return {
        list,
        roles,
        bulkUpdate
    }
})