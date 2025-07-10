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
    if (campaign.value.timingApproach === 'pray_time') {
      const startTime = prayerTimes[campaign.value.startTime as keyof typeof prayerTimes]
      const endTime = prayerTimes[campaign.value.endTime as keyof typeof prayerTimes]

      if (!startTime || !endTime) return null

      // Convert to ISO time string (HH:mm:ss)
      return {
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`
      }
    } else {
      // Find prayer times that match the given hours
      const startTime = campaign.value.startTime
      const endTime = campaign.value.endTime

      if (!startTime || !endTime) return null

      // Find prayer name for start time
      const startPrayer = Object.entries(prayerTimes).find(([_, time]) => time === startTime)?.[0]
      // Find prayer name for end time
      const endPrayer = Object.entries(prayerTimes).find(([_, time]) => time === endTime)?.[0]

      console.log(startPrayer);

      return {
        startTime: startPrayer,
        endTime: endPrayer
      }
    }
  })

  const reset = () => (campaign.value = initCampaign());

  const get = async (id: number) : Promise<Campaign> => {
    const res = await api(`campaigns/${id}`)

    // If timing approach is pray_time, convert the time values
    if (res.timingApproach === 'pray_time') {
      const startTime = res.startTime?.split(':').slice(0, 2).join(':')
      const endTime = res.endTime?.split(':').slice(0, 2).join(':')

      // Find matching prayer names for the times
      const startPrayer = Object.entries(prayerTimes).find(([_, time]) => time === startTime)?.[0]
      const endPrayer = Object.entries(prayerTimes).find(([_, time]) => time === endTime)?.[0]

      res.startTime = startPrayer || startTime
      res.endTime = endPrayer || endTime
    }

    // turn days from string to array
    campaign.value = res

    campaign.value.days = res.days.split(',')


    return campaign.value
  }

  const list = async ()  => {
    console.log('list campaings');
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
      startDate: new Date(campaign.value.startDate).toISOString(),
      endDate: new Date(campaign.value.endDate as string).toISOString(),
      startTime: campaign.value.timingApproach === 'pray_time' 
        ? formatTime(timeValues?.startTime) 
        : formatTime(campaign.value.startTime),
      endTime: campaign.value.timingApproach === 'pray_time' 
        ? formatTime(timeValues?.endTime) 
        : formatTime(campaign.value.endTime),
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
      days: campaign.value?.days?.join(),
      startDate: new Date(campaign.value.startDate).toISOString(),
      startTime: campaign.value.timingApproach === 'pray_time' 
        ? formatTime(timeValues?.startTime) 
        : formatTime(campaign.value.startTime),
      endTime: campaign.value.timingApproach === 'pray_time' 
        ? formatTime(timeValues?.endTime) 
        : formatTime(campaign.value.endTime),
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
  
    const startTime = convertToMinutes(campaign.value?.startTime as string);
    const endTime = convertToMinutes(campaign.value?.endTime as string);
  

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
