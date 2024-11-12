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

    const list = async (campaignId: number): Promise<Group[]> => {
        const res = await api('groups', {
            query: {
                campaignId
            }
        })

        groups.value = res

        return groups.value
    }

    const create = async (campaignId: number) => {
        await api(`groups/${campaignId}`, {
            method: 'POST',
            body: group.value
        })

        toasterStore.success('تم إضافة الحلقة بنجاح')
    }

    return {
        group,
        groups,
        list,
        create,
        reset,
        get
    }
})