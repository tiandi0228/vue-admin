<template>
    <div>
        <div class="mb-2">
            <el-button @click="handleAddCell">增加一行</el-button>
            <el-button type="danger" @click="handleDeleteCell">删除</el-button>
        </div>
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            border
            stripe
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="40"/>
            <el-table-column label="序号" sortable type="index" width="80"/>
            <el-table-column label="日期" width="120">
                <template #default="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="姓名" property="name" width="120"/>
            <el-table-column label="地址" property="address" show-overflow-tooltip/>
            <el-table-column align="center" label="操作" width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)"
                    >编辑
                    </el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-center mt-4">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[20, 50, 100]"
                :total="tableData.length"
                background
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
        <el-dialog v-model="dialogFormVisible" title="编辑" width="500">
            <el-form ref="ruleFormRef" :model="form" :rules="rules">
                <el-form-item :label-width="140" label="姓名" prop="name">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item :label-width="140" label="日期" prop="date">
                    <el-date-picker
                        v-model="form.date"
                        placeholder="请选择日期"
                        style="width: 100%"
                        type="date"
                    />
                </el-form-item>
                <el-form-item :label-width="140" label="地址" prop="address">
                    <el-input v-model="form.address"/>
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
    </div>
</template>

<script lang="ts" name="table" setup>
import {ElMessage, ElMessageBox, ElTable, FormInstance, FormRules} from 'element-plus'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/message-box/style/css'
import {reactive, ref} from 'vue'

interface User {
    date: string
    name: string
    address: string
}

const multipleSelection = ref<User[]>([])
const currentPage = ref(1)
const pageSize = ref(20)

const ruleFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false)

let form = reactive({
    name: '',
    address: '',
    date: '',
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

const tableData = ref<User[]>([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

// 增加一行数据
const handleAddCell = () => {
    const data = {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }

    tableData.value.push(data)
}

// 编辑
const handleEdit = (row: User) => {
    dialogFormVisible.value = true
    form.name = row.name
    form.date = row.date
    form.address = row.address
}

// 删除
const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
        `确定要删除${row.name}?`,
        '温馨提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        tableData.value.splice(index, 1)
        ElMessage.success('删除成功')
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '删除失败',
        })
    });

}

// 保存
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            dialogFormVisible.value = false
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 删除所选数据
const handleDeleteCell = () => {

    if (multipleSelection.value.length > 0) {
        multipleSelection.value.forEach(row => {
            const index = tableData.value.indexOf(row)
            ElMessageBox.confirm(
                `确定要删除${row.name}?`,
                '温馨提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                tableData.value.splice(index, 1)
                ElMessage.success('删除成功')
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '删除失败',
                })
            });
        })
    } else {
        ElMessage({
            message: '请先选择一行数据',
            type: 'warning',
        })
    }
}

// 多选
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}

// 下拉选择每页显示多少条
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

// 选择分页
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>