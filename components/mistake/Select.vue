<template>

    <v-select :items="mistakes" :loading="status == 'pending'" 
    placeholder="جدد الأخطاء" multiple chips return-object item-value="id" item-title="title"></v-select>

</template>

<script setup lang="ts">

const mistakeStore = useMistakeStore()

const { mistakes } = storeToRefs(mistakeStore)


const { status } = useLazyAsyncData(() => mistakeStore.list())

</script>