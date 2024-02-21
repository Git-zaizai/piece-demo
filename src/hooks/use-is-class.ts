import type { Ref } from 'vue'

interface UseIsClass {
    bool: Ref<boolean>
    name: Ref<any>
    setBool: (value: boolean) => void
    toggle: () => void
}

export default function useIsClass(classNameArr: any, initValue: boolean = false): UseIsClass {
    const bool = ref(initValue)
    const name = ref(initValue ? classNameArr : '')

    function setBool(value: boolean) {
        bool.value = value
        name.value = bool.value ? classNameArr : ''
    }

    function toggle() {
        setBool(!bool.value);
    }

    return {
        bool,
        name,
        setBool,
        toggle
    }
}