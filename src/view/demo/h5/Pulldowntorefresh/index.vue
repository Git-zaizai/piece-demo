<template>
  <div class="pull" :style="cssVars">
    <pull-down-to-refresh :on-down="dropdownFn" :on-pull="onPullupLoading" :bottomLoading="active">
      <n-list hoverable clickable>
        <n-list-item v-for="(item, index) in list" :key="item.id">
          <n-card>
            <template #header>
              <n-avatar size="large" :src="item.author.avatar_url" class="mr-20" />
              <span>{{ item.title }}</span>
            </template>
            {{ item.content }}
            <template #footer> create_at: {{ dayjs(item.create_at).format('YYYY-MM-DD HH:mm:ss') }} </template>
            <template #action>
              <p>last_reply_at: {{ dayjs(item.last_reply_at).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </template>
          </n-card>
        </n-list-item>
      </n-list>
    </pull-down-to-refresh>
    <div style="position: fixed; right: 2vh; top: 10vh">
      <div>
        <n-switch v-model:value="active" />
        <span>上拉 true 触底 false</span>
      </div>
    </div>
    <!-- <Pulldowntorefresh2>
			<n-list hoverable clickable>
				<n-list-item v-for="(item, index) in list" :key="index">
					{{ item.text }}
				</n-list-item>
			</n-list>
		</Pulldowntorefresh2> -->
  </div>
</template>
<script setup lang="ts">
import PullDownToRefresh from './Pulldowntorefresh.vue'
import Pulldowntorefresh2 from './Pulldowntorefresh2.vue'
import { isMobile } from '@/utils'
import { http } from '@/api'
import dayjs from 'dayjs'
import { useThemeVars } from 'naive-ui'

defineOptions({
  name: 'Pulldowntorefresh'
})

const naiveTheme = useThemeVars()
const cssVars = computed(() => {
  return {
    '--border-color': naiveTheme.value.borderColor,
    '--view-color': naiveTheme.value.tableHeaderColor
  }
})

onMounted(() => {
  if (!isMobile()) {
    window.$message.warning('请切换到手机端，\n web端无法操作，\n 样式也可能有问题', {
      closable: true,
      duration: 0,
      showIcon: true
    })
  }
  // dropdownFn(() => {})
})
const list = ref<any[]>([])
const active = ref(false)

const dropdownFn = async dropdownCallback => {
  const topics = await http.get('https://cnodejs.org/api/v1/topics', {
    params: {
      page: 1,
      tab: 'ask',
      limit: 10,
      mdrender: false
    }
  })

  list.value = topics.data.data.map((v, _) => {
    if (v.content.length > 100) {
      v.content = v.content.slice(0, 50)
    }
    return v
  })
  setTimeout(() => dropdownCallback(), 1500)
}

let page = 1
const onPullupLoading = async callbcak => {
  const topics = await http.get('https://cnodejs.org/api/v1/topics', {
    params: {
      page: page,
      tab: 'ask',
      limit: 3,
      mdrender: false
    }
  })

  const data = topics.data.data.map((v, _) => {
    if (v.content.length > 100) {
      v.content = v.content.slice(0, 50)
    }
    return v
  })

  setTimeout(() => {
    list.value = list.value.concat(data)
    if (page > 3) {
      callbcak(4)
    } else {
      callbcak()
    }

    page++
  }, 1500)
}
</script>
<style scoped lang="scss">
.pull {
  height: calc(100vh - (64px));
  background-color: var(--border-color);
}
</style>
