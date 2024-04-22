<script setup lang="ts">
function useNumberAnimation(
    start: number,
    end: number,
    duration: number,
    onProgress: (value: number) => void
) {
    let value = start
    const speed = (end - start) / duration
    const startTime = Date.now()
    const run = () => {
        const t = Date.now() - startTime
        if (t >= duration) {
            value = end
            onProgress?.(value)
            return
        }
        value = start + t * speed
        onProgress?.(value)
        requestAnimationFrame(run)
    }
    run()
}

function useNumberAnimationRet(start: number,
    end: number,
    duration: number,
    onProgress: (value: number) => void) {
    let value = start
    const speed = (end - start) / duration
    const startTime = Date.now()
    const run = () => {
        const t = Date.now() - startTime
        if (t >= duration) {
            value = end
            onProgress?.(value)
            return
        }
        value = start + t * speed
        onProgress?.(value)
        requestAnimationFrame(run)
    }
    return run
}

const sum = ref(0)
useNumberAnimation(0, 30000, 5000, v => {
    sum.value = v
})
</script>
<template>
    <div class="flex-alc-juc" style="height: 80vh;">
        <div class="content flex-alc-juc">
            {{ sum }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.content {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 15px;
}
</style>