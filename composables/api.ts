export default async (url: string, options?: any) => {
  const toasterStore = useToasterStore();

  const config = useRuntimeConfig();

  const token = useCookie('halakat_access_token');

  const campaignId = useCookie('campaign_id');

  try {
    const res = await $fetch(`${config.public.apiUrl}/${url}`, {
      headers: {
        campaign_id: campaignId.value,
        Authorization: `Bearer ${token.value}`,
      },
      ...options,
    });

    return res;
  } catch (error) {
    toasterStore.error('حدث خطأ ما، يرجى إعادة المحاولة');
  }
};
