<template>
    <v-container>
        <v-card>
            <v-card-text>
                <div class="text-xl font-semibold mb-6">المعلومات العامة</div>

                    <v-row>
                        <v-col cols="12">
                            <base-label>اسم الدورة</base-label>
    
                            <v-text-field v-model="campaign.name" placeholder="اسم الدورة" />
                        </v-col>
    
                        <v-col cols="12" md="6">
                            <base-label>تاريخ البداية</base-label>
    
                            <base-datepicker v-model="campaign.startDate" />
                        </v-col>
    
                        <v-col v-if="!campaign.isCampaignContinous" cols="12" md="6">
                            <base-label>تاريخ النهاية</base-label>
    
                            <base-datepicker v-model="campaign.endDate" />
                        </v-col>

                        <v-col cols="12">
                            <base-switch-input v-model="campaign.isCampaignContinous" title="الدورة مستمرة"
                                subtitle="في حال كانت الدورة مستمرة سيتم نقل الحلقات تلقائياً وإلغاء تاريخ النهاية" />
                        </v-col>
    
                        
                    </v-row>



            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn color="gray" to="/">إلغاء</v-btn>
                <v-btn variant="elevated" :loading @click="create">حفظ</v-btn>
            </v-card-actions>
        </v-card>

    </v-container>

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'no-sidebar'
})

const campaignStore = useCampaignStore()

const { campaign } = storeToRefs(campaignStore)

const loading = ref(false)

const create = async () => {
    try {
        
        loading.value = true

        await campaignStore.create()

        navigateTo('/')

    } finally {
        loading.value = false
    }
}

</script>