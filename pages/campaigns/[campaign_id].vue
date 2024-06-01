<template>
  <v-container>

    <div class="text-3xl font-semibold mb-4">دورة التقوية</div>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="flex items-center gap-2">
                  <div>:اسم الدورة</div>
                  <v-chip color="primary">دورة التقوية</v-chip>
                </div>
              </v-col>

              <v-col cols="6">
                <div class="flex items-center gap-2">
                  <div>تاريخ الدورة:</div>
                  <v-chip color="blue">12-2-2003</v-chip>

                  <v-icon>mdi-arrow-left</v-icon>

                  <v-chip color="blue">12-2-2005</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>


      <v-col cols="12 mt-6">

        <div class="flex justify-between items-center mb-4">
            <div class="text-2xl font-semibold">مدرسو الدورة</div>
            <v-btn>إضافة مدرس</v-btn>
        </div>

        <v-row>
            <v-col cols="4">
                <teacher-card></teacher-card>
            </v-col>

            <v-col cols="4">
                <teacher-card></teacher-card>
            </v-col>

            <v-col cols="4">
                <teacher-card></teacher-card>
            </v-col>
        </v-row>

      </v-col>

      <v-col cols="12 mt-6">
        <div class="flex justify-between items-center mb-4">
            <div class="text-2xl font-semibold">مناهج الدورة</div>
            <v-btn>إضافة مقرر</v-btn>
        </div>

        <v-row>
            <v-col cols="4">
                <syllabus-card></syllabus-card>
            </v-col>

            <v-col cols="4">
                <syllabus-card></syllabus-card>
            </v-col>

            <v-col cols="4">
                <syllabus-card></syllabus-card>
            </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>
