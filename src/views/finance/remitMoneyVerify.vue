<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.orderNo" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单号"/>
      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID"/>
      <el-select v-model="listQuery.status" placeholder="请选择审核状态" style="margin-bottom: 10px; display: inline-block; vertical-align: middle" clearable>
        <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="订单号" prop="orderId"/>
      <el-table-column align="center" label="用户ID" prop="userId"/>
      <el-table-column align="center" label="订单金额(元)" prop="orderAmount"/>
      <el-table-column align="center" label="银行流水号" prop="bankSerialNumber"/>
      <el-table-column align="center" label="打款金额(元)" prop="amount"/>
      <el-table-column align="center" label="审核状态" prop="statusName">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0 || scope.row.status === 2" type="primary" size="mini" style="border-color: rgba(237, 63, 20, 1); background-color: rgba(252, 232, 227, 1); color: #ED3F14; width: 80px;">{{ scope.row.statusName }}</el-button>
          <el-button v-if="scope.row.status === 1" type="primary" size="mini" style="border-color: rgba(25, 190, 107, 1); background-color: rgba(225, 250, 237, 1); color: #19BE6B; width: 80px;">{{ scope.row.statusName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="确认时间" prop="updateTime"/>
      <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="primary" size="mini" @click="handle(scope.row)">审核</el-button>
          <el-button v-else type="primary" size="mini" @click="show(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>
<script>
import { list } from '@/api/finance'
import Pagination from '@/components/Pagination'
export default {
  name: 'RemitMoneyVerify',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      list: [],
      listQuery: {
        status: null,
        pageNum: 1,
        pageSize: 20
      },
      status: [
        { value: 0, label: '待审核' },
        { value: 1, label: '通过' },
        { value: 2, label: '驳回' }
      ],
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        if (response.status === 200) {
          this.total = response.data.data.total
          this.list = response.data.data.list
          this.listLoading = false
          console.log(response.data)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handle(row) {
      this.$router.push({
        path: 'handle',
        query: { id: row.id }
      })
    },
    show(row) {
      this.$router.push({
        path: 'show',
        query: { id: row.id }
      })
    }
  }
}
</script>
