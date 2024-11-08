export const useCampaignStore = defineStore("campaign", () => {
  const toasterStore = useToasterStore();

  const campaign = ref<Campaign>(initCampaign());

  const campaigns = ref<Campaign[]>([]);

  const reset = () => (campaign.value = initCampaign());

  const list = async () => {
    const res = await api("campaigns");

    campaigns.value = res
  }

  const create = async () => {
    await api("campaigns", {
      method: "POST",
      body: {
        ...campaign.value,
        startDate: new Date(campaign.value.startDate)
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
  };
});
