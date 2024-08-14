<template>
  <div class="console">
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="工作台">
        <n-grid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
          <n-gi>
            <div class="flex items-center">
              <div>
                <n-avatar circle :size="64" :src="schoolboy" />
              </div>
              <div>
                <p class="px-4 text-xl">早安，Ah jung，开始您一天的工作吧！</p>
                <p class="px-4 text-gray-400">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
              </div>
            </div>
          </n-gi>
          <n-gi>
            <div class="flex justify-end w-full">
              <div class="flex flex-col justify-center flex-1 text-right">
                <span class="text-secondary">项目数</span>
                <span class="text-2xl">16</span>
              </div>
              <div class="flex flex-col justify-center flex-1 text-right">
                <span class="text-secondary">待办</span>
                <span class="text-2xl">3/15</span>
              </div>
              <div class="flex flex-col justify-center flex-1 text-right">
                <span class="text-secondary">消息</span>
                <span class="text-2xl">35</span>
              </div>
            </div>
          </n-gi>
        </n-grid>
      </n-card>
    </div>

    <div class="mt-4">
      <n-grid cols="1 s:2 m:3 l:4 xl:4 2xl:4" responsive="screen" :x-gap="12" :y-gap="8">
        <n-grid-item>
          <NCard title="访问量" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <template #header-extra>
              <n-tag type="success">日</n-tag>
            </template>
            <div class="flex justify-between px-1 py-1">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else :startVal="1" :endVal="visits.dayVisits" class="text-3xl" />
            </div>
            <div class="flex justify-between px-1 py-1">
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  日同比
                  <CountTo :startVal="1" suffix="%" :endVal="visits.rise" />
                  <n-icon size="12" color="#00ff6f">
                    <CaretUpOutlined />
                  </n-icon>
                </template>
              </div>
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  周同比
                  <CountTo :startVal="1" suffix="%" :endVal="visits.decline" />
                  <n-icon size="12" color="#ffde66">
                    <CaretDownOutlined />
                  </n-icon>
                </template>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-between">
                <n-skeleton v-if="loading" text :repeat="2" />
                <template v-else>
                  <div class="text-sn">总访问量：</div>
                  <div class="text-sn">
                    <CountTo :startVal="1" :endVal="visits.amount" />
                  </div>
                </template>
              </div>
            </template>
          </NCard>
        </n-grid-item>
        <n-grid-item>
          <NCard title="销售额" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <template #header-extra>
              <n-tag type="info">周</n-tag>
            </template>
            <div class="flex justify-between px-1 py-1">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else prefix="￥" :startVal="1" :endVal="saleroom.weekSaleroom" class="text-3xl" />
            </div>
            <div class="flex justify-between px-2 py-2">
              <div class="flex-1 text-sn">
                <n-progress type="line" :percentage="saleroom.degree" :indicator-placement="'inside'" processing />
              </div>
            </div>
            <template #footer>
              <div class="flex justify-between">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  <div class="text-sn">总销售额：</div>
                  <div class="text-sn">
                    <CountTo prefix="￥" :startVal="1" :endVal="saleroom.amount" />
                  </div>
                </template>
              </div>
            </template>
          </NCard>
        </n-grid-item>
        <n-grid-item>
          <NCard title="订单量" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <template #header-extra>
              <n-tag type="warning">周</n-tag>
            </template>
            <div class="flex justify-between px-1 py-1">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else :startVal="1" :endVal="orderLarge.weekLarge" class="text-3xl" />
            </div>
            <div class="flex justify-between px-1 py-1">
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  日同比
                  <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
                  <n-icon size="12" color="#00ff6f">
                    <CaretUpOutlined />
                  </n-icon>
                </template>
              </div>
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  周同比
                  <CountTo :startVal="1" suffix="%" :endVal="orderLarge.rise" />
                  <n-icon size="12" color="#ffde66">
                    <CaretDownOutlined />
                  </n-icon>
                </template>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-between">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  <div class="text-sn">转化率：</div>
                  <div class="text-sn">
                    <CountTo :startVal="1" suffix="%" :endVal="orderLarge.amount" />
                  </div>
                </template>
              </div>
            </template>
          </NCard>
        </n-grid-item>
        <n-grid-item>
          <NCard title="成交额" :segmented="{ content: true, footer: true }" size="small" :bordered="false">
            <template #header-extra>
              <n-tag type="error">月</n-tag>
            </template>
            <div class="flex justify-between px-1 py-1">
              <n-skeleton v-if="loading" :width="100" size="medium" />
              <CountTo v-else prefix="￥" :startVal="1" :endVal="volume.weekLarge" class="text-3xl" />
            </div>
            <div class="flex justify-between px-1 py-1">
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  月同比
                  <CountTo :startVal="1" suffix="%" :endVal="volume.rise" />
                  <n-icon size="12" color="#00ff6f">
                    <CaretUpOutlined />
                  </n-icon>
                </template>
              </div>
              <div class="text-sn">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  月同比
                  <CountTo :startVal="1" suffix="%" :endVal="volume.decline" />
                  <n-icon size="12" color="#ffde66">
                    <CaretDownOutlined />
                  </n-icon>
                </template>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-between">
                <n-skeleton v-if="loading" :width="100" size="medium" />
                <template v-else>
                  <div class="text-sn">总成交额：</div>
                  <div class="text-sn">
                    <CountTo prefix="￥" :startVal="1" :endVal="volume.amount" />
                  </div>
                </template>
              </div>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>

    <!--导航卡片-->
    <div class="mt-4">
      <n-grid cols="1 s:2 m:3 l:8 xl:8 2xl:8" responsive="screen" :x-gap="16" :y-gap="8">
        <n-grid-item v-for="(item, index) in iconList" :key="index">
          <NCard content-style="padding-top: 0;" size="small" :bordered="false">
            <template #footer>
              <n-skeleton v-if="loading" size="medium" />
              <div class="cursor-pointer" v-else>
                <p class="flex justify-center">
                  <span>
                    <n-icon :size="item.size" class="flex-1" :color="item.color">
                      <component :is="item.icon" v-on="item.eventObject || {}" />
                    </n-icon>
                  </span>
                </p>
                <p class="flex justify-center">
                  <span>{{ item.title }}</span>
                </p>
              </div>
            </template>
          </NCard>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DatabasePerson24Regular } from '@vicons/fluent'
import { ZoomCheck } from '@vicons/tabler'
import {
  CaretUpOutlined,
  CaretDownOutlined,
  UsergroupAddOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  CreditCardOutlined,
  MailOutlined,
  TagsOutlined,
  SettingOutlined
} from '@vicons/antd'
import CountTo from './components/CountTo.vue'

import { getMongoDb, getMySql } from '@/api'
import { waitTime } from '@/utils'

const schoolboy = new URL('@/assets/schoolboy.png', import.meta.url).href

interface State {
  mysql: {
    values: string
    biao: string
  }
  mongodb: {
    values: string
    biao: string
  }
}

const state = reactive<State>({
  mysql: {
    values: '',
    biao: '0'
  },
  mongodb: {
    values: '',
    biao: '0'
  }
})

const init = async () => {
  try {
    const mysql = await getMySql()
    const mongo = await getMongoDb()
    state.mysql.values = mysql.data.data.map(msv => msv.Tables_in_gadgets).join()
    state.mongodb.values = mongo.data.data.map((v: string) => v.split('.').pop()).join()
    state.mysql.biao = mysql.data.data.length
    state.mongodb.biao = mongo.data.data.length
  } catch (e) {
    console.log(e)
    state.mysql.biao = '获取 0'
    state.mongodb.biao = '获取 0'
  }
}

interface InVisits {
  dayVisits: number
  rise: number
  decline: number
  amount: number
}

interface InSaleroom {
  weekSaleroom: number
  amount: number
  degree: number
}

interface InOrderLarge {
  weekLarge: number
  rise: number
  decline: number
  amount: number
}

interface InVolume {
  weekLarge: number
  rise: number
  decline: number
  amount: number
}

const loading = ref(true)
const visits = ref({} as InVisits)
const saleroom = ref({} as InSaleroom)
const orderLarge = ref({} as InOrderLarge)
const volume = ref({} as InVolume)

// 图标列表
const iconList = [
  {
    icon: UsergroupAddOutlined,
    size: '32',
    title: '用户',
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: BarChartOutlined,
    size: '32',
    title: '分析',
    color: '#69c0ff',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: ShoppingCartOutlined,
    size: '32',
    title: '商品',
    color: '#ff9c6e',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: AccountBookOutlined,
    size: '32',
    title: '订单',
    color: '#b37feb',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: CreditCardOutlined,
    size: '32',
    title: '票据',
    color: '#ffd666',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: MailOutlined,
    size: '32',
    title: '消息',
    color: '#5cdbd3',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: TagsOutlined,
    size: '32',
    title: '标签',
    color: '#ff85c0',
    eventObject: {
      click: () => {}
    }
  },
  {
    icon: SettingOutlined,
    size: '32',
    title: '配置',
    color: '#ffc069',
    eventObject: {
      click: () => {}
    }
  }
]

onMounted(async () => {
  const data = await waitTime({
    visits: {
      dayVisits: 26823.52,
      rise: 63.3637,
      decline: 63.1363,
      amount: 754838.7468
    },
    saleroom: {
      weekSaleroom: 60512.77,
      amount: 460361.97,
      degree: 33.2372077456452
    },
    orderLarge: {
      weekLarge: 57632.12,
      rise: 76.86,
      decline: 83.70875,
      amount: 911692.73
    },
    volume: {
      weekLarge: 67539.56,
      rise: 69.82781557,
      decline: 78.11869,
      amount: 168665.74
    }
  })
  visits.value = data.visits
  saleroom.value = data.saleroom
  orderLarge.value = data.orderLarge
  volume.value = data.volume
  loading.value = false
})
</script>
<style scoped lang="scss">
.console {
  padding: 10px 10px 10px 20px;
}
.hecha {
  width: 24vw;
  height: 20vh;
  transition: all 0.3s ease;
}

.hecha:hover {
  transform: translateY(-4px) scale(1.2);
}

.db-tables {
  width: 45%;
}
</style>
