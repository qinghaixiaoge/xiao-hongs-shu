<template>
    <!-- <input type="text" v-model="xiaoyuComputed">
    <button>{{ xiaoyuComputed }}</button> -->
    <button @click="handlerClick">{{count}}</button>
    <div class="myform-container">
        <form class="form">
            <ul>
                <li>
                    <h2 class="title">{{ title }}</h2>
                </li>
                <li>
                    <div class="input-group">
                        <div class="input-label">
                            <label for="loginId">账号：</label>
                        </div>
                        <div class="input-message">
                            <input type="text" v-model="user.username" placeholder="账号" class="message">
                            <div class="error" v-if="error.userNameError">{{ error.userNameError }}</div>
                        </div>
                    </div>
                    <div class="margin-bottom" v-if="error.userNameError"></div>
                </li>
                <li>
                    <div class="input-group">
                        <div class="input-label">
                            <label for="loginId">密码：</label>
                        </div>
                        <div class="input-message">
                            <input type="text" v-model="user.password" placeholder="密码" class="message">
                            <div class="error" v-if="error.passWordError">{{ error.passWordError }}</div>
                        </div>
                    </div>
                    <div class="margin-bottom" v-if="error.passWordError"></div>
                </li>
                <li>
                    <button @click.prevent="onSubmit" type="submit">登录</button>
                </li>
                <li>
                    <button @click="onReset" type="reset">重置</button>
                </li>
            </ul>
        </form>
    </div>

</template>
<script setup>
/* import { useRoute, useRouter } from 'vue-router';
const $router = useRouter()
const $route = useRoute()
console.log($router);
console.log($route); */
import { computed } from 'vue';
// 确定所有的值
const props = defineProps({
    user: Object,
    title: String,
    error: Object,
    onSubmit: Function,
    onReset: Function,
    xiaoyu: String
})
const emit = defineEmits(["update:xiaoyu"])
// 使用v-model的方式代替了oninput事件
const xiaoyuComputed = computed({
    get() {
        return props.xiaoyu
    },
    set(val) {
        emit("update:xiaoyu", val)
    }
})

// 打破了单向数据流
const count = defineModel("count")
const handlerClick = ()=>{
    console.log(count);
    count.value++
}
</script>
<style lang='scss' scoped>
.myform-container {
    height: 100vh;
    @include flexcc;

    ul {
        width: 350px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

        li {
            margin-bottom: 20px;

            .title {
                text-align: center;
            }

            button {
                width: 100%;
                text-align: center;
                padding: 10px;
                border: none;
                border-radius: 10px;
                color: #fff;
                background-color: #8a4fe3;
                cursor: pointer;

                &:hover {
                    background-color: #b66dff;
                }
            }

            .input-group {
                display: flex;

                .input-label {
                    width: 60px;
                    flex-shrink: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-align: right;

                    label {
                        display: inline-flex;
                        align-items: center;
                        height: 37px;
                        max-width: 100%;
                    }
                }

                .input-message {
                    flex: 1;

                    .message {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ccc;
                        outline: none;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                    }

                    .error {
                        font-size: 15px;
                        color: red;
                    }
                }

            }

            .margin-bottom {
                margin-bottom: -20px;
            }
        }
    }
}
</style>