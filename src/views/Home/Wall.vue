<template>
    <LoadMore @loadMore="loadMoreCards">
        <!-- loading和cards-container相当于slot -->
        <div class="loading" ref="loadRef">
            <i class="iconfont icon-jiazai"></i>
        </div>
        <div class="cards-container" ref="cardsRef">
            <MiniCard v-for="(item, index) in cards" :data="item" @loadImage="loadImage" :key="index" />
        </div>
    </LoadMore>
</template>
<script setup>
import LoadMore from '@/components/LoadMore.vue';
import MiniCard from '@/components/MiniCard.vue';
import { getData } from '@/mock/getData';
import { wall } from '@/utils/wall';
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
const cards = ref([])
const cardsRef = ref(null)
let index = 0
const loadRef = ref(null)

const initCards = async () => {
    index = 0
    loadRef.value.style.height = "80px"
    loadRef.value.style.transition = "all 0.5s linear"
    const result = await getData(10)
    // 先将数据置空，避免load回调出错
    cards.value.splice(0, result.length)
    nextTick(() => {
        cards.value = result
        console.log(loadRef.value);
        loadRef.value.style.height = "0"
        loadRef.value.style.transition = "all 0.2s linear"
        // 等待0.2s剔除过渡效果，避免影响下拉的效果
        setTimeout(() => {
            loadRef.value.style.transition = "none"
        }, 200)
        // console.log("nextTick====>", result);
    })
}

// 图片加载完成，开始布局
const loadImage = () => {
    index++
    if (index === cards.value.length) {
        wall(cardsRef.value)
    }
}

const setWall = () => {
    wall(cardsRef.value)
}

// 上拉加载动画
onMounted(() => {
    initCards()
    // 是否在顶部
    const isTop = () => {
        return cardsRef.value.parentNode.parentNode.scrollTop === 0 ? true : false
    }
    let startY; //起码起始按下的位置
    let moved; //是否允许下拉刷新
    let isLoading = false; //数据是否在加载中
    cardsRef.value.addEventListener("touchstart", function (e) {
        if (isTop() && !isLoading) {
            startY = e.touches[0].pageY
            moved = true
        }
    })
    cardsRef.value.addEventListener("touchmove", function (e) {
        if (!isLoading) {
            const moveY = e.touches[0].pageY - startY //移动距离
            if (moved && moveY > 0) {
                e.preventDefault()
                if (moveY < 80) {
                    loadRef.value.style.height = `${moveY}px`
                } else {
                    loadRef.value.style.height = "80px"
                }
            }
        }
    }, { passive: false })
    cardsRef.value.addEventListener("touchend", async function (e) {
        if (moved && !isLoading) {
            const height = loadRef.value.offsetHeight
            if (height >= 80) {
                isLoading = true
                // 刷新数据
                await initCards()
                // console.log("下拉加载啦啦啦啦啦~~~~~~~");
                moved = false
                isLoading = false
                cardsRef.value.parentNode.parentNode.scrollTop = 0
            } else {
                loadRef.value.style.height = "0"
                loadRef.value.style.transition = "all 0.2s linear"
                // 等待0.2s剔除过渡效果，避免影响下拉的效果
                setTimeout(() => {
                    loadRef.value.style.transition = "none"
                }, 200)
            }
        }
    })

    // 添加瀑布流自适应
    window.addEventListener("resize", setWall)
})
const loadMoreCards = async (callback) => {
    const result = await getData(10)
    cards.value.push(...result)
    callback && callback()
}
onUnmounted(() => {
    window.removeEventListener("resize", setWall)
})


</script>
<style lang='scss' scoped>
.cards-container {
    position: relative;
}

.loading {
    height: 0;
    overflow: hidden;
    @include flexcc;

    .iconfont {
        animation: rotate 1s linear infinite;
    }
}
</style>