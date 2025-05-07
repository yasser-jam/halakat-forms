<template>
    <base-dialog width="900" model-value="true" @close="navigateTo('/savings')">
        <template #title>
            محصلة الجلسة
            {{ savingSession?.id }}
        </template>


        <!-- معلومات المسمع Card -->
        <v-card elevation="0" class="mb-4">
            <div class="text-sm font-semibold text-gray-500">معلومات المسمع</div>
            <v-card-text class="bg-gray-50">
                <v-row>
                    <v-col cols="6" class="mb-2">
                        <div class="flex items-center gap-2">
                            <base-label>الاسم</base-label>
                            <v-chip color="blue">عدنان المالكي</v-chip>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>الدور الوظيفي</base-label>
                            <v-chip color="blue">أستاذ الحلقة</v-chip>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- معلومات الطالب Card -->
        <v-card elevation="0" class="mb-4">
            <div class="text-sm font-semibold text-gray-500">معلومات الطالب</div>
            <v-card-text class="bg-gray-50">
                <v-row>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>الاسم</base-label>
                            <v-chip>{{ savingSession?.student?.first_name }} {{ savingSession?.student?.last_name }}</v-chip>
                        </div>
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <div class="flex items-center gap-2">
                            <base-label>العمر</base-label>
                            <v-chip>{{ savingSession?.student?.birthDate }} سنة</v-chip>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>اسم الحلقة</base-label>
                            <v-chip color="blue">{{ "غير مسجل" }}</v-chip>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- القسم المسمع Card -->
        <v-card elevation="0" class="mb-4">
            <div class="text-sm font-semibold text-gray-500">القسم المسمع</div>
            <v-card-text class="bg-gray-50">
                <v-row>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>القسم المسمع</base-label>
                            <v-chip color="teal">صفحة {{ savingSession?.end }} - {{ savingSession?.start }}</v-chip>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>النتيجة</base-label>
                            <v-chip color="teal">{{ savingSession?.rating }}</v-chip>
                        </div>
                    </v-col>

                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>التقييم</base-label>
                            <v-chip color="teal">{{ savingSession?.rating }}</v-chip>
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <div class="flex items-center gap-2">
                            <base-label>النقاط المستحقة</base-label>
                            <v-chip color="teal">غير محسوب</v-chip>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- الأخطاء Card -->
        <v-card elevation="0" class="mb-4">
            <div class="text-sm font-semibold text-gray-500">الأخطاء ({{ savingSession?.mistakes?.length }} خطأ)</div>
            <v-card-text class="bg-gray-50 max-h-[300px] overflow-auto">
                <!-- Check if there are errors -->
                <base-not-found v-if="!savingSession?.mistakes?.length" text="لا توجد أخطاء" />

                <!-- If there are errors, show list of cards -->
                <v-row v-else >
                    <v-col v-for="(error, index) in savingSession?.mistakes" :key="index" cols="12">
                        <v-card elevation="0" class="mb-2">
                            <v-card-text class="bg-gray-100">
                                <v-row>
                                    <v-col cols="4">
                                        <div class="flex items-center gap-2">
                                            <base-label>نوع الخطأ</base-label>
                                            <v-chip color="error">تجويد</v-chip>
                                        </div>
                                    </v-col>

                                    <v-col cols="4">
                                        <div class="flex items-center gap-2">
                                            <base-label>مكان الخطأ</base-label>
                                            <v-chip color="error">الآية 20</v-chip>
                                        </div>
                                    </v-col>

                                    <v-col cols="4">
                                        <div class="flex items-center gap-2">
                                            <base-label>طريقة الاستجابة</base-label>
                                            <v-chip color="error">تذكر بعد التنبيه</v-chip>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </base-dialog>
</template>

<script setup lang="ts">
const savingSessionStore = useSavingSessionStore()

const { savingSession } = storeToRefs(savingSessionStore)

const route = useRoute()

const sessionId = route.params.saving_id

const { status } = useLazyAsyncData(() => savingSessionStore.get(Number(sessionId)))

</script>

<style scoped>
.v-card {
    margin-bottom: 20px;
}
</style>
