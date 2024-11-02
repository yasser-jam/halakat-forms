import { defineStore, storeToRefs } from 'pinia'

export const useFileStore = defineStore('file', () => {
  const files = ref([])

  const toasterStore = useToasterStore()

  const uploadFile = async (file: File, type: String) => {
    try {
      const formData: any = new FormData()

      formData.append('file', file)
      formData.append('type', type)

      const res: any = await api('/local-files/', {
        method: 'POST',
        body: formData
      })

      return 'https://' + res?.path
    } catch (err) {
      throw err
    }
  }

  const uploadDocument = async (
    file: File,
    course_id: number,
    syllabus_id: number
  ) => {
    try {
      const formData: any = new FormData()

      formData.append('file', file)
      formData.append('course_id', course_id)
      formData.append('syllabus_id', syllabus_id)

      const res: any = await api('/local-files/upload-course-file', {
        method: 'POST',
        body: formData
      })

      return res?.uid
    } catch (err) {
      throw err
    }
  }

  const uploadVideo = async (file: File) => {
    try {
      const formData: any = new FormData()

      formData.append('file', file)

      const res: any = await api('/local-files/upload-post-video', {
        method: 'POST',
        body: formData
      })

      toasterStore.showSuccessToaster('تم رفع الفيديو بنجاح')

      return 'https://' + res?.path
    } catch (err) {
      throw err
    }
  }

  const list = async () => {
    try {
      files.value = await api('/local-files/get-private')
    } catch { }
  }

  return { uploadFile, uploadDocument, uploadVideo, list, files }
})
