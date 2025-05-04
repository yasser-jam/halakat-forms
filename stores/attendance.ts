import type { Attendance } from "~/types"

export const useAttendanceStore = defineStore('attnedance', () => {

    const campaignId = useCookie('campaign_id')


    const attendances = ref<Attendance[]>([])

    const list = async (groupId: number) : Promise<Attendance[]> => {
        const res = await api(`attendance/${groupId}/${campaignId.value}`)
    
        attendances.value = res

        return attendances.value
    
    }
    
    
    return {
        attendances,
        list
    }
})