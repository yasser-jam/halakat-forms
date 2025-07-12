import type { Evaluation } from '~/types';

export const useEvaluationStore = defineStore('evaluation', () => {
  const toasterStore = useToasterStore();

  const campaign_id = useCookie('campaign_id');

  const evaluation = ref<Evaluation>(initEvaluation());

  const evaluations = ref<Evaluation[]>([]);

  const list = async (): Promise<Evaluation[]> => {
    const res = await api(`evaluations`);

    evaluations.value = res;

    return evaluations.value;
  };

  const create = async (
    title: string,
    points: number,
    reducedAmount: number
  ) => {
    await api('evaluations', {
      method: 'POST',
      body: {
        campaignId: Number(campaign_id.value),
        title,
        points,
        reducedAmount,
      },
    });

    toasterStore.success('تم إنشاء التقييم بنجاح');
  };

  const assert = async (evaluations: Evaluation[]) => {
    await api('evaluations/assert', {
      method: 'POST',
      body: {
        campaignId: Number(campaign_id.value),
        evaluations: evaluations.map((el) => ({
          ...el,
        })),
      },
    });

    toasterStore.success('تم تعديل الأخطاء بنجاح');
  };

  const remove = async (id: number) => {
    await api(`evaluations/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    evaluation,
    evaluations,
    list,
    create,
    remove,
    assert
  };
});
