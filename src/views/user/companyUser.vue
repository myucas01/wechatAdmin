<template>
  <div class="app-container">
<!-- company name phone parentCompany status -->
    <!-- 查询和其他操作 -->
    <div class="filter-container" >
      <div class="filter-seek">
        <div class="seekLeft">
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="company">企业名称: </label>
            <el-input id="company" v-model="listQuery.company" clearable class="filter-item" style="width: 180px;height:36px" placeholder=""/>
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="contacts">联系人: </label>
            <el-input id="contacts" v-model="listQuery.name" clearable class="filter-item" style="width: 180px;height:36px" placeholder=""/>
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="telphone">联系方式: </label>
            <el-input id="telphone" v-model="listQuery.phone" clearable class="filter-item" style="width: 180px;height:36px" placeholder=""/> <!--v-model未绑定,-->
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="parentCompany">所属企业名称: </label>
            <el-input id="parentCompany" v-model="listQuery.parentCompany" clearable class="filter-item" style="width: 180px;height:36px" placeholder=""/> <!--v-model未绑定,-->
          </div>
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="selectTittle">账号状态: </label>
            <el-select id="selectTittle" v-model="listQuery.status" placeholder="">
              <el-option
                v-for="(item,index) in selictList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="seekRight">
          <el-button class="filter-item searchBtn" type="primary" icon="el-icon-search" @click="handleSearch">查找</el-button>
        </div>
      </div>
      <div class="settinBtnBox">
        <el-button class="filter-item" type="primary" icon="el-icon-download" @click="upload">导入</el-button>
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="企业账号ID" prop="id" />

      <el-table-column align="center" label="账号名" prop="username"/>
      
      <el-table-column align="center" label="账号状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" type='success'>可用</el-tag>
          <el-tag v-if="scope.row.status==1" type='warning'>禁止</el-tag>
          <el-tag v-if="scope.row.status==2" type='danger'>注销</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="企业名称" prop="company">
        <template slot-scope="scope">
          <span v-if="scope.row.company">{{ scope.row.company }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
<!-- company name phone parentCompany status -->

      <el-table-column align="center" label="企业类型" prop="subType">
        <template slot-scope="scope">
          {{scope.row.subType == 0? '总公司':( scope.row.subType == 1? '一级子公司/省级': ( scope.row.subType == 2? '二级子公司/市级': ( scope.row.subType == 3? '三级子公司/县级': ( scope.row.subType == 4? '四级子公司/分支': '其它') ) ))}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="所属企业" prop="parentCompany"/>

      <el-table-column align="center" label="联系人" prop="accountOwner"/>
      
      <el-table-column align="center" label="联系方式" prop="mobile"/>

      <el-table-column align="center" label="注册时间" prop="addTime">
        <template slot-scope="scope">
          {{scope.row.addTime }} <!--目前没有数据-->
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" prop="updateTime">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" prop="status">
        <template slot-scope="scope">
          <el-button type="worning" size="mini" class="statusBtn" @click="check(scope.row)">查看</el-button>丨
          <el-button type="primary" size="mini" class="statusBtn" @click="edit(scope.row)">编辑</el-button>丨
          <el-button type="primary" size="mini" class="statusBtn">{{scope.row.status == 0 ? "可用" : "不可用"}}</el-button>丨
          <el-button type="primary" size="mini" class="statusBtn" @click="resivePassword()">重置密码</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <companyUserDialog :uploadFile1="uploadFile1" href="./static/excels/企业账号.xlsx" :dialogShow='dialogShow' @uploadFile='uploadFile'></companyUserDialog>
  </div>
</template>

<script>
import { uploadFile1 } from '@/api/storage'
import { companyUserList } from '@/api/user'
import Pagination from '@/components/Pagination'
import companyUserDialog from '@/components/user/companyUserDialog'
export default {
  name: 'User',
  components: { Pagination,companyUserDialog },
  data() {
    return {
      uploadFile1: '',
      dialogShow:{
        show:false
      },
      list: null,
      total: 0,
      selictList:[
        {
          label:'全部',
          value:''
        },
        {
          label:'可用',
          value:0
        },
        {
          label:'不可用',
          value:1
        }
      ],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: 'id',
        order: 'desc',
        company: '', // 公司名称
        // username: '', // 
        status: '', //状态
        name: '', //联系人
        phone: '',// 联系方式
      }
    }
  },
  created() {
    this.getList()
    this.uploadFile1 = uploadFile1
  },
  methods: {
    uploadFile(){
      this.getList()
    },
    upload(){
      this.dialogShow.show=true
    },
    edit(row) {
      this.$router.push({
        // path: 'editCompanyUser',
        path: 'editCompanyUsers',
        query: { id: row.id,edit: 'edit',companyId:row.companyId }
      })
    },
    check(row) {
      let look = "look";
      console.log(row)
      this.$router.push({
        path: 'lookOverInfo',
        query: { id: row.id,status: row.status,look:look }
      })
    },
    switchStatus() {
      console.log('%c*******','background:yellow;color:blue')
      // this.$router.push({
      //   path: 'lookOverInfo',
      //   query: { id: row.id }
      // })
    },
    resivePassword() {
      console.log('%c&&&&&&&&','background:yellow;color:blue')
    },
    handleSearch() {
      this.getList()
    },
    add() {
      this.$router.push({
        path: 'addCompanyUser'
      })
    },
    getList() {
      this.listLoading = true
      companyUserList(this.listQuery).then(response => {
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
        width: 75%;
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
        width: 25%;
        position: relative;
        .searchBtn {
          position: absolute;
          bottom: 10px;
          left: 20px;
        }
      }
    }
  }
  .statusBtn {
    background:rgba(0,0,0,0);
    border-color:rgba(0,0,0,0);
    color:#66b1ff;
    padding: 0;
    margin: 0;
  }
</style>