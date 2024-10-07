<template>
    <div class="more-loading">
        <i class="iconfont icon-jiazai"></i>
    </div>
</template>
<script setup>

</script>
<style lang='scss' scoped>
.more-loading {
    height: 3rem;
    @include flexcc;

    .iconfont {
        animation: rotate 1s linear infinite;
    }
}
</style>