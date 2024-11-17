export default async (url: string, options?: any) => {
  const toasterStore = useToasterStore();

  const config = useRuntimeConfig();

  const token = useCookie('halakat_access_token');

  try {
    const res = await $fetch(`${config.public.apiUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      ...options,
    });

    return res;
  } catch (error) {
    toasterStore.error('حدث خطأ ما، يرجى إعادة المحاولة');
  }
};
