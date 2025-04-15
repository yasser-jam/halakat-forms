<template>
    <v-card>
        <v-card-text class="py-4">
            <v-row class="items-center">
                <v-col cols="5">
                    <div class="flex gap-2">
                        <v-avatar size="small" icon="mdi-book-outline" color="primary"></v-avatar>
                        <div class="flex items-center gap-2">
                            <div class="text-base font-semibold">ياسر جمال الدين</div>
                            <v-icon size="small" color="gray" class="mt-1">mdi-arrow-left-bold-outline</v-icon>
                            <div class="text-base text-primary font-semibold">عمر حديد</div>
                        </div>
                    </div>
                </v-col>

                <v-col cols="2">
                    <v-chip size="small">22/2/2012</v-chip>
                </v-col>

                <v-col cols="1" class="flex justify-center gap-1">
                    <div class="text-lg text-primary font-semibold">10</div>
                    <span class="text-xs font-success mt-2 me-1">دقائق</span>
                </v-col>

                <v-col cols="1" class="flex justify-center gap-1">
                    <div class="text-lg text-purple font-semibold">20</div>
                    <span class="text-xs font-success mt-2 me-1">نقطة</span>
                </v-col>

                <v-col cols="1" class="flex justify-center gap-1">
                    <v-chip color="success">ناجح</v-chip>
                </v-col>

                <v-col cols="2" class="flex gap-1 justify-end">
                    <v-btn size="x-small" color="blue" variant="tonal" rounded icon="mdi-eye-outline"></v-btn>
                    <v-btn size="x-small" color="error" variant="tonal" rounded icon="mdi-trash-can-outline"></v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>