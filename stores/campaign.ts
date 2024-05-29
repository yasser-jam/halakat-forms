export const useCampaignStore = defineStore("campaign", () => {
  const toasterStore = useToasterStore();

  const campaign = ref<Campaign>(initCampaign());

  const campaigns = ref<Campaign[]>([]);

  const reset = () => (campaign.value = initCampaign());

  const create = async () => {
    await api("/campaigns", {
      method: "POST",
      body: campaign.value,
    });

    toasterStore.success("تم إنشاء الدورة بنجاح");
  };

  const update = async (id: number) => {
    await api(`/campaigns/${id}`, {
      method: "PUT",
      body: campaign.value,
    });

    toasterStore.success("تم تعديل الدورة بنجاح");
  };

  const remove = async (id: number) => {
    await api(`/campaigns/${id}`, {
      method: "DELETE",
    });

    toasterStore.success("تم حذف الدورة بنجاح");
  };

  return {
    campaign,
    campaigns,
    reset,
    create,
    remove,
  };
});
