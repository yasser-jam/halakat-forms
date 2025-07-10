<template>
    <div class="min-h-screen flex flex-col items-center justify-center gap-4">
        <v-icon size="7rem" color="primary">mdi-alert-octagon-outline</v-icon>
        <div class="font-medium text-xl text-gray-500">ليس لديك الصلاحيات للوصول</div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: 'no-sidebar'
})

</script>