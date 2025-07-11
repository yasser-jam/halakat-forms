export const useGroupStore = defineStore('group', () => {
    
    const toasterStore = useToasterStore()

    const group = ref<Group>(initGroup())
    
    const groups = ref<Group[]>([])

    const reset = () => group.value = initGroup()

    const get = async (id: number): Promise<Group> => {
        const res = await api(`groups/${id}`)

        group.value = res

        return group.value
    }

    const list = async (): Promise<Group[]> => {
        const campaignId = useCookie('campaign_id')
        
        const res = await api('groups')

        groups.value = res

        return groups.value
    }


    const create = async () => {
        const campaignId = useCookie('campaign_id')
        await api(`groups/${campaignId.value}`, {
            method: 'POST',
            body: group.value
        })

        toasterStore.success('تم إضافة الحلقة بنجاح')
    }

    const assign = async (groupId: number, studentId: number) => {
        await api(`groups/assign/${groupId}/${studentId}`)

        toasterStore.success('تم إضافة الطالب بنجاح')

    }

    const unassign = async (groupId: number, studentId: number) => {
        await api(`groups/unassign/${groupId}/${studentId}`)

        toasterStore.success('تم إزالة الطالب بنجاح')
    }


    const remove = async (id: number) => {
        await api(`groups/${id}`, {
            method: 'DELETE'
        })
    
        toasterStore.success('تم إزالة الحلقة بنجاح')
    }

    return {
        group,
        groups,
        list,
        create,
        reset,
        assign,
        unassign,
        remove,
        get
    }
})