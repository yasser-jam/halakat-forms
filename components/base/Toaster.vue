<template>
    <v-snackbar :color="toasterColor" variant="flat" location="top right" :close-delay="1111">
        <slot />
    </v-snackbar>
</template>

<script setup lang="ts">
const taosterStore = useToasterStore()

const { toasterColor } = storeToRefs(taosterStore)
</script>