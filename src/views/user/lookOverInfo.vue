<template>
  <div class="app-container">
    <div class="appBox">
      <el-scrollbar style="height: 100%;">
        <div class="appWrap">
          <p class="appTitle">
            查看企业信息
            <span
              :class="[status == 0? 'status_success': 'status_error']"
            >当前状态: {{status==0?'有效':'失效'}}</span>
          </p>
          <p>基础信息</p>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="150px"
            class="demo-ruleForm"
          >
          <el-form-item label="企业账号登录名" prop="username">
              <el-input :disabled="look" v-model="ruleForm.username" placeholder="请填写企业账号登录名" />
            </el-form-item>
            <el-form-item label="登录密码" prop="company">
              <el-input  :disabled="look" type="password" value="12345" placeholder="登录密码" />
              <!-- <el-input  :disabled="look" v-model="ruleForm.password" placeholder="登录密码" /> -->

            </el-form-item>
            <el-form-item label="账号企业名称" prop="company">
              <el-input :disabled="look" v-model="ruleForm.company" placeholder="请填写企业名称" />
            </el-form-item>
            <el-form-item label="所属企业" prop="company">
              <el-input :disabled="look" v-model="ruleForm.parentCompany" placeholder="请填写所属企业" />
            </el-form-item>
            <!-- <el-form-item label="账号企业类型" prop="company">
              <el-input :disabled="look" v-model="ruleForm.subType" placeholder="请填写账号企业类型" />
            </el-form-item> -->

             <el-form-item label="账号企业类型: " prop="subType" style="width:70%">
              <el-select style="width: 100%;" v-model="ruleForm.subType" :loading="loading"
                remote  reserve-keyword filterable placeholder="请选择账号企业类型">
                <el-option v-for="item in companyTypeS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="账号持有人" prop="company_linkman">
              <el-input :disabled="look" v-model="ruleForm.accountOwner" placeholder="请填写企业联系人姓名" />
            </el-form-item>

            <el-form-item label="联系方式" prop="company_phone">
              <el-input :disabled="look" v-model="ruleForm.mobile" placeholder="请填写企业联系人的联系方式" />
            </el-form-item>

            <el-form-item label="联系邮箱" prop="company_phone">
              <el-input :disabled="look" v-model="ruleForm.email" placeholder="请填写企业联系人的联系邮箱" />
            </el-form-item>
            <el-form-item label="账号企业地址" required>
              <div>
                <div v-for="(item,index) in ruleForm.addresses" :key="index" class="addressItem">
                  <el-select
                    v-model="item.province"
                    placeholder="请选择省"
                    @change="handleProvince($event,index)"
                  >
                    <el-option
                      v-for="(option,i) in provinceList"
                      :label="option.name"
                      :value="option.name"
                      :key="i"
                    />
                  </el-select>
                  <el-select
                    v-model="item.city"
                    placeholder="请选择市"
                    @change="handleCity($event,index)"
                  >
                    <el-option
                      v-for="(option,i) in item.cityList"
                      :key="i"
                      :label="option.name"
                      :value="option.name"
                    />
                  </el-select>
                  <el-select
                    v-model="item.county"
                    placeholder="请选择区"
                    @change="handleCounty($event,index)"
                  >
                    <el-option
                      v-for="(option,i) in item.countyList"
                      :key="i"
                      :label="option.name"
                      :value="option.name"
                    />
                  </el-select>
                  <div style="margin-top: 10px;display: flex;">
                    <el-input v-model="item.addressDetail" style="flex: 1;" placeholder="请填写详细地址" />
                    <el-button
                      v-if="addressShow"
                      type="danger"
                      style="width: 90px;margin-left: 10px;"
                      icon="el-icon-delete"
                      @click="removeAddress(index)"
                    >删除</el-button>
                  </div>
                </div>
              </div>
              <!-- <el-button type="primary" style="margin-top: 10px;" icon="el-icon-plus" @click="addAdress">新增</el-button> -->
            </el-form-item>

            <el-form-item label="备注" prop="company_remark">
              <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入备注" />
            </el-form-item>
          </el-form>
          <!--子公司信息-->
          <!-- <div class="SubsidiaryDetail">
            <div class="sections_title">
              <h4>子公司信息</h4>
            </div>
          </div>
          <Subsidiary-detail />
          <div class="edit_history">
            <h4>操作记录</h4>
            <template>
              <el-table :data="tableDataHistory" style="width: 100%">
                <el-table-column prop="admin" label="处理人" width="180"></el-table-column>
                <el-table-column prop="updateTime" label="处理时间" width="180"></el-table-column>
                <el-table-column prop="action" label="处理记录"></el-table-column>
              </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery1.page" :limit.sync="listQuery1.limit" @pagination="getList" /> -->

            <!-- </template> -->
          <!-- </div> -->
        </div>
      </el-scrollbar>
    </div>
    <div style="position: absolute;bottom: 0;width: 100%;height: 60px;line-height: 60px;">
      <el-button size="medium" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
'/company/account/detail'
import { regionClist, companyAdd, companyUserRead, companyEdit,logList } from "@/api/user";
import SubsidiaryDetail from "./SubsidiaryDetail.vue";
export default {
  components: {
    SubsidiaryDetail,Pagination
  },
  data() {
    return {
      companyTypeS:[{
          value: "",
          label: '请选择该账号的企业类型',
        },{
          value: "0",
          label: '总公司', 
        },{
          value: "1",
          label: '一级子公司/省级', 
        },{
          value: "2",
          label: '二级子公司/市级', 
        },{
          value: "3",
          label: '三级子公司/县级', 
        },{
          value: "4",
          label: '四级子公司/分支', 
        },{
          value: "5",
          label: '其它', 
      }],
      // look: this.$route.query.look,
      look: false,
      status: this.$route.query.status,
      id: this.$route.query.id,
      areaList: [],
      provinceList: [],
      addressShow: true,
      ruleForm: {
        subType: 0,
        addresses: [
          {
            addrType: 2,
            addressDetail: "",
            areaCode: "",
            city: "",
            county: "",
            cityList: [],
            countyList: [],
            deleted: false,
            isDefault: false,
            province: ""
          }
        ],
        company_linkman: "",
        company: "",
        company_phone: "",
        company_remark: ""
      },
      rules: {
        company: [
          {
            required: true,
            message: "请填写企业名称",
            trigger: "blur"
          }
        ],
        company_linkman: [
          {
            required: true,
            message: "请填写企业联系人姓名",
            trigger: "blur"
          }
        ],
        company_phone: [
          {
            required: true,
            message: "请填写企业联系人的联系方式",
            trigger: "blur"
          }
        ]
      },
      tableDataHistory: [],
      total: 10, // 总数
      listQuery1:{
        page: 1, // 页码
        limit: 10, // 数量
        sort: 'id',
        order: 'desc', //
        name: this.$store.state.user.name
      }
    };
  },
  computed: {
    qcLoading() {
      return this.$store.getters.qcLoading;
    }
  },
  watch: {
    ruleForm: {
      handler(newName, oldName) {
        if (this.ruleForm.addresses.length > 1) {
          this.addressShow = true;
        } else {
          this.addressShow = false;
        }
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // console.log(111111111111)
    // console.log(this.$store.state.user.name)
    if (this.id) {
      this.companyUserRead();
      this.getList()
    } else {
      this.regionClist();
    }
  },
  methods: {
    
    companyUserRead() {
      const res = companyUserRead({
        id: this.id
      }).then(res => {
        if (res.data.errno == 0) {
          this.ruleForm = res.data.data;

          const res1 = regionClist().then(res1 => {
            this.areaList = res1.data.data.list;
            this.areaList.forEach(item => {
              this.provinceList.push(item);
            });
            this.ruleForm.addresses.forEach(item => {
              this.areaList.forEach(city => {
                if (item.province == city.name) {
                  item.cityList = city.children;
                  city.children.forEach(county => {
                    if (item.city == county.name) {
                      item.countyList = county.children;
                    }
                  });
                }
              });
            });
          });
        }
      });
     
    },
    getList(){
      logList(this.listQuery1).then(res=>{
        console.log(res)
        this.total = res.data.data.total;
        this.tableDataHistory = res.data.data.list;
      })
    },
    handleCounty(e, index) {
      this.ruleForm.addresses.forEach((item, i) => {
        if (i == index) {
          item.countyList.forEach(op => {
            if (e == op.name) {
              item.areaCode = op.code;
            }
          });
        }
      });
    },
    handleProvince(e, index) {
      this.areaList.forEach(item => {
        if (e == item.name) {
          this.ruleForm.addresses.forEach((op, i) => {
            if (i == index) {
              op.city = "";
              op.county = "";
              op.countyList = [];
              op.cityList = item.children;
            }
          });
        }
      });
    },
    handleCity(e, index) {
      this.ruleForm.addresses.forEach((item, i) => {
        if (i == index) {
          item.county = "";
          item.cityList.forEach(op => {
            if (e == op.name) {
              item.countyList = op.children;
            }
          });
        }
      });
    },

    regionClist() {
      const res = regionClist().then(res => {
        this.areaList = res.data.data.list;
        this.areaList.forEach(item => {
          this.provinceList.push(item);
        });
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    addAdress() {
      this.ruleForm.addresses.push({
        addrType: 2,
        addressDetail: "",
        areaCode: "",
        city: "",
        county: "",
        cityList: [],
        countyList: [],
        deleted: false,
        isDefault: false,
        province: ""
      });
    },
    removeAddress(index) {
      this.ruleForm.addresses.splice(index, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let bs = false;
          this.ruleForm.addresses.forEach(item => {
            if (
              !item.province ||
              !item.city ||
              !item.county ||
              !item.addressDetail
            ) {
              this.$message.error("请输入企业收货地址");
              bs = true;
              return;
            }
          });
          if (bs) {
            return;
          }
          const config = JSON.parse(JSON.stringify(this.ruleForm));
          config.addresses.forEach(item => {
            delete item.cityList;
            delete item.countyList;
          });
          if (this.id) {
            const res = companyEdit(config).then(res => {
              if (res.data.errno == 0) {
                this.$message.success("修改成功");
                this.$router.push("companyList");
              } else {
                this.$message.error(res.data.errmsg);
              }
            });
          } else {
            const res = companyAdd(config).then(res => {
              if (res.data.errno == 0) {
                this.$message.success("添加成功");
                this.$router.push("companyList");
              } else {
                this.$message.error(res.data.errmsg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appBox {
  position: absolute;
  height: calc(100% - 90px);
  width: calc(100% - 40px);
  box-shadow: 2px 2px 5px #e9eaec;
  border: 1px solid #e9eaec;
  padding: 10px 0 10px 10px;
}

.appWrap {
  background: #fff;
  padding: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.appTitle {
  font-size: 16px;
  font-weight: bold;
  color: rgba(28, 36, 56, 1);
  margin: 0;
  margin-bottom: 20px;
}

.addressItem {
  margin-top: 10px;
  overflow: hidden;
}

.addressItem:first-child {
  margin: 0;
}

.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.SubsidiaryDetail {
  width: 100%;
  border-top: 1px solid #000;
  padding: 10px 0;
}
.sections_title {
  .detail {
    font: 14px/20px "";
    color: #000;
  }
}
.status_success {
  font: 12px/2 "";
  color: #fff;
  background-color: #52ce8d;
  display: inline-block;
  padding: 0 10px;
  margin-left: 20px;
}
.status_error {
  font: 12px/2 "";
  color: #fff;
  background-color: #f33;
  display: inline-block;
  padding: 0 10px;
  margin-left: 20px;
}
</style>
