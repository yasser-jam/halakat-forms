<template>
  <div class="w-[80%] px-12 py-24 rounded-lg bg-white">
    <div class="text-4xl text-primary font-weight-bold text-center mb-12">
      تسجيل الدخول
    </div>

    <div>
      <base-label>اسم المستخدم</base-label>
      <v-text-field
        v-model="userName"
        prepend-inner-icon="mdi-account"
        placeholder="أدخل اسم المستخدم"
        color="primary"
        class="mb-4"
      ></v-text-field>
    </div>

    <div>
      <base-label>كلمة المرور</base-label>
      <v-text-field
        v-model="password"
        prepend-inner-icon="mdi-lock"
        type="password"
        placeholder="********"
      ></v-text-field>
    </div>

    <div class="flex justify-center">
      <v-btn color="primary" size="large" class="mt-4 mx-auto" @click="login"
        >تسجيل الدخول</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const authStore = useAuthStore();
const toasterStore = useToasterStore();

const router = useRouter();

const { toasterMsg, toasterShow } = storeToRefs(toasterStore);

const userName = ref<string>('');
const password = ref<string>('');

const loading = ref<boolean>(false);

const users = ref([
  {
    userName: 'عمار عنوز',
    password: 'password',
  },
  {
    userName: 'محمد خير',
    password: 'password',
  },
  {
    userName: 'ياسر جمال الدين',
    password: 'password',
  },
]);

const login = async () => {
  loading.value  = true
  
  try {
    await authStore.login(userName.value, password.value);

    router.push('/');
  } finally {
    loading.value = false;
  }
};
</script>
