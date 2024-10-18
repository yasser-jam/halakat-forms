<template>
    <v-card>
        <v-card-text class="flex items-center gap-4 relative">

            <div class="w-12 h-12 rounded-full bg-gray-200"></div>

            <div>
                <div class="text-lg font-semibold mb-1">أ.محمد مسوتي</div>
    
                <div class="text-sm text-gray-500">حلقة الصغار</div>
            </div>

            <v-spacer></v-spacer>
      
            <v-chip v-if="!isAttend" color="warning" @click="isAttend = true">لم يحضر بعد</v-chip>
            <v-chip v-else color="success" @click="isAttend = true">حاضر</v-chip>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

const isAttend = ref(false)



</script>