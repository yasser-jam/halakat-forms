<template>

<div class="text-xl font-semibold mb-6">المعلومات العامة</div>

<v-row>
        <v-col cols="12">
            <base-label>اسم الدورة</base-label>
        
            <v-text-field placeholder="اسم الدورة" />
        </v-col>

        <v-col cols="12" md="6">
            <base-label>تاريخ البداية</base-label>
        
            <base-datepicker />
        </v-col>

        <v-col cols="12" md="6">
            <base-label>تاريخ النهاية</base-label>
        
            <base-datepicker />
        </v-col>

        <v-col cols="12">
            <base-switch-input :model-value="true" title="الدورة مستمرة" subtitle="في حال كانت الدورة مستمرة سيتم نقل الحلقات تلقائياً وإلغاء تاريخ النهاية" />
        </v-col>
    </v-row>
</template>