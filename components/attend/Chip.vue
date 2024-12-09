<template>
    <v-chip :color="info.color">{{ info.title }}</v-chip>
</template>

<script setup lang="ts">
const props = defineProps<{
    status: 'ATTEND' | 'MISSED' | string
}>()

const info = computed(() => {
    if (props.status == 'ATTEND') {
        return {
            color: 'success',
            title: 'حاضر'
        }
    } else if (props.status == 'MISSED') {
        return {
            color: 'error',
            title: 'غائب'
        }
    } else {
        return {
            color: 'warning',
            title: 'متأخر'
        }
    }
})

</script>