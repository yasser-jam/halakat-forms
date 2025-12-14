import type { Mosque } from '~/types';

export const useMosqueStore = defineStore('mosque', () => {
  const toasterStore = useToasterStore();

  const mosque = ref<Mosque>(initMosque());
  const mosques = ref<Mosque[]>([]);

  const reset = () => (mosque.value = initMosque());

  const get = async (id: number): Promise<Mosque> => {
    const res = await api(`mosques/${id}`);
    mosque.value = res?.data;
    return mosque.value;
  };

  const list = async (): Promise<Mosque[]> => {
    const res = await api('mosques');
    mosques.value = res?.data;
    return mosques.value;
  };

  const create = async () => {
    await api('mosques', {
      method: 'POST',
      body: mosque.value,
    });

    toasterStore.success('تم إنشاء المسجد بنجاح');
  };

  const update = async (id: number) => {
    await api(`mosques/${id}`, {
      method: 'PUT',
      body: mosque.value,
    });

    toasterStore.success('تم تعديل المسجد بنجاح');
  };

  const remove = async (id: number) => {
    await api(`mosques/${id}`, {
      method: 'DELETE',
    });

    toasterStore.success('تم حذف المسجد بنجاح');
  };

  return {
    mosque,
    mosques,
    reset,
    list,
    create,
    update,
    remove,
    get,
  };
});


