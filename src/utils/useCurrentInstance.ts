// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

export default function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy
    }
}