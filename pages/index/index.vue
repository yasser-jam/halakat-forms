<template>
    <v-container>

        <div class="flex justify-between items-center">
            <div class="text-3xl font-semibold my-4 mb-8">دورات المسجد</div>

            <v-btn to="/create-campaign/general">إضافة دورة جديدة</v-btn>
        </div>

        <base-loader v-if="status == 'pending'" />
        
        <v-row v-else>
            <v-col v-for="campaign in campaigns" cols="12" md="4">
                <campaign-card :campaign @click="selectCampaign(Number(campaign.id))" />
            </v-col>
        </v-row>
    </v-container>

    <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'no-sidebar'
})

const campaignId = useCookie('campaign_id')

const campaignStore = useCampaignStore()

const { campaigns } = storeToRefs(campaignStore)

const { status } = useLazyAsyncData(() =>
    campaignStore.list()
)

const selectCampaign = (id: number) => {

    campaignId.value = String(id)
    
    navigateTo(`dashboard`)
}

</script>