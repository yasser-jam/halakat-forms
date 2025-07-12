export const useCampaignStore = defineStore("campaign", () => {
  const toasterStore = useToasterStore();

  const campaignId = useCookie('campaign_id')

  const campaign = ref<Campaign>(initCampaign());

  const campaigns = ref<Campaign[]>([]);

  // Static prayer times table (example times, should be replaced with actual prayer times)
  const prayerTimes = {
    FAJR: '05:30',
    SUNRISE: '06:30',
    DHUHR: '12:30',
    ASR: '15:30',
    MAGHRIB: '18:30',
    ISHA: '20:00'
  }

  const oppositeTime = computed(() => {
    if (campaign.value.timing_approach === 'pray_time') {
      const startTime = prayerTimes[campaign.value.start_time as keyof typeof prayerTimes]
      const endTime = prayerTimes[campaign.value.end_time as keyof typeof prayerTimes]

      if (!startTime || !endTime) return null

      // Convert to ISO time string (HH:mm:ss)
      return {
        start_time: `${startTime}:00`,
        end_time: `${endTime}:00`
      }
    } else {
      // Find prayer times that match the given hours
      const startTime = campaign.value.start_time
      const endTime = campaign.value.end_time

      if (!startTime || !endTime) return null

      // Find prayer name for start time
      const startPrayer = Object.entries(prayerTimes).find(([_, time]) => time === startTime)?.[0]
      // Find prayer name for end time
      const endPrayer = Object.entries(prayerTimes).find(([_, time]) => time === endTime)?.[0]

      return {
        start_time: startPrayer,
        end_time: endPrayer
      }
    }
  })

  const reset = () => (campaign.value = initCampaign());

  const get = async (id: number) : Promise<Campaign> => {
    const res = await api(`campaigns/${id}`)

    // If timing approach is pray_time, convert the time values
    if (res.timing_approach === 'pray_time') {
      const startTime = res.start_time?.split(':').slice(0, 2).join(':')
      const endTime = res.end_time?.split(':').slice(0, 2).join(':')

      // Find matching prayer names for the times
      const startPrayer = Object.entries(prayerTimes).find(([_, time]) => time === startTime)?.[0]
      const endPrayer = Object.entries(prayerTimes).find(([_, time]) => time === endTime)?.[0]

      res.start_time = startPrayer || startTime
      res.end_time = endPrayer || endTime
    }

    // turn days from string to array
    campaign.value = res

    campaign.value.days = res.days.split(',')


    return campaign.value
  }

  const list = async ()  => {
    const res = await api("campaigns/my-campaigns");

    campaigns.value = res

    return campaigns.value
  }

  const create = async () => {
    const timeValues = oppositeTime.value
    const formatTime = (time: string | undefined) => {
      if (!time) return null
      if (time.includes('T')) {
        return time.split('T')[1].split('.')[0].substring(0, 5)
      }
      return time
    }

    const body = {
      ...campaign.value,
      days: undefined,
      start_date: new Date(campaign.value.start_date).toISOString(),
      end_date: new Date(campaign.value.end_date as string).toISOString(),
      start_time: campaign.value.timing_approach === 'pray_time' 
        ? formatTime(timeValues?.start_time) 
        : formatTime(campaign.value.start_time),
      end_time: campaign.value.timing_approach === 'pray_time' 
        ? formatTime(timeValues?.end_time) 
        : formatTime(campaign.value.end_time),
    }

    await api("campaigns", {
      method: "POST",
      body,
    });

    toasterStore.success("تم إنشاء الدورة بنجاح");
  };

  const update = async (id: number) => {
    const timeValues = oppositeTime.value
    const formatTime = (time: string | undefined) => {
      if (!time) return null
      if (time.includes('T')) {
        return time.split('T')[1].split('.')[0].substring(0, 5)
      }
      return time
    }

    const body = {
      ...campaign.value,
      id: undefined,
      mosque_id: undefined,
      days: campaign.value?.days?.join(),
      start_date: new Date(campaign.value.start_date).toISOString(),
      start_time: campaign.value.timing_approach === 'pray_time' 
        ? formatTime(timeValues?.start_time) 
        : formatTime(campaign.value.start_time),
      end_time: campaign.value.timing_approach === 'pray_time' 
        ? formatTime(timeValues?.end_time) 
        : formatTime(campaign.value.end_time),
    }

    await api(`campaigns/${id}`, {
      method: "PUT",
      body,
    });

    toasterStore.success("تم تعديل الدورة بنجاح");
  };

  const remove = async (id: number) => {
    await api(`campaigns/${id}`, {
      method: "DELETE",
    });

    toasterStore.success("تم حذف الدورة بنجاح");
  };

  const current = async () => {

    const campaignId = useCookie('campaign_id')

    const res = await api(`campaigns/current/${Number(campaignId.value)}`)
  
    if (res) return campaign.value = res
    
    return false

  };

  const isCampaignCurrent = computed(() => {
    const currentTime = new Date(); // Get current time
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes(); // Current time in minutes
    
    // Convert startTime and endTime into minutes from the start of the day
    const convertToMinutes = (timeString: string) => {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const startTime = convertToMinutes(campaign.value?.start_time as string);
    const endTime = convertToMinutes(campaign.value?.end_time as string);
  

    // Handle the case where the end time might be after midnight
    if (startTime <= endTime) {
      // Normal case where startTime is before endTime on the same day
      return currentTimeInMinutes >= startTime && currentTimeInMinutes <= endTime;
    } else {
      // If the endTime is before the startTime (crosses midnight), adjust accordingly
      return currentTimeInMinutes >= startTime || currentTimeInMinutes <= endTime;
    }
  });

  return {
    campaign,
    campaigns,
    reset,
    list,
    create,
    remove,
    update,
    get,
    current,
    isCampaignCurrent,
    oppositeTime
  };
});
