export const useToasterStore = defineStore('toast', () => {

    const toasterShow = ref<boolean>(false)
    const toasterMsg = ref<string>('')
    const toasterColor = ref<'primary' | 'error'>('primary')

    const showToaster = (msg: string) => {
        toasterShow.value = true
        toasterMsg.value = msg
    }

    const success = (msg: string) => {
        toasterColor.value = 'primary'

        showToaster(msg)
    }

    const error = (msg: string) => {
        toasterColor.value = 'error'

        showToaster(msg)
    }

    return {
        toasterShow,
        toasterMsg,
        toasterColor,
        success,
        error
    }
})