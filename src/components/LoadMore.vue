<template>
    <div class="loadmore-container" ref="loadmoreRef">
      <div class="outer">
        <!-- loading和cards-container相当于slot -->
        <slot></slot>
        <Loading v-show="isBottomLoad"/>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const loadmoreRef = ref(null)
const emit = defineEmits(["loadMore"])
const isBottomLoad = ref(false)
import Loading from "./Loading.vue"
// 上拉加载动画
onMounted(() => {
  // 下拉加载更多
  let nowScrollHeight;
  loadmoreRef.value.addEventListener("scroll", async function (e) {
    const scrollTop = this.scrollTop
    const scrollHeight = this.scrollHeight
    const clientHeight = this.clientHeight
    if ((Math.ceil(scrollTop + clientHeight) >= scrollHeight) && !isBottomLoad.value) {
      if (nowScrollHeight !== scrollHeight) {
        console.log("触底");
        nowScrollHeight = scrollHeight
        isBottomLoad.value = true
        // 加载更多
        emit("loadMore",()=>{
            isBottomLoad.value = false
        })
      }
    }
  })
})

</script>

<style lang='scss' scoped>
.loadmore-container {
    /* 避免子元素的margin影响 */
    overflow: auto;
    height: 100%;
    .outer {
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
}
</style>