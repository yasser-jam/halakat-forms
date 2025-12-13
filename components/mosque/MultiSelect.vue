<template>
  <v-select
    :items="mosques"
    placeholder="اخر المساجد"
    multiple
    item-value="id"
    item-title="name"
    :loading="status == 'pending'"
  />
</template>

<script setup lang="ts">

const  mosqueStore = useMosqueStore();
const { mosques } = storeToRefs(mosqueStore);

const { status } = useLazyAsyncData(() => mosqueStore.list())


</script>