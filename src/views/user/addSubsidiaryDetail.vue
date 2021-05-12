<template>
  <div class="SubsidiaryContent">
    <!-- <div class="sections_title">
          <span class="detail">子公司信息</span> <el-button type="primary" style="color:#fff;"> + 添加子公司 </el-button>
    </div>-->

    <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="203">
          <template slot-scope="scope">
            <el-button type="primary">修改</el-button>
            <el-button type="danger">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getcompanySonList" /> -->
    </template>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { companySonList } from '@/api/user' 

export default {
  components:{
    Pagination
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      total: 10,
      listQuery:{
        page: 1,
        limit: 10,
        companyId:''
      },
    };
  },
  mounted(){
  },
  methods: {
   
  }
};
</script>
<style lang="scss" scoped>
.subsidiary_error{
  text-align:center;
  font:20px/2 "";
  line-height:100px;
  color:#606266;
  border:1px solid #000;
}
.pagination-container{
  margin-top:0;
}
</style>