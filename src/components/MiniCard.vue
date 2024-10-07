<template>
    <div class="minicard-container">
        <div class="card-top">
            <div class="card-tri-bg" v-if="data.isVideo">
                <svg viewBox="-70 -50 200 300" class="card-svg">
                    <polygon class="card-tri" storke-linejoin="round" points="0,0 0,200 170,100"></polygon>
                </svg>
            </div>
            <img :src="data.imageUrl" class="card-source">
        </div>
        <div class="card-title">{{ data.content }}</div>
        <div class="card-bottom">
            <div class="card-left">
                <img :src="data.avatar" class="card-hard" @load="emit('loadImage')">
                <div class="card-name">{{ data.author }}</div>
            </div>
            <div class="card-right">
                <i class="iconfont icon-aixin"></i>
                <p class="card-like" v-if="data.likeCount">{{ data.likeCount }}</p>
                <p class="card-like" v-else>赞</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["data"])
const emit = defineEmits(["loadImage"])
</script>
<style lang='scss' scoped>
.minicard-container {
    position: absolute;
    width: 50%;
    height: auto;
    background-color: #fefefe;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem rgba(181, 181, 191, 0.1);
    overflow: hidden;

    .card-top {
        position: relative;

        .card-tri-bg {
            position: absolute;
            right: 0.6rem;
            top: 0.6rem;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, .2);
            @include flexcc;

            .card-svg {
                width: 0.8rem;
                height: 0.8rem;

                .card-tri {
                    fill: rgb(254, 254, 254);
                    stroke: rgb(254, 254, 254);
                    stroke-width: 50;
                }
            }
        }

        .card-source {
            width: 100%;
        }
    }

    .card-title {
        width: calc(100% - 1rem);
        font-size: 0.7rem;
        letter-spacing: 0.05rem;
        color: rgb(51, 51, 51);
        line-height: 1.2rem;
        padding: 0 0.5rem;
        font-weight: bold;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .card-bottom {
        @include flexbc;
        padding: 0.8rem 0.5rem;

        .card-left {
            @include flexsc;

            .card-hard {
                width: 1.2rem;
                height: 1.2em;
                border-radius: 50%;
                background-size: cover;
            }

            .card-name {
                color: rgb(51, 51, 51);
                font-size: 0.6rem;
                margin-left: 0.4rem;
            }
        }

        .card-right {
            @include flexsc;

            .iconfont {
                font-size: 0.6rem;
                color: rgb(51, 51, 51);
            }

            .card-like {
                margin-left: 0.3rem;
                color: rgb(51, 51, 51);
                font-size: 0.6rem;
            }
        }
    }

}
</style>