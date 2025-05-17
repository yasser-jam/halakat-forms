import type { Attendance } from '~/types';

export const useAttendanceStore = defineStore('attnedance', () => {
  const campaignId = useCookie('campaign_id');

  const attendances = ref<Attendance[]>([]);

  const list = async (groupId: number): Promise<Attendance[]> => {
    const res = await api(`attendance/${groupId}/${campaignId.value}`);

    attendances.value = res;

    return attendances.value;
  };


  const attendState = ref([])

  const stat = async (
    groupId: number,
    startDate: string = new Date().toISOString(),
    endDate: string = new Date().toISOString()
  ) => {
    const res = await api(
      `attendance/${groupId}/${campaignId.value}/stats/${campaignId.value}?startDate=${startDate}&endDate=${endDate}`
    );

    attendState.value = res
  };

  return {
    attendances,
    list,
    stat,
    attendState
  };
});
