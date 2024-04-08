<template>
    <el-dialog v-model="dialogVisible" title="编辑" width="500" @close="handleClose">
        <el-form ref="ruleFormRef" :model="formData" :rules="rules">
            <el-form-item :label-width="140" label="姓名" prop="name">
                <el-input v-model="formData.name"/>
            </el-form-item>
            <el-form-item :label-width="140" label="日期" prop="date">
                <el-date-picker
                    v-model="formData.date"
                    placeholder="请选择日期"
                    style="width: 100%"
                    type="date"
                />
            </el-form-item>
            <el-form-item :label-width="140" label="地址" prop="address">
                <el-input v-model="formData.address"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    保存
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {defineModel, defineProps, reactive, ref, watch} from "vue";
import {FormInstance, FormRules} from "element-plus";
import {User} from "@/views/table/interface";

const model = defineModel({required: true})

const props = defineProps({
    dialogFormVisible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits<{ onChanged: [id: boolean] }>()

const formData = reactive<User>({address: "", date: "", name: ""});
const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)

watch(
    () => props.dialogFormVisible,
    (val) => {
        if (val) {
            formData.name = model.value?.name
            formData.address = model.value?.address
            formData.date = model.value?.date
        }
        dialogVisible.value = val
    })

const rules = reactive<FormRules<User>>({
    name: [
        {required: true, message: '请输入姓名', trigger: 'blur'},
        {min: 1, max: 5, message: '长度在3和5之间', trigger: 'blur'},
    ],
    date: [
        {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change',
        },
    ],
    address: [
        {required: true, message: '请输入地址', trigger: 'blur'},
    ],
})

// 关闭窗口
const handleClose = () => {
    dialogVisible.value = false
    emit('onChanged', false)
}

// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            dialogVisible.value = false
            emit('onChanged', false)
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>