# 引入代码块

``` vue
<script setup>
import content from './content.vue'
</script>

<template>
    <MdToVueLayout>
        <content />
    </MdToVueLayout>
</template>
```

::: details
This is a details block.
:::

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button @click="count++">Increment</button>