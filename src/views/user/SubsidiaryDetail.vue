<template>
  <div class="SubsidiaryContent">
    <!-- <div class="sections_title">
          <span class="detail">子公司信息</span> <el-button type="primary" style="color:#fff;"> + 添加子公司 </el-button>
    </div>-->

    <template>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            {{scope.row.subType==1?'省级':(scope.row.subType==2?'市级':(scope.row.subType==3?'县级':(scope.row.subType==4?'分支':'总部')))}}
          </template>
        </el-table-column>
        <el-table-column prop="linkman" label="联系人"></el-table-column>
        <el-table-column prop="contact" label="联系方式"></el-table-column>
        <!-- <el-table-column prop="linkman" label="联系邮箱"></el-table-column> -->
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            {{scope.row.status==0?'有效':'失效'}}
          </template>
        </el-table-column>
        <el-table-column prop="linkman" label="联系人"></el-table-column>
        <el-table-column prop="linkman" label="联系人"></el-table-column>

        <el-table-column label="操作" width="203">
          <template slot-scope="scope">
            <el-button v-if="hidden_look" type="primary" @click="editDetail(scope.row)">修改</el-button>
            <!-- <el-button v-if="hidden_look" type="danger">重置密码</el-button> -->
            <el-button v-else type="primary" @click="goDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getcompanySonList" />
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
      tableData: [],
      total: 10,
      listQuery:{
        page: 1,
        limit: 10,
        companyId:''
      },
      hidden_look: false
    };
  },
  mounted(){
    if(this.$route.path == "/user/lookCompanyList"){
      this.getcompanySonList()
      this.hidden_look = false
    }else if(this.$route.path == "/user/editCompanyList"){
      this.getcompanySonList()
      this.hidden_look = true
    }else{
      this.getcompanySonList()
      this.hidden_look = false
    }
  },
  methods: {
    editDetail(row){
        this.$router.push({
          path:"/user/editCompanyList",
          query: {
            id: row.companyId
          }
        })
    },
    goDetail(row){ // 点击子公司查看子公司的信息
      // console.log(row.companyId)
      // console.log(row.status)
      this.$router.push({
        path:'/user/lookCompanyList',
        query:{
          id: row.companyId,
          status: row.status
        }
      })
    },
    getcompanySonList(){ // 获取子公司信息
    this.listQuery.companyId = this.$route.query.id;
      companySonList(this.listQuery).then(res=>{
        console.log(res)
        if(res.data.errno == 0){
          this.tableData = res.data.data.list
          console.log(this.tableData)
        }
      })
    },
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