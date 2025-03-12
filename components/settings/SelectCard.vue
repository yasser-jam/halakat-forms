<template>
    <v-card elevation="0" class="h-full">
        <v-card-text class="h-full border-2 border-dashed border-opacity-100" :class="active ? 'border-blue' : 'border-gray'">
            <div class="flex space-between items-center gap-2">
                <v-avatar :icon="icon" :color="active ? 'blue' : 'grey'" class="self-start" />
                
                <div>
                    
                    <div class="text-lg font-semibold" :class="active ? 'text-blue' : ''">{{ title }}</div>

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
    color?: 'primary' | 'warning' | 'info' | 'error',
    title: string,
    icon: string,
    subtitle: string,
    active?: boolean
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
            text: 'text-gray-darken-1',
            border: 'border-gray'
        }
    }
})
</script>