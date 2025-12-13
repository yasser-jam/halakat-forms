export default async (url: string, options?: any) => {
  const toasterStore = useToasterStore();

  const config = useRuntimeConfig();

  const token = useCookie('halakat_access_token');

  const campaignId = useCookie('campaign_id');
  const organizationId = useCookie('organization_id');
  const mosqueId = useCookie('mosque_id');

  try {
    const res = await $fetch(`${config.public.apiUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        campaign_id: options?.wihoutCampaign ? undefined : campaignId.value,
        organization_id: organizationId.value,
        mosque_id: mosqueId.value,
      },
      ...options,
    });

    return res;
  } catch (error) {
    toasterStore.error('حدث خطأ ما، يرجى إعادة المحاولة');
  }
};
