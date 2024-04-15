<template>
    <div class="custom-tab-bar">
        <div class="tab-bar-group">
            <div v-for="(item, index) in tabList" :key="index" class="tab-bar-group-item"
                :class="{ 'tab-bar-group-item-active': selectTabIndex === index }"
                @click="handleClickTab($event, item, index)">
                <span class="item__icon">
                    <svg :width="iconSize" :height="iconSize" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path v-for="(itemName, idx) in item.iconPaths" :key="idx" :d="itemName"
                            :stroke-width="strokeWidth" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                        <circle v-if="selectTabIndex === index" class="point" cx="42" cy="16" :fill="selectColor">
                        </circle>
                    </svg>
                </span>
                <p class="item__title">{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

interface TabBar {
    name: string
    iconPaths: string[]
}

const emits = defineEmits(['click'])
const props = defineProps({
    tabList: {
        type: Array as PropType<TabBar[]>,
        default: () => []
    },
    defaultSelectIndex: Number,
    color: {
        type: String,
        default: '#4c4c4c'
    },
    selectColor: {
        type: String,
        default: '#FB7800'
    },
    iconSize: {
        type: Number,
        default: 22
    },
    strokeWidth: {
        type: Number as PropType<2 | 3 | 4>,
        default: 3
    }
})

const selectTabIndex = ref(props.defaultSelectIndex)

function handleClickTab(event: Event, tabItem: TabBar, index: number) {
    if (index === selectTabIndex.value) return
    const target = event.currentTarget as Element
    const paths = target.querySelectorAll('path')
    paths.forEach((path: SVGPathElement) => {
        const totalLength = path.getTotalLength()
        path.style.setProperty('--tl', `${totalLength}px`)
    })
    selectTabIndex.value = index
    emits('click', tabItem)
}
</script>

<style lang="scss" scoped>
.custom-tab-bar {
    width: 100%;

    .tab-bar-group {
        width: 100%;
        border-radius: 12px;
        display: flex;
        height: 68px;
        align-items: center;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
        box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.05);

        &-item {
            flex: 1;
            justify-content: center;
            cursor: pointer;
            user-select: none;

            .item__title {
                color: v-bind(color);
                margin-top: 4px;
                font-size: 14px;
                text-align: center;
                transition: 0.3s;
            }

            .item__icon {
                display: flex;
                justify-content: center;

                path {
                    stroke: v-bind(color);
                    transition: 0.3s;
                }
            }

            &-active {
                .item__title {
                    color: v-bind(selectColor);
                }

                .item__icon {
                    path {
                        stroke-dasharray: var(--tl);
                        stroke-dashoffset: var(--tl);
                        stroke: v-bind(selectColor);
                        animation: stroke 0.5s ease-in-out forwards;
                    }

                    .point {
                        animation: size 0.3s ease-in forwards;
                        animation-delay: 0.5s;
                    }
                }

                @keyframes stroke {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes size {
                    0% {
                        r: 0
                    }

                    10% {
                        r: 1
                    }

                    20% {
                        r: 2
                    }

                    40% {
                        r: 4
                    }

                    60% {
                        r: 8
                    }

                    80% {
                        r: 6
                    }

                    90% {
                        r: 8
                    }

                    100% {
                        r: 6
                    }
                }
            }
        }
    }
}
</style>