<template>
    <v-container>

        <div class="flex justify-between items-center">
            <div class="text-3xl font-semibold my-4 mb-8">دورات المسجد</div>

            <v-btn>إضافة دورة جديدة</v-btn>
        </div>

        <base-loader v-if="status == 'pending'" />
        <v-row v-else>
            <v-col v-for="campaign in campaigns" cols="12" md="4">
                <campaign-card :campaign :to="`/campaigns/${campaign.id}/dashboard`" />
            </v-col>
        </v-row>
    </v-container>

    <NuxtPage />
</template>

<script setup>
definePageMeta({
    layout: 'no-sidebar'
})

const campaignStore = useCampaignStore()

const { campaigns } = storeToRefs(campaignStore)

const { status } = useLazyAsyncData(() =>
    campaignStore.list()
)

</script>