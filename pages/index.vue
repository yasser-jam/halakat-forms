<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <campaign-card to="/campaigns/1/dashboard" />
            </v-col>

            <v-col cols="12" md="4">
                <campaign-card />
            </v-col>

            <v-col cols="12" md="4">
                <campaign-card />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
definePageMeta({
    layout: 'no-sidebar'
})


</script>