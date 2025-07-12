import type { Attendance } from '~/types';

export const useAttendanceStore = defineStore('attnedance', () => {
  const campaignId = useCookie('campaign_id');

  const attendances = ref<Attendance[]>([]);

  const list = async (groupId: number): Promise<Attendance[]> => {
    const res = await api(`attendance/group/${groupId}`);

    attendances.value = res;

    return attendances.value;
  };


  const campaignAttednace = ref<any>({})

  const listForCampaign = async () => {
    campaignAttednace.value = await api('attendance/campaign/all')
    return campaignAttednace.value
  }


  const attendState = ref([])

  const stat = async (
    groupId: number,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ) => {
    const res = await api(
      `attendance/group/${groupId}/${campaignId.value}/stats/${campaignId.value}?startDate=${startDate}&endDate=${endDate}`
    );

    attendState.value = res
  };


  const attendance = ref<Attendance>(initAttendance())

  const get = async (id: number) => {
    const data = await api(`attendance/${id}`)

    attendance.value = data

    return attendance.value
  }

  const update = async (id: number) => {
    await api(`attendance/${id}`, {
      method: 'PUT',
      body: {
        taken_date: attendance.value.taken_date,
        delay_time: attendance.value.delay_time,
        status: attendance.value.status,
      },
    });

    useToasterStore().success('تم تعديل التفقد بنجاح')
  }

  return {
    attendances,
    list,
    stat,
    attendState,
    campaignAttednace,
    listForCampaign,
    attendance,
    get,
    update
  };
});
