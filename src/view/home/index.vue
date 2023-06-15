<template>
  <n-layout :native-scrollbar="false" v-once>
    <div class="banner">
      <left-image v-if="imageis.left" class="left-image"/>
      <right-image v-if="imageis.right" class="right-image"/>
    </div>
    <n-el class="home-content">
      <div class="hc-title flex-fdc-alc-juc">
        <h2 class="hc-search">Search</h2>
        <n-input round placeholder="站内搜索">
          <template #suffix>
            <n-icon :component="FlashOutline"/>
          </template>
        </n-input>
      </div>
      <n-scrollbar style="max-height: calc(100vh - 64px - 140px)">
        <div class="hc-card">
          <home-navigation :route-array="homeCardRouteArray"></home-navigation>
        </div>
      </n-scrollbar>
    </n-el>
  </n-layout>
</template>

<script name="home" lang="ts" setup>
import LeftImage from './Left.vue'
import RightImage from './Right.vue'
import HomeNavigation from '@/components/HomeNavigation/index.vue'
import { FlashOutline } from '@vicons/ionicons5'
import { routeModuleList } from '@/router/routers'

const imageis = reactive({
  left: false,
  right: true
})

const homeCardRouteArray = computed(() => {
  return routeModuleList.filter(item => item.meta.homeShow)
})
</script>

<style lang="scss" scoped>
.banner {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  justify-content: center;
}

.banner::after {
  content: '';
  width: 100%;
  height: 64px;
}

.left-image {
  right: calc(50% + 270px);
  width: calc(50% - 270px);
  min-width: 440px;
}

.right-image {
  right: 0;
  width: 41vw;
  min-width: 440px;
}

/*@media only screen and (max-width: 1920px) {
  .left-image {
    right: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }

  .right-image {
    left: calc(50% + 270px);
    width: calc(50% - 270px);
    min-width: 440px;
  }
}

@media only screen and (min-width: 1920px) {
  .left-image {
    left: 0;
    width: 700px;
  }

  .right-image {
    right: 0;
    width: 700px;
  }
}*/

.left-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.right-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

/*@media only screen and (max-width: 1023px) {
  .banner {
    position: static;
    text-align: left;
    padding-left: 16px;
    transform: none;
    padding-top: 60px;
    padding-right: 16px;
    min-height: 550px;
    height: calc(100vh - 124px);
  }

  .left-image {
    position: relative;
    left: -16px;
    min-width: unset;
    width: 300px;
    top: 8px;
    transform: none;
  }
}*/

.home-content {
  position: fixed;
  width: calc(100vw - 41vw);
  height: calc(100vh - 64px);
  left: 0;
  top: 64px;

  .hc-title {
    width: 80%;
    height: 140px;
    padding: 0 10%;
  }

  .hc-search {
    margin-bottom: 10px;
    color: var(--text-color-2);
  }

  .hc-card {
    padding: 20px;
  }


}

.hc-card-item {
  ::v-deep(.n-tag) {
    padding: 0 calc(var(--n-height) / 3) 0 18px;
  }

  .hc-ci-header {
    height: 30px;
  }

  .hc-ci-content {
    padding: 10px 0 0 0;
  }

  .hc-cont-item {
    min-width: 171px;
    width: 300px;
    max-width: 300px;
    transition: all .3s linear;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
