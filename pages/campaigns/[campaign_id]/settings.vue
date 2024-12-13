<template>
    <v-container>
        <div class="text-3xl font-semibold mb-8">إعدادات الدورة</div>

        <v-tabs color="primary">
            <v-tab prepend-icon="mdi-information-outline" text="عام" :to="`${baseRoute}/general`"></v-tab>
            <v-tab prepend-icon="mdi-account-school-outline" text="التسجيل" :to="`${baseRoute}/assign`"></v-tab>
            <v-tab prepend-icon="mdi-account-group-outline" text="الحلقات" :to="`${baseRoute}/group`"></v-tab>
            <v-tab prepend-icon="mdi-book-outline" text="التسميع" :to="`${baseRoute}/preserve`"></v-tab>
            <v-tab prepend-icon="mdi-help-box-multiple-outline" text="المسابقات" :to="`${baseRoute}/contest`"></v-tab>
            <v-tab prepend-icon="mdi-license" text="المكافآت" :to="`${baseRoute}/award`"></v-tab>
        </v-tabs>

        <v-tabs-window>
            <v-card>
                <v-card-text>
                    <NuxtPage />
                </v-card-text>
            </v-card>
        </v-tabs-window>

    </v-container>
</template>

<script setup lang="ts">
const route = useRoute()

const baseRoute = `/campaigns/${route.params.campaign_id}/settings`
</script>