<template>
    <!-- <base-loader></base-loader> -->

    <v-container>
        <div class="text-3xl font-semibold mb-8">سجل التسميعات</div>

        <v-row>
            <v-col v-for="i in 10" cols="12">
                <saving-card></saving-card>
            </v-col>
        </v-row>

    </v-container>


    <NuxtPage />
</template>