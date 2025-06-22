<template>
  <div class="success-container">
    <v-avatar class="success-avatar" size="100">
      <v-icon color="success" size="60">mdi-check</v-icon>
    </v-avatar>
    <h2 class="success-title">تم الحفظ بنجاح</h2>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this simple success page

definePageMeta({
    layout: 'public'
})

</script>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.success-avatar {
  background-color: #e6f4ea;
  margin-bottom: 24px;
}
.success-title {
  color: #2e7d32;
  font-weight: bold;
  margin-top: 0;
}
</style> 