<template>
    <v-card elevation="0" class="h-full">
        <v-card-text class="h-full border-2 border-dashed border-opacity-50" :class="colorComputed.border">
            <div class="flex space-between items-center gap-2">
                <v-avatar :icon="icon" :color="color" class="self-start" />
                
                <div>
                    
                    <div class="text-lg font-semibold" :class="colorComputed.text">{{ title }}</div>

                    <div class="text-sm text-gray-500">
                        {{ subtitle }}
                    </div>
                </div>

            </div>

        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    color: 'primary' | 'warning' | 'info' | 'error',
    title: string,
    icon: string,
    subtitle: string
}>()

const colorComputed = computed(() => {
    if (props.color == 'primary') {
        return {
            text: 'text-primary',
            border: 'border-primary'
        }
    } else if (props.color == 'warning') {
        return {
            text: 'text-warning',
            border: 'border-warning'
        }
    } else if (props.color == 'info') {
        return {
            text: 'text-info',
            border: 'border-violet'
        }
    }
    else if (props.color == 'error') {
        return {
            text: 'text-error',
            border: 'border-error'
        }
    } else {
        return {
            text: 'text-info',
            border: 'border-violet'
        }
    }
})
</script>