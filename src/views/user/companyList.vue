<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
        <label for="name">请输入企业名称: </label>
        <el-input id="name" v-model="listQuery.companyName" clearable class="filter-item" style="width: 200px;margin-right:20px;margin-left:5px;" placeholder="请输入企业名称"/>
        <label for="usr">联系人: </label>
        <el-input id="usr" v-model="listQuery.name" clearable class="filter-item" style="width: 200px;margin-right:20px;margin-left:5px;" placeholder="联系人"/>
        <label for="tel">联系方式: </label>
        <el-input id="tel" v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;margin-right:20px;margin-left:5px;" placeholder="联系方式"/>
        <template>
          <label>状态: </label>
          <div style="width:100px;display:inline-block;">
            <el-select class="select"  v-model="listQuery.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查找</el-button>
    </div>
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="企业ID" prop="id" />
      <el-table-column align="center" label="企业名称" prop="name"/>
      <el-table-column align="center" label="企业联系人" prop="linkman"/>
      <el-table-column align="center" label="联系方式" prop="contact"/>
      <el-table-column align="center" label="注册时间" prop="addTime"/>

      <el-table-column align="center" label="更新时间" prop="updateTime"/>

      <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <div class="nowrap">
            <el-button type="primary" size="mini" @click="look(scope.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="worning" size="mini">{{scope.row.status==0?'有效':'失效'}}</el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { companyList } from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1, // 页码
        limit: 20, // 数量
        sort: 'id',
        order: 'desc', //
        companyName: '',
        name: '', // 联系人
        phone: '', // 联系电话
        status: '' // 状态
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '有效'
      }, {
        value: '1',
        label: '失效'
      }],
      status: '' 

    }
  },
  created() {
    this.getList()
  },
  methods: {
    look(row) { // 查看按钮
      this.$router.push({
        path: 'lookCompanyList',
        query: { id: row.id,status: row.status }
      })
    },
    edit(row) { // 编辑按钮
      this.$router.push({
        path: 'editCompanyList',
        query: { id: row.id }
      })
    },
    add() {
      this.$router.push({
        path: 'addCompanyList'
      })
    },
    getList() {
      this.listLoading = true
      companyList(this.listQuery).then(response => {
        console.log(response.data)
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.app-container .filter-container{
  white-space: nowrap;
}
.app-container .filter-container>label{

  font:14px/36px "微软雅黑";
    height: 36px;
    display: inline-block;
    vertical-align: top;
    color:#909399;
}
.app-container .select{
  transform:translateY(-4px);
}
.app-container .nowrap{
  white-space: nowrap;
}
</style>