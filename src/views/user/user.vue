<template>
  <div class="app-container"> 

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="企业名称">
          <el-input placeholder="请输入企业名称" v-model="listQuery.company" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input placeholder="请输入联系人" v-model="listQuery.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input placeholder="请输入联系方式" v-model="listQuery.phone" clearable></el-input>
        </el-form-item>

        <el-form-item label="所属企业名称">
          <el-input placeholder="请输入企业名称" v-model="listQuery.parentCompany" clearable></el-input>
        </el-form-item>

        <el-form-item label="账号状态">
          <el-select v-model="listQuery.status" clearable>
            <el-option v-for="item in status" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: 10px 0px">
      <el-button type="primary" @click="toLead">导入</el-button>
     <!-- <el-dialog title="上传文件" :visible.sync="uploadDialog" class="eldialog"> -->

      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column width="100" align="center" label="会员ID" prop="id" sortable/>

      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <i @click="showInfoFc(scope.row)" style="color: #7ec6c8;cursor: pointer;">{{scope.row.username}}</i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账号状态">
        <template slot-scope="scope">
          <i v-if="scope.row.status == 0">可用</i>
          <i v-if="scope.row.status == 1">不可用</i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="会员姓名" prop="accountOwner"></el-table-column>

      <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag >{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系方式" prop="mobile"/>

      <el-table-column align="center" label="部门" prop=""/>

      <el-table-column align="center" label="企业名称" prop="company"/>

      <el-table-column align="center" label="企业类型">
        <template slot-scope="scope">
          <i v-if="scope.row.subType == ''">请选择该账号的企业类型</i>
          <i v-if="scope.row.subType == 0">总公司</i>
          <i v-if="scope.row.subType == 1">一级子公司/省级'</i>
          <i v-if="scope.row.subType == 2">二级子公司/省级</i>
          <i v-if="scope.row.subType == 3">三级子公司/省级</i>
          <i v-if="scope.row.subType == 4">四级子公司/省级</i>
          <i v-if="scope.row.subType == 5">其他</i>
        </template>
      </el-table-column>

      <el-table-column align="center" label="关联公司" prop="parentCompany"/>

      <el-table-column align="center" label="注册时间" prop="addTime"/>

      <el-table-column align="center" label="更新时间" prop="updateTime"/>

      <el-table-column align="center" label="操作" width="250" prop="status">
        <template slot-scope="scope">
          <el-button type="primary" @click="showInfoFc(scope.row)">查看</el-button>
          <el-button type="primary" @click="updateInfoFc(scope.row)">编辑</el-button>
          <el-button type="primary">
            <i v-if="scope.row.status == 0" @click="buttonY(scope.row)">可用</i>
            <i v-if="scope.row.status == 1" @click="buttonN(scope.row)">不可用</i>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!--新增/编辑-->
    <el-dialog :visible.sync="showEdit">
      <el-form ref="ruleForm" :model="editForm" label-width="120px">
        <el-form-item label="会员登录名">
          <el-input placeholder="请输入手机号作为登录名" style="width: 50%" v-model="editForm.username"></el-input>
          <el-button type="primary" @click="updatePhoneFc">修改登录手机</el-button>
          <div v-show="updatePhone" style="border: 1px solid #a8a8a8; width: 60%; text-align: center;">
            <p style="font-size: 25px; font-weight: bolder;">修改手机号</p>
            <p>当前手机号: {{editForm.mobile}}</p>
            <p>新手机号: <el-input placeholder="请输入新手机号作为登录名" style="width: 200px;" v-model="editForm.newMobile"></el-input></p>
          </div>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input placeholder="请输入账号持有人姓名" style="width: 50%" v-model="editForm.accountOwner"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" style="width: 50%" v-model="editForm.password"></el-input>
          <el-button type="primary" @click="editPassword">重置密码</el-button>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editForm.gender">
            <el-option v-for="item in gender" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-select v-model="yearsModel" @change="dateChange(1)" placeholder="请选择" style="width:100px;">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="monthsModel" @change="dateChange(2)" placeholder="请选择" style="width:100px;">
            <el-option
              v-for="item in months"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="daysModel" @change="dateChange(3)" placeholder="请选择" style="width:100px;">
            <el-option
              v-for="item in days"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" style="width: 50%;">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" style="width: 50%;">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>

        <!-- <el-form-item label="所属企业" style="width: 50%;">
          <el-input v-model="editForm.company"></el-input>
        </el-form-item> -->
        <!-- 新增编辑 -->
        <el-form-item label="所属企业" prop="parentCompany" style="width:75%">
          <el-select style="width: 100%;"  ref="parentCompany" v-model="editForm.company" :remote-method="remoteMethod"
            remote @change="handleCompany($event)" reserve-keyword filterable placeholder="请选择归属企业">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <p>总公司: 总公司名称</p>
          <p>所属企业类型：三级子公司/县级</p>
        </el-form-item>
        <el-form-item label="备注" style="width: 50%;">
          <el-input type="textarea" v-model="editForm.remarks"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showEdit = false">取消</el-button>
          <el-button type="primary" @click="saveInfo">确认保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--查看-->
    <el-dialog :visible.sync="showInfo" width="600px" title="查看会员">
        <!--      <p style="font-size: 20px; font-weight: bolder;">查看会员</p>-->
      <el-form>
        <el-form-item label="会员登录名:">{{showInfoObject.username}}</el-form-item>
        <el-form-item label="用户姓名:">{{showInfoObject.accountOwner}}</el-form-item>
        <el-form-item label="性别:">
          <i v-if="showInfoObject.gender == 1">男</i>
          <i v-if="showInfoObject.gender == 2">女</i>
        </el-form-item>
        <el-form-item label="生日:">{{showInfoObject.birthday}}</el-form-item>
        <el-form-item label="联系方式:">{{showInfoObject.mobile}}</el-form-item>
        <el-form-item label="联系邮箱:">{{showInfoObject.email}}</el-form-item>
        <el-form-item label="所属公司:">{{showInfoObject.parentCompany}}</el-form-item>
        <el-form-item label="备注:">{{showInfoObject.remarks}}</el-form-item>
        <el-form-item><el-button type="primary" @click="showInfo = false">返回</el-button></el-form-item>
      </el-form>
    </el-dialog>
    <companyUserDialog :uploadFile1="uploadFileUser1" href="./static/excels/会员管理.xlsx" :dialogShow='dialogShow' @uploadFile='handleFilter'></companyUserDialog> <!--导入-->
    <editPassword :editPasswordShow='editPasswordShow'></editPassword>
  </div>
</template>

<script>
import { uploadFileUser } from '@/api/storage'
import companyUserDialog from '@/components/user/companyUserDialog'
import editPassword from '@/components/user/editPassword'
import { fetchList,fetchSave,fetchAdd,resetPwd,companyList,companyUserRead } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const status = [
  {value: undefined, label: '全部'},
  {value: 0, label: '可用'},
  {value: 1, label: '不可用'},
]
const gender = [
  {value: 0, label: '无'},
  {value: 1, label: '男'},
  {value: 2, label: '女'}
]

export default {
  name: 'User',
  components: { Pagination, companyUserDialog,editPassword },
  data() {
    return {
      ruleForm: {},
      uploadFileUser1: '',
      dialogShow:{
        show:false
      },
      editPasswordShow:{
        show:false,
        info:{}
      },
      setType: 0,
      yearsModel:null,
      years:[],
      monthsModel:null,
      months:[],
      daysModel:null,
      days:[],
      updatePhone: false,
      status,
      gender,
      showEdit: false,
      showInfo: false,
      showInfoObject: {},
      list: null,
      total: 0,
      listLoading: true,
      uploading:false,
         //上传excel表格
      uploadDialog: false,
      file: [],
      editForm: {
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        phone: undefined,
        company: undefined,
        parentCompany: undefined, 
        status: undefined
        // sort: 'add_time',
        // order: 'desc'
      },
      downloadLoading: false,
      genderDic: ['未知', '男', '女'],
      levelDic: ['普通用户', 'VIP用户', '高级VIP用户'],
      statusDic: ['可用', '禁用', '注销'],
      options:[],
      list1:[],
       listQuery1: {
        page: 1,
        limit: 10000,
        sort: "id",
        order: "desc"
      },
    }
  },
  created() {
    this.getList()
    this.getList1()
    this.init()
    this.uploadFileUser1 = uploadFileUser
  },
  methods: {
    handleCompany(e) {
      // this.ruleForm.companyId = e
       let obj = {};
      obj = this.list1.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.value == e;//筛选出匹配数据
      });
      console.log(obj)
      this.editForm.companyId = obj.value
      this.editForm.company = obj.label;
      //  this.ruleForm.parentCompany = obj.label;
      // console.log(obj.label)
      let _field = this.$refs['ruleForm'].fields
      _field.map(i => {
          if (i.prop === 'parentCompany') {
            i.clearValidate()
            return false
          }
        })
    },
    remoteMethod(query) {
      if (query !== '') {
        setTimeout(() => {
          this.options = this.list1.filter(item => {
            return item.label
              .indexOf(query) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },

    getList1() {
      companyList(this.listQuery1).then(response => {
        this.list1 = response.data.data.list.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      })
    },
    

    editPassword(){
      let config={
        userId:this.editPasswordShow.info.id
      }

      this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          const res=resetPwd(config)
          .then(res=>{
            if(res.data.errno==0){
              //console.log(222)
              this.$message.success('密码重置成功')
            }else{
              this.$message.error(res.data.errmsg)
            }
          })
        })


    },
    saveInfo() {
      this.editForm.action = '会员管理新增会员'
      if (this.editForm.newMobile && this.editForm.newMobile.length > 0) {}
      if (this.setType == 2) {
        this.editForm.action = '修改用户'
        var mon,day;
        if(this.monthsModel<10) mon = "0"+this.monthsModel
        if(this.daysModel<10) day =  "0"+this.daysModel
        this.editForm.birthday = this.yearsModel + '-' + mon + '-' + day
        console.log(this.editForm.birthday)
        fetchSave(this.editForm).then(response => {
          if (response.status == 200) {
            this.showEdit = false
            this.$message.success('修改成功')
            this.getList()
          }
        })
      }
      if (this.setType == 1) {
        this.editForm.action = '添加用户'
        var mon,day;
        if(this.monthsModel<10) mon = "0"+this.monthsModel
        if(this.daysModel<10) day =  "0"+this.daysModel
        this.editForm.birthday = this.yearsModel + '-' + mon + '-' + day
        fetchAdd(this.editForm).then(response => {
          if (response.status == 200) {
            this.showEdit = false
            this.$message.success('添加成功')
            this.getList()
          }
        })
      }
    },
    updatePhoneFc() {
      this.updatePhone = !this.updatePhone
    },
    add() {
      this.setType = 1
      this.showEdit = true
      this.editForm = {}
    },
     //上传excel表格
    beforeUpload(file) {
      const isText = file.type === "application/vnd.ms-excel";
      const isTextComputer =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isText && !isTextComputer) {
        this.$message.error("上传文件必须是Excel格式!");
      }
      return isText || isTextComputer;
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    uploadFile(item) {
      this.file = item.file;
    },
    postFile() {
      const fileObj = this.file;
      var fileData = new FormData();
      fileData.append("file", fileObj);
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      this.uploading = true;

      setTimeout(function() {
        this.uploading = false;
      }, 1500);
    },
    colseFile() {
      this.uploadDialog = false;
    },
    showInfoFc(row) {
      this.showInfo = !this.showInfo
      this.showInfoObject = row

    },
    buttonY(row) {
      row.status = 1
      fetchSave(row).then(response => {
        if (response.status == 200) {
          this.showEdit = false
          this.getList()
        }
      })
    },
    buttonN(row) {
      row.status = 0
      fetchSave(row).then(response => {
        if (response.status == 200) {
          this.showEdit = false
          this.getList()
        }
      })
    },
    updateInfoFc(row) {
      this.setType = 2
      this.showEdit = true
      this.editForm = row
      this.editPasswordShow.info=row
      console.log(this.editPasswordShow)
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    reset() {
      this.listQuery = {
        page: 1,
          limit: 20,
          name: undefined,
          phone: undefined,
          company: undefined,
          parentCompany: undefined,
          status: undefined,
          sort: 'add_time',
          order: 'desc'
      }
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['用户名', '手机号码', '性别', '生日', '状态']
        const filterVal = ['username', 'mobile', 'gender', 'birthday', 'status']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息')
        this.downloadLoading = false
      })
    },
    init(){
      var myDate = new Date;
      var year = myDate.getFullYear();//获取当前年
      var month = myDate.getMonth()+1;//获取当前月
      var day = myDate.getDate();//获取当前日

      this.initSelectYear(year)
      this.initSelectMonth();
      this.initSelectDay(year,month);
      this.yearsModel = year;
      this.monthsModel = month;
      this.daysModel = day;
      let obj ={year:this.yearsModel,month:this.monthsModel,day:this.daysModel }
      // this.$parent.dateChange(obj);
    },
    initSelectYear(year){
      this.years = [];
      for(let i=0;i<30;i++){
        this.years.push({value:(year - i),label:(year - i)+ "年"});
      }
    },
    initSelectMonth(){
      this.months = [];
      this.months.push({value:0,label:"全部"});
      for(let i=1;i<=12;i++){
        this.months.push({value:i,label:i+ "月"});
      }
    },
    initSelectDay(year,month){
      var maxDay = this.getMaxDay(year,month);
      this.days = [];
      this.days.push({value:0,label:"全部"});
      for(var i=1;i<=maxDay;i++){
        this.days.push({value:i,label:i+ "日"});
      }
    },
    dateChange(type){
      //1年 2月 3日 4 左 5右
      if(type == 1||type == 2){
        if(this.monthsModel == 0){
          this.daysModel = 0;
          this.initSelectDay(this.yearsModel,1);
        }else{
          this.initSelectDay(this.yearsModel,this.monthsModel);
        }
      }
      if(type == 4){
        this.dayleft();
      }
      if(type == 5){
        this.dayright();
      }

      //操作父组件方法
      let obj ={year:this.yearsModel,month:this.monthsModel,day:this.daysModel }
      // this.$parent.dateChange(obj);
    },
    dayleft(){

      var tmpYear = this.yearsModel;
      var tmpMonth =  this.monthsModel;
      var tmpDay = this.daysModel;
      if(tmpYear ==null){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        var month = myDate.getMonth()+1;//获取当前月
        var day = myDate.getDate();//获取当前日
        this.yearsModel = year;
        this.monthsModel = month;
        this.daysModel = day;
        return;
      }
      if(tmpMonth ==null){ tmpMonth = 0}
      if(tmpDay ==null){ tmpDay = 0}

      var yearV = tmpYear;
      var monthV = tmpMonth ;
      var dayV = tmpDay;

      if((tmpMonth == 0||tmpMonth == 1) && (tmpDay == 0||tmpDay == 1)){
        yearV = tmpYear  - 1; monthV = 12;
        dayV = this.getMaxDay(tmpYear,tmpMonth);
      }
      if(!(tmpMonth == 0||tmpMonth == 1) && (tmpDay == 0||tmpDay == 1)){
        monthV = tmpMonth - 1;
        dayV = this.getMaxDay(tmpYear,tmpMonth);
      }
      if((tmpMonth == 0||tmpMonth == 1) && !(tmpDay == 0||tmpDay == 1)){
        dayV = tmpDay - 1;
      }
      if(!(tmpMonth == 0||tmpMonth == 1) && !(tmpDay == 0||tmpDay == 1)){
        dayV = tmpDay - 1;
      }
      this.yearsModel = yearV;
      this.monthsModel = monthV;
      this.daysModel = dayV;
    },
    dayright(){

      var myDate = new Date;
      var year = myDate.getFullYear();//获取当前年
      var month = myDate.getMonth()+1;//获取当前月
      var day = myDate.getDate();//获取当前日

      var tmpYear = this.yearsModel;
      var tmpMonth =  this.monthsModel;
      var tmpDay = this.daysModel;

      if(tmpYear ==null){
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年
        var month = myDate.getMonth()+1;//获取当前月
        var day = myDate.getDate();//获取当前日
        this.yearsModel = year;
        this.monthsModel = month;
        this.daysModel = day;
        return;
      }

      if(tmpMonth ==null){ tmpMonth = 0}
      if(tmpDay ==null){ tmpDay = 0}
      if(tmpYear>year){
        this.yearsModel = year;
        this.monthsModel = month;
        this.daysModel = day;
        return;
      }
      if(tmpYear == year){
        if((tmpMonth > month || tmpMonth ==0 )||(tmpMonth == month )&&(tmpDay >= day || tmpDay ==0)){
          this.yearsModel = year;
          this.monthsModel = month;
          this.daysModel = day;
          return;
        }
      }

      var maxDay = this.getMaxDay(tmpYear,tmpMonth);
      var yearV = tmpYear;
      var monthV = tmpMonth ;
      var dayV = tmpDay;

      if((tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)){
        yearV = tmpYear  + 1; monthV = 1;
        dayV = 1;
      }
      if(!(tmpMonth == 0 || tmpMonth == 12) && (tmpDay == 0 || tmpDay == maxDay)){
        monthV = tmpMonth + 1;
        dayV = 1;
      }
      if(!(tmpMonth == 0 || tmpMonth == 12) && !(tmpDay == 0 || tmpDay == maxDay)){
        dayV = tmpDay + 1;
      }

      this.yearsModel = yearV;
      this.monthsModel = monthV;
      this.daysModel = dayV;

    },
    getMaxDay(year,month){
      var new_year = year;  //取当前的年份
      var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
      if(month>12)      //如果当前大于12月，则年份转到下一年
      {
        new_month -=12;    //月份减
        new_year++;      //年份增
      }
      var new_date = new Date(new_year,new_month,1);//取当年当月中的第一天
      return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
    },
    toLead(){
      this.dialogShow.show = true
    }
  }
}
</script>
