<template>
    <div class="bg-white s-shadow p-4 rounded-sm">
        <div class="mb-2">
            <el-button @click="handleAddCell">增加一行</el-button>
            <el-button type="danger" @click="handleDeleteCell">删除</el-button>
        </div>
        <el-table
            ref="multipleTableRef"
            :data="tableData"
            border
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="40"/>
            <el-table-column label="序号" type="index" width="90"/>
            <el-table-column label="日期" property="date" sortable width="120"/>
            <el-table-column label="姓名" property="name" width="120"/>
            <el-table-column label="地址" property="address" show-overflow-tooltip/>
            <el-table-column align="center" label="操作" width="180">
                <template #default="scope">
                    <el-button
                        text
                        @click="handleEdit(scope.row)"
                    >编辑
                    </el-button
                    >
                    <el-button
                        text
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
        <Dialog v-model="form" :dialogFormVisible="dialogFormVisible" @on-changed="dialogFormVisible = false"/>
    </div>
</template>

<script lang="ts" name="table" setup>
import {ElMessage, ElMessageBox, ElTable} from 'element-plus'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/message-box/style/css'
import {reactive, ref} from 'vue'
import {User} from "@/views/table/interface";
import Dialog from "@/views/table/components/dialog.vue";


const multipleSelection = ref<User[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const dialogFormVisible = ref(false)
let form = reactive({
    name: '',
    address: '',
    date: '',
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