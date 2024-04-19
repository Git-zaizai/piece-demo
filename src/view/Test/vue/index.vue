<script setup lang="ts">

const shallowRefObj = shallowRef({
    name: 'aa'
})

function shallowupdate() {
    shallowRefObj.value.name = 'bb'
    console.log("🚀 ~ shallowupdate ~ value:", shallowRefObj.value)
}

const shallowRefStr = shallowRef('shallowRefStr')

function shallowRefStrupdate() {
    shallowRefStr.value = 'shallowRefStr aa'
    console.log("🚀 ~ shallowRefStrupdate ~ shallowRefStr:", shallowRefStr)
}

const refname = ref({
    name: 'ref'
})
function refupdate() {
    refname.value.name = 'refbb'
    console.log("🚀 ~ refupdate ~ refname:", refname)
}
</script>
<template>
    <div>
        {{ shallowRefObj.name }}
        <n-button @click="shallowupdate">shallowRefObj</n-button>
        {{ shallowRefStr }}
        <n-button @click="shallowRefStrupdate">shallowRefStr</n-button>
        {{ refname.name }}
        <n-button @click="refupdate">ref</n-button>
    </div>
</template>