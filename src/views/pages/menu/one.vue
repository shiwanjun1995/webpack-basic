<template>
    <div class="page">
        <div class="page-filter">
            <div class="left">
                <el-button v-permit="{action: 'add'}" type="primary" size="small" icon="el-icon-plus" @click="onClickAdd">新增</el-button>
            </div>
            <div class="right">
                <el-form inline :model="filterModel" size="small">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="filterModel.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="地址：" prop="address">
                        <el-input v-model="filterModel.address" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="爱好：" prop="likes">
                        <el-input  v-model="filterModel.likes" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-permit="{action: 'search', effect: 'disabled'}" type="primary" icon="el-icon-search" @click="onClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="page-content">
            <div class="table-wrapper">
                <!-- 表格数据 -->
                <div class="table-box">
                    <el-table
                        :data="tableData"
                        v-loading="loading"
                        size="small"
                        height="100%"
                        border>
                        <!-- 自定义索引是从0开始的 -->
                        <!-- 通过给 type=index 的列传入 index 属性，可以自定义索引。该属性传入数字时，将作为索引的起始值。 -->
                        <el-table-column
                            type="index"
                            :index="(pageNo - 1) * pageSize + 1"
                            label="序号"
                            width="50">
                        </el-table-column>
                        <!-- <el-table-column
                            type="index"
                            label="序号自测"
                            width="70">
                            <template slot-scope="scope">
                                <h1>{{(scope.$index + 1)+(pageNo-1)*pageSize}}</h1>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="地址">
                        </el-table-column>
                        <el-table-column
                            prop="likes"
                            label="爱好"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="200">
                            <template slot-scope="scope">
                                <div class="btns">
                                    <el-button v-permit="{action: 'edit', effect: 'disabled'}" size="small" @click="onClickUpdate(scope.row)">
                                        <i class="el-icon-edit-outline"></i>
                                    </el-button>
                                    <el-button v-permit="{action: 'delete', effect: 'disabled'}" size="small" type="danger" plain @click="onClickDelete(scope.row)">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pagination-box">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next"
                        :total="totalCount">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="page-dialog">
            <el-dialog title="收货地址" :visible.sync="updateVisible" class="w-600" @close="updateClose">
                <el-form ref="updateForm" :model="updateModel" label-width="80px" size="small">
                    <el-form-item label="姓名：" prop="name" :rules="inputRequire">
                        <el-input v-model="updateModel.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：" prop="address" :rules="inputRequire">
                        <el-input v-model="updateModel.address"></el-input>
                    </el-form-item>
                    <el-form-item label="爱好：" prop="likes" :rules="inputRequire">
                        <el-input  v-model="updateModel.likes"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="small" @click="updateClose">取 消</el-button>
                    <el-button type="primary" size="small" @click="updateSave">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import INTERFACE from '@/api/interface.js'

export default {
    data () {
        return {
            filterModel: {
                name: '',
                address: '',
                likes: '',
            },
            pageNo: 1,
            pageSize: 10,
            tableData: [],
            totalCount: 0,
            loading: false,

            updateType: '',
            updateVisible: false,
            updateModel: {
                name: '',
                address: '',
                likes: '',
            },
            inputRequire: { required: true, message: "请输入必填项", trigger: "blur" },

        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getList()
            this.getTotal()
        },
        onClickSearch() {
            if (this.filterModel.name === '' && this.filterModel.address === '' && this.filterModel.likes === '') {
                this.init()
            } else {
                this.searchList()
            }
        },
        async getList() {
            this.loading = true
            let params = {
                pageNo: this.pageNo,
                pageSize: this.pageSize,
            }
            let res = await INTERFACE.getList(params)
            this.loading = false
            if (res.status === 200) {
                this.tableData = res.data
            }
        },
        async getTotal() {
            let res = await INTERFACE.getTotal()
            if (res.status === 200) {
                this.totalCount = res.data
            }
        },
        async searchList() {
            this.loading= true
            let res = await INTERFACE.searchList(this.filterModel)
            this.loading = false
             if (res.status === 200) {
                this.tableData = res.data.list
                this.totalCount = res.data.total
            }
        },
        onClickAdd() {
            this.updateType = 'add'
            this.updateVisible = true
        },
        updateClose() {
            this.updateType = ''
            this.updateVisible = false
            this.updateModel = {
                name: '',
                address: '',
                likes: '',
            }
            this.$refs.updateForm.clearValidate()
        },
        updateSave() {
            this.$refs.updateForm.validate(v => v && this.updateData())
        },
        async updateData() {
            let res, params = this.updateModel
            if (this.updateType === 'add') {
                res = await INTERFACE.addList(params)
            } else {
                res = await INTERFACE.editList(params)
            }
            // console.log('打印返回值',res);
            if (res.status === 200) {
                const resLabel = this.updateType === 'add' ? '新增成功' : '编辑成功'
                this.$message({
                    type: 'success',
                    message: resLabel
                });
                this.init()
                this.updateClose()
            }
        },
        onClickUpdate(item) {
            this.updateType = 'edit'
            this.updateVisible = true
            this.updateModel = Object.assign({}, item)
        },
        onClickDelete(item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteList(item.id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async deleteList(id) {
            let res = await INTERFACE.deleteList(id)
            if (res.status === 200) {
                this.init()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }
        },
        handleCurrentChange(page) {
            this.pageNo = page
            this.getList()
        },
    },
}
</script>

<style lang='scss'>
.el-tooltip__popper {
    max-width: 800px;
}

</style>
