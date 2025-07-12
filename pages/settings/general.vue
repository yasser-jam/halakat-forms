<template>
  <v-card>
    <v-card-text>
      <div class="text-xl font-semibold mb-6">المعلومات العامة</div>
      
      <v-row v-if="campaign">
        <v-col cols="12">
          <base-label>اسم الدورة</base-label>
    
          <v-text-field v-model="campaign.name" placeholder="اسم الدورة" />
        </v-col>
    
        <v-col cols="12" md="6">
          <base-label>تاريخ البداية</base-label>
    
          <base-datepicker v-model="campaign.start_date" />
        </v-col>
    
        <v-col cols="12" md="6">
          <base-label>تاريخ النهاية</base-label>
    
          <base-datepicker v-model="campaign.end_date" />
        </v-col>
    
        <v-col cols="12">
          <base-label>تحديد وقت الدوام عن طريق</base-label>
    
          <v-select
            v-model="campaign.timing_approach"
            :items="[
              { title: 'الساعات', value: 'hours' },
              { title: 'أوقات الصلاة', value: 'pray_time' }
            ]"
            item-title="title"
            item-value="value"
          />
        </v-col>
    
        <v-col cols="12">

          <base-label>أيام الدورة</base-label>

          <sys-days-select v-model="campaign.days"></sys-days-select>

        </v-col>

        <v-col cols="12" md="6">
          <base-label>وقت البداية</base-label>
    
          <v-text-field
            v-if="campaign.timing_approach === 'hours'"
            v-model="campaign.start_time"
            type="time"
            placeholder="وقت البداية"
          />
          <v-select
            v-else
            v-model="campaign.start_time"
            :items="[
              { title: 'الفجر', value: 'FAJR' },
              { title: 'الشروق', value: 'SUNRISE' },
              { title: 'الظهر', value: 'DHUHR' },
              { title: 'العصر', value: 'ASR' },
              { title: 'المغرب', value: 'MAGHRIB' },
              { title: 'العشاء', value: 'ISHA' }
            ]"
            item-title="title"
            item-value="value"
            placeholder="اختر وقت البداية"
          />
        </v-col>
    
        <v-col cols="12" md="6">
          <base-label>وقت النهاية</base-label>
    
          <v-text-field
            v-if="campaign.timing_approach === 'hours'"
            v-model="campaign.end_time"
            type="time"
            placeholder="وقت النهاية"
          />
          <v-select
            v-else
            v-model="campaign.end_time"
            :items="[
              { title: 'الفجر', value: 'FAJR' },
              { title: 'الشروق', value: 'SUNRISE' },
              { title: 'الظهر', value: 'DHUHR' },
              { title: 'العصر', value: 'ASR' },
              { title: 'المغرب', value: 'MAGHRIB' },
              { title: 'العشاء', value: 'ISHA' }
            ]"
            item-title="title"
            item-value="value"
            placeholder="اختر وقت النهاية"
          />
        </v-col>
    
        <v-col cols="12">
          <base-switch-input
            v-model="campaign.is_campaign_continuous"
            title="الدورة مستمرة"
            subtitle="في حال كانت الدورة مستمرة سيتم نقل الحلقات تلقائياً وإلغاء تاريخ النهاية"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script setup lang="ts">
const campaignStore = useCampaignStore();

const { campaign } = storeToRefs(campaignStore);
</script>
