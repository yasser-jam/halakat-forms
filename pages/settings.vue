<template>
    <v-container>
        <div class="text-3xl font-semibold mb-8">إعدادات الدورة</div>

        <base-loader v-if="status == 'pending'" />

        <template v-else>
            <div class="flex justify-between items-center">
                <v-tabs color="primary">
                    <v-tab prepend-icon="mdi-information-outline" text="عام" to="/settings/general"></v-tab>
                    <v-tab prepend-icon="mdi-account-school-outline" text="التسجيل" to="/settings/assign"></v-tab>
                    <v-tab prepend-icon="mdi-account-group-outline" text="الحلقات" to="/settings/group"></v-tab>
                    <v-tab prepend-icon="mdi-book-outline" text="التسميع" to="/settings/preserve"></v-tab>
                    <v-tab prepend-icon="mdi-help-box-multiple-outline" text="المسابقات" to="/settings/contest"></v-tab>
                    <v-tab prepend-icon="mdi-license" text="المكافآت" to="/settings/award"></v-tab>
                </v-tabs>
    
                <v-btn :loading @click="save">حفظ التغييرات</v-btn>
            </div>
    
            <v-tabs-window>
                <v-card>
                    <v-card-text>
                        <NuxtPage />
                    </v-card-text>
                </v-card>
            </v-tabs-window>
        </template>

    </v-container>
</template>

<script setup lang="ts">
const route = useRoute()

const campaignStore = useCampaignStore()

const campaignId = useCookie('campaign_id')

const loading = ref(false)

const { status } = useLazyAsyncData(() => campaignStore.get(Number(campaignId.value)))


const save = async () => {
    loading.value = true
    
    try {
        await campaignStore.update(Number(campaignId.value))
    } finally {
        loading.value = false
    }
}
</script>