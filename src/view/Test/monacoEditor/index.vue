<script setup lang="ts" name="monacoEditor-view">
// import monacoEditorloader from './monacoEditor-loader.vue'
// import monacoEditor from './monaco-editor.vue'
import { useToggle } from '@vueuse/core'
import editor from './editor.vue'
const [show, toggle] = useToggle()
const [editorshow, editorshowToggle] = useToggle(false)

/* watchEffect(() => {
    console.log(editorshow.value);
}) */
const value = `{
    "id": "chatcmpl-8da0vrLedDSZjJjkkca732HLS7ZoX",
    "object": "chat.completion",
    "created": 1704443921,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
      {
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "原材料面的利空因素给价格带来了持续下滑的压力。在国庆假期期间，原油大幅下跌，导致节后纯苯和苯乙烯价格补跌，再加上PS石化厂家的调降，市场的重心出现下滑。虽然部分透苯装置有一定恢复，但仍有个别减产，供应增长幅度有限。PS价格的震荡主要是由于苯乙烯走势不明朗，部分料现货供应紧张，这对价格起到了一定支撑作用。然而，部分装置增产，一些商家出货时有所让利。在供需相对平衡的情况下，PS价格的下跌幅度有限。到了11月份，原油的跌幅明显，苯乙烯连续走低，PS石化厂家也调降价格，这对市场氛围造成了冲击。叠加上PS供应紧张局面有所缓解，商家出货意愿较强。月中旬，一些大装置计划停车的消息引发了苯乙烯期现同步飙涨，进而推高了PS价格。供应紧张局面有所缓解，但需求增长乏力，再加上苯乙烯大幅回落，商家的心态承压，继续拖累市场的重心。年末PS价格出现了小幅反弹，收尾时成本的支撑转强。进入12月份，原油下跌，苯乙烯呈弱势下滑后窄幅反弹，并回归震荡。成本方面重心有所下探，叠加上PS石化厂家的调降，市场价格出现下滑。虽然在苯乙烯小幅上涨后出现了震荡，部分商家也有小幅上调价格，但供应不断增长，市场成交不佳，局部价格略有松动。到了月中下旬，成本面的支撑较强，带动了PS价格的小幅上行，然而供应恢复持续，市场成交整体仍然不佳，一些商家的报盘也略有降低。展望2024年第一季度，前期PS装置逐步恢复投产，再加上新装置的投产预期，供需矛盾难以改善。受春节假期的影响，一些装置可能会降低负荷，但是节后库存将上升，直到下游需求恢复，PS价格可能会有小幅上行的可能性，我们仍然需要关注苯乙烯和宏观消息的指引。点击下方图片，了解2023年金联创年报。免责声明：以上内容仅供参考，不构成投资建议。如因文中观点造成经济损失，本单位概不负责。有关转载、投稿及合作事宜，请回复关键字“转载”或“投稿”。"
        },
        "logprobs": null,
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 1044,
      "completion_tokens": 915,
      "total_tokens": 1959
    },
    "system_fingerprint": null
  }
  `
</script>
<template>
    <div class="viwe">
        <div class="w-100">
            <n-button type="primary" @click="toggle">
                切换编辑器
            </n-button>
            &emsp;
            <n-button type="primary" @click="() => editorshowToggle()">
                打开编辑窗口
            </n-button>
        </div>
        <!-- <monacoEditorloader/> -->
        <!--    <monacoEditorloader v-if="show" />
        <monacoEditor v-else /> -->
        <editor v-model:show="editorshow" :value="value" language="json" />
    </div>
</template>
<style scoped lang="scss">.viwe {
    height: $layout-content;
}</style>