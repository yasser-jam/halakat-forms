<template>
    <v-dialog :loading width="400">
        <v-card>
            <v-card-text class="flex flex-col items-center justify-center pt-8 pb-4">
                
                <v-avatar color="error" icon="mdi-close" size="x-large" class="text-2xl mb-4" />
                
                <div class="text-3xl text-gray-800">هل أنت متأكد؟</div>
                <slot name="subtitle">

                    <div class="text-md text-gray-500 font-weight-bold mt-4">لا يمكن استرجاع العنصر بعد حذفه</div>
                </slot>

                <div class="flex gap-2 mt-8">
                    <v-btn color="gray" variant="text">إلغاء</v-btn>
                    <v-btn color="error" :loading @click="$emit('delete')">حذف</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
defineProps<{
    loading?: boolean
}>()
</script>