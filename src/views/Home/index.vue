<template>
  <div class="home-container">
    <div class="home-swiper-head">
      <i class="iconfont icon-tiantianquan"></i>
      <div class="swiper-name" ref="moduleRef">
        <span v-for="(item, index) in moduleList" :class="{ active: moduleIndex === index }" @click="changeSwiper(index)">{{ item }}</span>
        <div class="red-line" ref="redLineRef">
          <div></div>
        </div>
      </div>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <swiper @swiper="onSwiper" @slideChange="onSlideChange" @progress="onProgress" :initialSlide="moduleIndex"
      class="my-swiper">
      <swiper-slide>
        <div class="slide-content">1</div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide-content">
          <!-- 瀑布流 -->
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="slide-content">3</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
const moduleList = ref(["关注", "发现", "附近"])
let mySwiper = null;
let moduleIndex = ref(1)
const onSwiper = (swiper) => {
  mySwiper = swiper
}
const onSlideChange = ({ activeIndex }) => {
  moduleIndex.value = activeIndex
}
const onProgress = ({ progress }) => {
  /* if (spanLeftArray.length === 0) return
  if (progress < 0 || progress > 1) return
  // 需要处理progress为1时，计算indexF为2的情况
  if (progress === 1) {
    redLineRef.value.style.transform = `translateX(${spanLeftArray[spanLeftArray.length - 1]}px)`
    redLineRef.value.children[0].style.transform = `scaleX(1)`
    return
  }
  // 动态计算红线偏移量
  const indexF = progress * (spanLeftArray.length - 1)
  // 向下取整【拉太快，progress可能更新不过来，但是不影响】
  const index = Math.floor(indexF)
   // 计算动态left值【index为2时就报错了，设置临界点处理】
  const left = spanLeftArray[index] + (spanLeftArray[index + 1] - spanLeftArray[index]) * (indexF - index)
  const maxScale = 1.5
  const gap = indexF - index // gap始终是正数
  let scale = gap <= 0.5 ? gap : 1 - gap
  scale = scale * maxScale + 1
  redLineRef.value.children[0].style.transform = `scaleX(${scale})` */

  if (spanLeftArray.length === 0) return
  if (progress < 0 || progress > 1) return
  // 动态计算红线偏移量
  const indexF = progress * (spanLeftArray.length - 1)
  const index = Math.floor(indexF)
  // 计算动态left值【解决index为2时报错的情况】
  const left = spanLeftArray[index] + distance.value * (indexF - index)
  redLineRef.value.style.transform = `translateX(${left}px)`
  const maxScale = 1.5
  const gap = indexF - index // gap始终是正数
  let scale = gap <= 0.5 ? gap : 1 - gap
  scale = scale * maxScale + 1
  redLineRef.value.children[0].style.transform = `scaleX(${scale})`
}
// 计算红线在每个点中心的位置
const redLineRef = ref(null)
const moduleRef = ref(null)
const spanLeftArray = []
const distance = ref(0)
const getRedLineCenter = () => {
  const spanArray = moduleRef.value.querySelectorAll("span")
  const redLineWidth = redLineRef.value.offsetWidth
  spanArray.forEach((span, index) => {
    const spanRect = span.getBoundingClientRect()
    const spanLeft = spanRect.left
    const spanWidth = spanRect.width
    spanLeftArray.push(spanLeft + (spanWidth - redLineWidth) / 2)
  })
  distance.value = spanLeftArray[1] - spanLeftArray[0]
}

// 自适应，重新计算红线在每个点中心的位置
const refreshSpanLeftArray = () => {
  spanLeftArray.length = 0
  getRedLineCenter()
}
// 点击滑动，onProgress事件只会触发一次
const changeSwiper = (index)=>{
  mySwiper?.slideTo(index)
  moduleIndex.value = index
}
onMounted(() => {
  getRedLineCenter()
  onProgress({ progress: moduleIndex.value / (spanLeftArray.length - 1) })
  window.addEventListener("resize", refreshSpanLeftArray)
})
onUnmounted(() => {
  console.log("销毁监听事件");
  window.removeEventListener("resize", refreshSpanLeftArray)
})
</script>
<style lang='scss' scoped>
.home-container {
  .home-swiper-head {
    height: 3rem;
    @include flexbc;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1rem;
    z-index: 999;
    background-color: white;

    .iconfont {
      font-size: 1.2rem;
      color: rgb(51, 51, 51);

      &:first-child {
        color: rgb(248, 230, 28);
      }
    }

    .swiper-name {
      display: flex;
      span {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;

        &.active {
          color: rgb(51, 51, 51);
          scale: 1.15;
          font-weight: bold;
        }
      }

      .red-line {
        position: absolute;
        bottom: 0.225rem;
        left: 0;
        transition: all 0.2s linear;

        div {
          width: 1.875rem;
          height: 0.2rem;
          border-radius: 0.2rem;
          background-color: red;
        }
      }
    }
  }

  .my-swiper {
    height: 100vh;
    background-color: rgb(249, 250, 249);

    .slide-content {
      height: 50vh;
      background-color: red;
      @include flexcc;
    }
  }

}
</style>