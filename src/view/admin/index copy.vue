<template>
  <div class="console">
    <div class="flex-alc">
      <n-card class="suspension" title="需求公告栏"> 公告，无，需要懒得记录了 </n-card>
      <img class="hecha suspension" src="../../assets/coffee.svg" />
    </div>
    <div class="flex-juspb-alc">
      <n-card class="db-tables suspension" title="MySQL">
        <template #header-extra>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon size="20" class="view-curspointer">
                <ZoomCheck />
              </n-icon>
            </template>
            点击查看表
          </n-tooltip>
        </template>
        <div class="flex-alc">
          <n-icon size="36">
            <DatabasePerson24Regular />
          </n-icon>
          <n-gradient-text style="margin-left: 20px" :size="24" type="success">
            {{ state.mysql.biao }} 个表
          </n-gradient-text>
        </div>
        <template #footer>
          {{ state.mysql.values }}
        </template>
      </n-card>

      <n-card class="db-tables suspension" title="MongoDB">
        <template #header-extra>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon color="" size="20" class="view-curspointer">
                <ZoomCheck />
              </n-icon>
            </template>
            点击查看表
          </n-tooltip>
        </template>
        <div class="flex-alc">
          <n-icon size="36">
            <DatabasePerson24Regular />
          </n-icon>
          <n-gradient-text style="margin-left: 20px" :size="24" type="success">
            {{ state.mongodb.biao }} 个表
          </n-gradient-text>
        </div>
        <template #footer>
          {{ state.mongodb.values }}
        </template>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DatabasePerson24Regular } from '@vicons/fluent'
import { ZoomCheck } from '@vicons/tabler'
import { getMongoDb, getMySql } from '@/api'

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
init()
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
