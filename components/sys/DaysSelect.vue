<template>

<v-select :items chips multiple placeholder="اختر الأيام"></v-select>

</template>

<script setup lang="ts">

    const items = ref([
        {
            title: 'الجمعة',
            value: 'friday'
        },
        {
            title: 'السبت',
            value: 'saturday'
        },
        {
            title: 'الأحد',
            value: 'sunday'
        },
        {
            title: 'الاثنين',
            value: 'monday'
        },
        {
            title: 'الثلاثاء',
            value: 'tuesday'
        },
        {
            title: 'الأربعاء',
            value: 'wednesday'
        },
        {
            title: 'الخميس',
            value: 'thursday'
        },

    ])

</script>