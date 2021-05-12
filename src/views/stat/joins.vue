<template>
  <div class="app-container">
    <div class="filter-container">
<!--      <el-form :inline="true" :model="form">-->
<!--        <el-form-item label="企业名称">-->
<!--          <el-input v-model="form.name" placeholder="请输入企业名称" />-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" icon="el-icon-search" @click="resetStatisticalList">查询</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    </div>
    <el-table :data="statistical" border style="width: 100%">
      <el-table-column align="center" prop="id" label="企业id" width="180"></el-table-column>
      <el-table-column align="center" prop="company" label="企业名称" width="180"></el-table-column>
      <el-table-column align="center" prop="linkman" label="企业联系人"></el-table-column>
      <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
<!--      <el-table-column align="center" prop="updateTime" label="更新时间"></el-table-column>-->
      <!-- <el-table-column v-if="false" align="center" label="操作" prop="deleted">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="deleted(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getStatisticalList"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import axios from 'axios'
export default {
  name: "Joins",
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        size: 10
      },
      total: 0,
      form: {
        name: "" //企业名称
      },
      //表格数据
      statistical: []
    };
  },
  computed:{
  },
  methods: {
    resetStatisticalList(){ //点击搜索时候触发
      this.listQuery.page = 1;
      this.listQuery.size = 10;
      this.getStatisticalList();
    },
    getStatisticalList() { // 列表数据
      this.listLoading = true;
      var config = { page: this.listQuery.page, size: this.listQuery.size };
      axios.get("http://192.168.0.101:16888/litemallBusinessUser/list",{params:config}).then(res=>{
        var result = res.data.data;
        this.statistical = result.list;
        this.total = result.total;
        console.log("%c~~~~~~~~~~~","background:#000;color:#fff;")
        console.log("total",this.total)
        this.listLoading = false;
      })
      // return // http://192.168.1.90:8077  @/src/api/statisticalStatement.js
      // var config = { page: this.listQuery.page, size: this.listQuery.size };
      // businessUserQuery(config).then(response => {
      //   var result = response.data.data;
      //   this.statistical = result.list;
      //   this.total = result.total;
      //   this.listLoading = false;
      // }).catch(error => {
      //   this.statistical = [];
      //   this.total = 0;
      //   this.listLoading = false;
      // });
    },
    deleted(val){//删除
      console.log(val)
    }
  },
  mounted() {
    this.getStatisticalList();
  }
};
</script>
<style lang="scss">
.pageFoot {
  margin-top: 50px;
  text-align: left;
}
</style>
