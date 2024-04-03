<template>
    <div
        class="w-screen h-screen flex items-center justify-center select-none bg-gradient-to-r from-cyan-500 to-blue-500">
        <div class="w-96 border px-6 py-8 shadow-md bg-white">
            <h2 class="text-center text-2xl">登录</h2>
            <div class="mt-4">
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入账号" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码">
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-button class="w-full" size="large" type="primary" :loading="loading" :disabled="disabled"
                    @click="onLogin(loginFormRef)">登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import { useRouter } from "vue-router";
import { ref, reactive } from 'vue';
import { ElMessage } from "element-plus";
import type { ElForm } from "element-plus";
import { useUserStore } from '@/store/modules/user';

type FormInstance = InstanceType<typeof ElForm>;

const userStore = useUserStore();
const router = useRouter()

const loginFormRef = ref<FormInstance>()

const loginForm = reactive({
    username: 'admin',
    password: 'admin',
})

const loginRules = reactive({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
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
        userStore.setUserInfo({ username: 'admin', avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' })
        router.replace('/home').then(() => {
            ElMessage.success('登录成功')
        }).finally(() => {
            loading.value = false
        })
    })
}

</script>