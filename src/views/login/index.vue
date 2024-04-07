<template>
    <div
        class="w-screen h-screen flex items-center justify-center select-none bg-gradient-to-r from-cyan-500 to-blue-500 relative">
        <div class="w-96 border px-6 py-8 shadow-md bg-white z-10">
            <h2 class="text-center text-2xl">登录</h2>
            <div class="mt-4">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入账号"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password type="password">
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="disabled" :loading="loading" class="w-full" size="large" type="primary"
                           @click="onLogin(loginFormRef)">登录
                </el-button>
            </div>
        </div>
        <div class="bubbles flex">
            <template v-for="item in 50">
                <span :style=css(item)></span>
            </template>
        </div>
    </div>
</template>

<script lang="ts" name="login" setup>
import {useRouter} from "vue-router";
import {reactive, ref} from 'vue';
import type {ElForm} from "element-plus";
import {ElMessage} from "element-plus";
import {useUserStore} from '@/store/modules/user';

type FormInstance = InstanceType<typeof ElForm>;

const userStore = useUserStore();
const router = useRouter()

const css = (item: number) => {
    return {'--i': Math.floor(Math.random() * (item + 1)).toString()}
}

const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
    username: 'admin',
    password: 'admin',
})

const loginRules = reactive({
    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
    password: [{required: true, message: "请输入密码", trigger: "blur"}]
});

const loading = ref(false)
const disabled = ref(false)

// 登录
const onLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        disabled.value = true
        userStore.setToken('11111')
        userStore.setUserInfo({
            username: 'admin',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        })
        router.replace('/home').then(() => {
            ElMessage.success('登录成功')
        }).finally(() => {
            loading.value = false
        })
    })
}
</script>

<style lang="css" scoped>

.bubbles {
    position: absolute;

    span {
        width: 30px;
        height: 30px;
        background-color: #79bbff;
        margin: 0 20px;
        border-radius: 50%;
        box-shadow: 0 0 0 10px #4fc3dc44,
        0 0 50px #4fc3dc,
        0 0 100px #4fc3dc;
        animation: animate calc(120s / var(--i)) linear infinite;

        &:nth-child(even) {
            background-color: #ff2d75;
            box-shadow: 0 0 0 10px #ff2d7544,
            0 0 50px #ff2d75,
            0 0 100px #ff2d75;
        }
    }
}

@keyframes animate {
    0% {
        transform: translateY(100vh) scale(0);
    }
    100% {
        transform: translateY(-100vh) scale(1);
    }
}
</style>