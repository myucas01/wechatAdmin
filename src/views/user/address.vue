<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container" >
      <div class="filter-seek">
        <div class="seekLeft">
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="company">企业名称: </label>
            <el-input id="company" v-model="listQuery.companyName" clearable class="filter-item" style="width: 220px;height:36px" placeholder=""/>
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="contacts">联系人: </label>
            <el-input id="contacts" v-model="listQuery.name" clearable class="filter-item" style="width: 220px;height:36px" placeholder=""/>
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="telphone">联系方式: </label>
            <el-input id="telphone" v-model="listQuery.phone" clearable class="filter-item" style="width: 220px;height:36px" placeholder=""/> <!--v-model未绑定,-->
          </div>
        </div>
        <div class="seekRight">
          <el-button class="filter-item searchBtn" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
        </div>
      </div>
    </div> 

    <!-- <div class="filter-container">
      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID"/>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入收货人名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div> -->

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <!-- <el-table-column align="center" width="100px" label="地址ID" prop="id" sortable/> -->

      <el-table-column align="center" min-width="100px" label="企业ID" prop="id"/>
      <el-table-column align="center" min-width="100px" label="企业名称" prop="name"/>
      <el-table-column align="center" min-width="100px" label="联系人" prop="linkman"/>
      <el-table-column align="center" min-width="100px" label="联系方式" prop="contact"/>
      <!-- <el-table-column align="center" min-width="100px" label="注册时间" prop="updateTime"/> -->
      <el-table-column align="center" min-width="100px" label="更新时间" prop="updateTime"/>

      

      <el-table-column align="center" min-width="100px" label="操作" prop="setting">
         <template slot-scope="scope">
          <el-button type="text" size="mini" class="statusBtn" @click="goSet(scope.row)">设置地址</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" min-width="300px" label="区域地址">
        <template slot-scope="scope">
          {{ scope.row.province + scope.row.city + scope.row.county }}
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="300px" label="详细地址" prop="addressDetail"/> 

      <el-table-column align="center" min-width="80px" label="默认" prop="isDefault">
        <template slot-scope="scope">
          {{ scope.row.isDefault ? '是' : '否' }}
        </template>
      </el-table-column> -->

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { listAddress } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserAddress',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        companyName: '',
        userId: undefined,
        phone: '',
        sort: 'add_time',
        order: 'desc'
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listAddress(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    goSet(row) {
      this.$router.push({
        path: 'addressSetting',
        query: {id: row.id,companyName: row.name,status: row.status} 
        
      })
        console.log('query',row)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['地址ID', '用户ID', '收获人', '手机号', '省', '市', '区', '地址', '是否默认']
        const filterVal = ['id', 'userId', 'name', 'tel', 'province', 'city', 'county', 'addressDetail', 'isDefault']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户地址信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .filter-container {
    display: flex!important;
    flex-direction: column!important;
    .filter-seek {
      border: 1px solid #999;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom:20px;
      .seekLeft {
        width: 80%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .seekLeftBox {
          margin: 10px 10px;
          .filterOutBox {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items:center;
            margin: 20px 0;
            .filter-item {
              margin: 0 20px;
            }
          }
        }
      }
      .seekRight {
        width: 20%;
        position: relative;
        .searchBtn {
          position: absolute;
          bottom: 10px;
          left: 20px;
        }
      }
    }
  }
</style>