<template>
    <base-dialog width="900" model-value="true" @close="navigateTo('/savings')" @save="create">
        <template #title>إنشاء جلسة تسميع</template>

        <v-card elevation="0" class="mb-4">
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <base-label>اسم الطالب</base-label>
                        <student-select v-model="savingSession.studentId" :multiple="false" />
                    </v-col>

                    <v-col cols="6">
                        <base-label>اسم الأستاذ</base-label>
                        <teacher-select :only-unassigned="false" v-model="savingSession.teacherId" :multiple="false" />
                    </v-col>

                    <v-col cols="6">
                        <base-label>رقم صفحة البداية</base-label>
                        <v-text-field v-model.number="savingSession.start" type="number" placeholder="رقم صفحة البداية"></v-text-field>
                    </v-col>

                    <v-col cols="6">
                        <base-label>رقم صفحة النهاية</base-label>
                        <v-text-field v-model.number="savingSession.end" type="number" placeholder="رقم صفحة النهاية"></v-text-field>
                    </v-col>

                    <v-col>
                        <base-label>الأخطاء</base-label>

                        <mistake-select v-model="savingSession.mistakes"  />
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>

    </base-dialog>
</template>

<script setup lang="ts">
const savingSessionStore = useSavingSessionStore()


const { savingSession } = storeToRefs(savingSessionStore)

const loading = ref<boolean>(false)

const create = async () => {

    loading.value = true

    try {

        await savingSessionStore.create()

        await savingSessionStore.filter()

        navigateTo('/savings')

    } finally {

        loading.value = false
    }
}

</script>