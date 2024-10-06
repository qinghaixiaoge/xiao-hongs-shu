<template>
    <div class="tabbar-container">
        <template v-for="(item, index) in menus" :key="index">
            <div class="tab-pub" v-if="item.path === '/publish'" @click="toPath(item.path)">
                <i class="iconfont icon-fabu"></i>
            </div>
            <div class="tab-name" v-else @click="toPath(item.path)" :class="{ active: item.path === path }">{{ item.name
                }}</div>
        </template>
    </div>
</template>
<script setup>
import routes from '@/router/routes';
import router from "@/router"
import { ref, watch } from 'vue';
const menus = routes
const path = ref("/")
const toPath = (p) => {
    router.push({ path: p })
    path.value = p
}
watch(() => router.currentRoute.value.path, (newValue) => {
    path.value = newValue
})


</script>
<style lang='scss' scoped>
.tabbar-container {
    // 根据首屏视口进行定位
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3rem;
    font-size: 0.9rem;
    background-color: white;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .tab-name {
        min-width: 10%;
        text-align: center;
        transition: all 0.1s linear;

        &.active {
            font-size: 1rem;
            font-weight: bold;
            color: rgb(51, 51, 51);
        }
    }

    .tab-pub {
        width: 3.125rem;
        height: 70%;
        border-radius: 20%;
        background-color: #e90f0f;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            color: #fff;
            font-size: 1.5rem;
        }
    }
}
</style>