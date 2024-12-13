<template>
    <div class="text-xl font-semibold mb-6">إعدادات التسجيل</div>
    
    <v-row>

        <v-col cols="12" md="6">
            <base-label>تاريخ بداية التسجيل</base-label>

            <base-datepicker />
        </v-col>

        <v-col cols="12" md="6">
            <base-label>تاريخ نهاية التسجيل</base-label>

            <base-datepicker />
        </v-col>

        <v-col cols="12">
            <base-switch-input :model-value="true" title="تقييض عدد معين للطلاب"
                subtitle="يوجد عدد محدد للطلاب المقبولين" />
        </v-col>

        <v-col cols="12" class="mt-4">
            <base-label>عدد الطلاب المسموح</base-label>

            <v-text-field type="number" placeholder="عدد الطلاب المسموح" />
        </v-col>



        <v-col cols="12">
            <base-switch-input :model-value="true" color="secondary" title="التسجيل عن طريق الرابط" subtitle="إتاحة رابط خارجي للتسجيل" />
        </v-col>

        <v-col cols="12" class="mt-4">
            <base-label>الإجراء المتبع عند اكتمال العدد</base-label>

            <v-row class="mt-4 items-streach">
                <v-col cols="3">
                    <settings-select-card color="primary" icon="mdi-check-all" title="التسجيل بالمطلق"
                        subtitle="سيتم تسجيل جميع الطلاب المتقدمين بغض النظر عن اكتمال العدد أم لا"></settings-select-card>
                </v-col>

                <v-col cols="3">
                    <settings-select-card color="warning" icon="mdi-check" title="التسجيل المقيد"
                        subtitle="سيتم التسجيل لكن مع إعطاء تنبيه بالفائض العددي"></settings-select-card>
                </v-col>

                <v-col cols="3">
                    <settings-select-card color="info" icon="mdi-clock-outline" title="التسجيل المعلق"
                        subtitle="سيتم حفظ طلبات التسجيل دون إضافة الطلبات إلا عند الموافقة اليدوية لكل طالب"></settings-select-card>
                </v-col>

                <v-col cols="3">
                    <settings-select-card color="error" icon="mdi-cancel" title="إيقاف التسجيل"
                        subtitle="لن يتم إضافة الطلاب ولا حفظ طلبات التسجيل، سيتم رفض الطلبات مباشرة"></settings-select-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>