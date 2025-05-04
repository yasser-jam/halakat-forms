import type { Mistake } from "~/types"

export const useMistakeStore = defineStore('mistake', () => {

    const toasterStore = useToasterStore()
    
    const campaign_id = useCookie('campaign_id')
    
    const mistake = ref<Mistake>(initMistake())

    const mistakes = ref<Mistake[]>([])
    
    const list = async () : Promise<Mistake[]> => {
        const res = await api('mistakes')

        mistakes.value = res

        return mistakes.value
    }


    const create = async (title: string, removed_points: number) => {
        await api('mistakes', {
            method: 'POST',
            body: {
                campaign_id: Number(campaign_id.value),
                title,
                removed_points
            }
        })

        
    }

    const remove = async (id: number) => {
        await api(`mistakes/${id}`, {
            method: 'DELETE',
        })
    }

    const assert = async (mistakes: Mistake[]) => {

        await api('mistakes/assert', {
            method: 'POST',
            body: {
                campaignId: Number(campaign_id.value),
                mistakes: mistakes.map(el => ({
                    ...el,
                }))
            }
        })

        toasterStore.success('تم تعديل الأخطاء بنجاح')
    }
    
    return {

        mistake,
        mistakes,
        list,
        create,
        remove,
        assert

    }
})