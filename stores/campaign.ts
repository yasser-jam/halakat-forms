export const useCampaignStore = defineStore("campaign", () => {
  const toasterStore = useToasterStore();

  const campaignId = useCookie('campaign_id')

  const campaign = ref<Campaign>(initCampaign());

  const campaigns = ref<Campaign[]>([]);

  const reset = () => (campaign.value = initCampaign());

  const get = async (id: number) : Promise<Campaign> => {
    const res = await api(`campaigns/${id}`)

    campaign.value = res

    return campaign.value
  }

  const list = async () => {
    const res = await api("campaigns");

    campaigns.value = res
  }

  const create = async () => {
    await api("campaigns", {
      method: "POST",
      body: {
        ...campaign.value,
        startDate: new Date(campaign.value.startDate).toISOString(),
        endDate: new Date(campaign.value.endDate as string).toISOString(),
      },
    });

    toasterStore.success("تم إنشاء الدورة بنجاح");
  };

  const update = async (id: number) => {
    await api(`campaigns/${id}`, {
      method: "PUT",
      body: {
        ...campaign.value,
        startDate: new Date(campaign.value.startDate)
      },
    });

    toasterStore.success("تم تعديل الدورة بنجاح");
  };

  const remove = async (id: number) => {
    await api(`campaigns/${id}`, {
      method: "DELETE",
    });

    toasterStore.success("تم حذف الدورة بنجاح");
  };

  return {
    campaign,
    campaigns,
    reset,
    list,
    create,
    remove,
    get
  };
});
