<template>
    <v-card density="compact" elevation="0" >
        <v-card-text class="py-2 bg-slate-50">
            <div class="flex items-center gap-2">
                <v-avatar size="small" color="primary" variant="tonal" rounded="full" icon="mdi-check"></v-avatar>
                <div class="font-">
                    قام الأستاذ 
                    <nuxt-link class="text-decoration-none text-primary font-semibold" to="/teachers/1">ياسر جمال الدين</nuxt-link>
                    بإرسال التفقد لحلقة
                    <nuxt-link class="text-decoration-none text-primary font-semibold" to="/groups/1">المجتهدون</nuxt-link>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
</script>