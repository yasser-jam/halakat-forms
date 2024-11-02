<template>
    <div class="w-full mt-2">
      <div
        class="st-image-input rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center relative elevation-8 mx-auto w-full"
        :style="`height: ${props.size}px; width: ${
          props.fullWidth || `${props.size}px`
        }`"
      >
        <div v-if="loading">
          <v-progress-circular indeterminate color="light" />
        </div>
  
        <v-img
          v-else
          class="flex justify-center w-full h-full rounded-lg overflow-hidden"
          :cover="!props.contain"
          :src="url"
        />
  
        <input
          ref="image"
          type="file"
          class="d-none"
          accept="image/*"
          @change="onImageChange"
        />
  
        <v-fade-transition group>
          <v-btn
            v-if="!loading"
            key="1"
            v-bind="actionProps"
            class="white -left-[16px] -top-[16px] position-absolute"
            @click="pickImage"
          >
            <v-icon color="secondary"> mdi-pencil </v-icon>
          </v-btn>
  
          <v-btn
            v-if="!loading && props.modelValue"
            key="2"
            v-bind="actionProps"
            class="white -left-[16px] -bottom-[16px] position-absolute"
            @click="removeImage"
          >
            <v-icon color="error"> mdi-close </v-icon>
          </v-btn>
        </v-fade-transition>
      </div>
      <div
        class="v-messages__message mr-0 mt-2 text-[12px]"
        :class="props.errorClass"
      >
        {{ props.error }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const toasterStore = useToasterStore()
  const fileStore = useFileStore()
  
  const image = ref(null)
  const loading = ref(false)
  const defaultPlaceholderUrl = ref('/images/no-result.svg')
  
  const emit = defineEmits(['update:modelValue'])
  
  const props = defineProps({
    modelValue: { type: [String, null], default: null },
    path: { type: String, required: true },
    placeholderUrl: { type: String, default: null },
    size: { type: [String, Number], default: 150 },
    fullWidth: { type: Boolean, default: false },
    contain: { type: Boolean, default: false },
    error: { type: [String, null], default: null },
    errorClass: { type: String, default: '' }
  })
  
  const actionProps = computed(() => {
    return {
      icon: true,
      size: 'x-small',
      elevation: 16,
      color: 'white'
    }
  })
  
  const url = computed(() => {
    if (props.modelValue) return props.modelValue
    else return props.placeholderUrl || defaultPlaceholderUrl.value
  })
  
  // On Image Change
  const onImageChange = () => {
    if (image.value.files.length === 1) {
      uploadImage()
    }
  }
  
  // Upload Image
  const uploadImage = async () => {
    try {
      loading.value = true
  
      let path = await fileStore.uploadFile(image.value.files[0], props.path)
  
      loading.value = false
  
      emit('update:modelValue', path)
  
      // show success toaster message
      toasterStore.showSuccessToaster('تم رفع الصورة بنجاح')
    } catch (err) {
      loading.value = false
  
      // todo: show error toaster message
      toasterStore.showErrorToaster('حدث خطأ أثناء رفع الصورة')
    }
  }
  
  const pickImage = () => {
    image.value.click()
  }
  
  const removeImage = () => {
    emit('update:modelValue', null)
  
    // remove the value from hiddent image input so when we reupload the same image it will recognize it as new one and trigger 'change' event
    image.value.value = ''
  }
  </script>
  
  <style lang="scss" scoped>
  .st-image-input {
    .v-btn--size-x-small {
      --v-btn-height: 16px;
    }
  }
  </style>
  