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
  layout: "auth",
});

const toasterStore = useToasterStore()

const router = useRouter();

const { toasterMsg, toasterShow } = storeToRefs(toasterStore);

const userName = ref<string>("");
const password = ref<string>("");

const loading = ref<boolean>(false)

const users = ref([
  {
    userName: "عمار عنوز",
    password: "password",
  },
  {
    userName: "محمد خير",
    password: "password",
  },
  {
    userName: "ياسر جمال الدين",
    password: "password",
  },
]);

const token = useCookie("halakat_access_token");

const login = async () => {
  const selectedUser = users.value.find(
    (user) => user.userName == userName.value && user.password == password.value
  );

  try {
    // await authStore.login(userName.value, password.value)
    if (selectedUser) {
      token.value = "123456";

      toasterStore.success("تم تسجيل الدخول بنجاح");

      router.push("/");
    } else {
      toasterStore.error("يوجد خطأ في اسم المستخدم أو كلمة المرور");
    }
  } finally {
    loading.value = false;
  }
};
</script>
