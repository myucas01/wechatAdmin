<template>
  <div class="app-container">
    <div class="appBox">
      <el-scrollbar style="height: 100%;">
        <div class="appWrap">
          <p class="appTitle">编辑和新增账号</p>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item label="企业账号登录名: " prop="username" style="width:80%">
              <el-input v-model="ruleForm.username" placeholder="请输入企业账号" />
              <!-- <el-input v-else v-model="ruleForm.username" placeholder="请输入企业账号" /> -->
            </el-form-item>

            <!-- <el-form-item v-if="id" class="passwordS" label="密码: " prop="password">
              <el-input v-model="ruleForm.password" :show-password="seeable" placeholder="" />
              <div class="see">
                <div v-if="seeable" v-on:click="seeableS" class="seeble">可见</div>
                <div v-else v-on:click="disseeableS" class="disseeble">不可见</div>
              </div>
              <div class="revise" v-on:click="revisePassword">修改密码</div>
            </el-form-item>-->

            <el-form-item label="登录密码: " prop="password" style="width:80%">
              <el-input v-model="ruleForm.password" placeholder="请设置登录密码" />
            </el-form-item>
            <!-- <el-form-item v-if="newPasswordShow" label="新密码: " prop="newPassword" style="width:80%">
              <el-input v-model="ruleForm.newPassword"  placeholder="" />
            </el-form-item>-->
          </el-form>

          <div class="xiahuaxian"></div>

          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="150px"
            class="demo-ruleForm2"
          >
            <el-form-item label="账号企业名称: " prop="company" style="width:75%">
              <el-input v-model="ruleForm.company" placeholder />
            </el-form-item>

            <!-- <el-form-item label="所属企业: " prop="accountOwner">
              <el-input v-model="ruleForm.accountOwner" placeholder="" />
            </el-form-item>-->
            <el-form-item label="所属企业: " prop="parentCompany" style="width:75%">
              <el-input v-model="ruleForm.parentCompany" placeholder />
            </el-form-item>

            <el-form-item label="账号企业类型: " prop="subType" style="width:70%">
              <el-select
                style="width: 100%;"
                v-model="ruleForm.subType"
                :loading="loading"
                remote
                reserve-keyword
                filterable
                placeholder="请选择账号企业类型"
              >
                <el-option
                  v-for="item in companyTypeS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="账号持有人: " prop="accountOwner" style="width:75%">
              <el-input v-model="ruleForm.accountOwner" placeholder="请输入账号持有人姓名" />
            </el-form-item>

            <el-form-item label="联系方式: " prop="mobile" style="width:75%">
              <el-input v-model="ruleForm.mobile" placeholder="请输入账号持有人手机号" />
            </el-form-item>

            <el-form-item label="联系邮箱: " prop="email" style="width:75%">
              <el-input v-model="ruleForm.email" placeholder />
            </el-form-item>

            <!-- 地址 -->
            <el-form-item label="企业收货地址" required>
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

            <el-form-item label="备注" prop="remarks">
              <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入备注" />
            </el-form-item>

            <!-- <el-form-item label="账号企业地址: " prop="addresses">
              <el-select style="width: 200px;margin-right:10px;margin-bottom:10px" v-model="ruleForm.addresses[0].province" :remote-method="remoteMethod" :loading="loading"
                remote @change="handleCompany($event)" reserve-keyword filterable placeholder="请选择省">
                <el-option v-for="item in ruleForm.provinceNameS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select style="width: 200px;margin-right:10px;margin-bottom:10px" v-model="ruleForm.addresses[0].city" :remote-method="remoteMethod" :loading="loading"
                remote @change="handleCompany($event)" reserve-keyword filterable placeholder="请选择市">
                <el-option v-for="item in ruleForm.cityNameS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select style=" width: 200px;margin-right:10px;margin-bottom:10px" v-model="ruleForm.addresses[0].county" :remote-method="remoteMethod" :loading="loading"
                remote @change="handleCompany($event)" reserve-keyword filterable placeholder="请选择区">
                <el-option v-for="item in ruleForm.countiesNameS" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <br>
              <el-input v-model="ruleForm.addresses[0].addressDetail" style="margin-top:20px;width:45%;min-width:200px" placeholder="具体地址" />
            </el-form-item> 

            <el-form-item label="备注: " prop="remarks">
              <el-input v-model="ruleForm.remarks" type="textarea" placeholder="请输入备注" />
            </el-form-item>-->
          </el-form>
        </div>
      </el-scrollbar>
    </div>
    <div style="position: absolute;bottom: 0;left: 45%;width: 100%;height: 60px;line-height: 60px;">
      <el-button @click="goBack">取消</el-button>
      <el-button style="margin-left:50px" :loading="qcLoading" type="primary" @click="submitForm">确定</el-button>
    </div>
  </div>
</template>

<script>
import { vaEmail } from "../../utils/validate.js";

import {
  companyList,
  companyUserAdd,
  companyUserEdit,
  companyRead,
  regionClist
} from "@/api/user";
export default {
  data() {
    return {
      // id: this.$route.query.id,
      provinceList: [],

      options: [],
      value: "",
      list: [],
      loading: false,
      listQuery: {
        page: 1,
        limit: 10000,
        sort: "id",
        order: "desc"
      },
      newPasswordShow: false, //修改密码
      seeable: true, //密码是否可见
      companyTypeS: [
        {
          value: "",
          label: "请选择该账号的企业类型"
        },
        {
          value: "0",
          label: "总公司"
        },
        {
          value: "1",
          label: "一级子公司/省级"
        },
        {
          value: "2",
          label: "二级子公司/市级"
        },
        {
          value: "3",
          label: "三级子公司/县级"
        },
        {
          value: "4",
          label: "四级子公司/分支"
        },
        {
          value: "5",
          label: "其它"
        }
      ],

      ruleForm: {
        parentCompany: "", // 所属企业
        companyName: "",
        subType: "", // 账户类型
        username: "",
        companyId: "",
        accountOwner: "", // 账户持有人
        mobile: "", // 联系方式
        remarks: "",
        password: "",
        newPassword: "",
        company: "", // 账号企业名称
        address: "", // 地址
        email: "", // 邮箱
        province: "", //省
        city: "", //市
        county: "", //县区
        addressDetail: "", //具体地址

        addresses: [
          // 企业地址
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
        ]
      },
      rules: {
        username: [
          {
            required: true,
            message: "企业账号不能为空",
            trigger: "blur"
          },
          {
            // validator: vaEmail, trigger: 'blur'
          }
        ],
        parentCompany: [
          {
            required: true,
            message: "所属企业不能为空",
            trigger: "blur"
          }
        ],
        subType: [
          {
            required: true,
            message: "账号企业类型不能为空",
            trigger: "blur"
          }
        ],
        accountOwner: [
          {
            required: true,
            message: "账号持有人不能为空",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "账号持有者手机号不能为空",
            trigger: "blur"
          }
        ],
        addresses: [
          {
            required: true,
            message: "账号企业地址不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        company: [
          {
            required: true,
            message: "账号企业名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },

  computed: {
    qcLoading() {
      return this.$store.getters.qcLoading;
    }
  },
  created() {
    this.companyRead();
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
  methods: {
    // handleCompany(e) {
    //   this.ruleForm.companyId = e
    //   let _field = this.$refs['ruleForm'].fields
    //   console.log(_field)
    //   _field.map(i => {
    //       if (i.prop === 'companyName') {
    //         i.clearValidate()
    //         return false
    //       }
    //     })
    // },
    // companyUserRead() {
    //   const res = companyUserRead({
    //       id: this.id
    //     })
    //     .then(res => {
    //       if (res.data.errno == 0) {
    //         this.ruleForm = res.data.data
    //         companyList(this.listQuery).then(response => {
    //           this.list = response.data.data.list.map(item => {
    //             return {
    //               value: item.id,
    //               label: item.name
    //             }
    //           })
    //           console.log('ruleForm',res.data.data)
    //           this.list.forEach(item => {
    //             if (item.value == this.ruleForm.companyId) {
    //               this.options = item
    //               this.ruleForm.companyName = item.label
    //             }
    //           })
    //         })
    //       }
    //     })
    // },
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.loading = true
    //     setTimeout(() => {
    //       this.loading = false
    //       this.options = this.list.filter(item => {
    //         return item.label
    //           .indexOf(query) > -1
    //       })
    //     }, 200)
    //   } else {
    //     this.options = []
    //   }
    // },

    // getList() {
    //   companyList(this.listQuery).then(response => {
    //     this.list = response.data.data.list.map(item => {
    //       return {
    //         value: item.id,
    //         label: item.name
    //       }
    //     })
    //   })
    // },
    goBack() {
      this.$router.go(-1);
    },
    // revisePassword() { //修改密码
    //   this.newPasswordShow = true
    // },
    // seeableS() { //密码可见
    //   this.seeable = false
    // },
    // disseeableS() { //密码不可见
    //   this.seeable = true
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       if (this.id) {
    //         const res = companyUserEdit(this.ruleForm)
    //           .then(res => {
    //             if (res.data.errno == 0) {
    //               this.$message.success('编辑成功')
    //               this.$router.push('companyUser')
    //             }else{
    //               this.$message.error(res.data.errmsg)
    //             }
    //           })
    //       } else {
    //         const res = companyUserAdd(this.ruleForm)
    //           .then(res => {
    //             if (res.data.errno == 0) {
    //               this.$message.success('添加成功')
    //               this.$router.push('companyUser')
    //             }else{
    //               this.$message.error(res.data.errmsg)
    //             }
    //           })
    //       }
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // chengshi
    companyRead() {
      const res = companyRead({
        company_id: 1
      }).then(res => {
        if (res.data.errno == 0) {
          // this.ruleForm = res.data.data

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
    submitForm() {
      console.log(this.ruleForm);
      console.log(companyUserAdd);
      companyUserAdd(this.ruleForm).then(res => {
        console.log(res);
        if (res.data.errno == 0) {
          this.$message.success("添加成功");
          this.$router.go(-1);
        } else {
          this.$message.error("添加失败");
        }
      });
    }
  }
};
</script>

<style scoped>
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
}

.addressItem:first-child {
  margin: 0;
}

.el-scrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.xiahuaxian {
  width: 100%;
  border-top: 1px solid rgb(155, 153, 153);
  margin: 0 auto 20px;
}
.appWrap /deep/ .demo-ruleForm {
  margin-bottom: 10px;
  margin: 10px auto;
  width: 60%;
  height: auto;
}
.appWrap /deep/ .demo-ruleForm2 {
  width: 60%;
  margin: 10px auto;
}
.passwordS /deep/ .el-form-item__content {
  width: 60%;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between */
}
.passwordS /deep/ .el-input {
  width: 40%;
  padding: 0 !important;
  /* margin-left: -40% */
}
.passwordS /deep/ .el-input__inner {
  border-color: rgba(0, 0, 0, 0);
  width: 200px;
}
.see {
  width: 80px;
  position: relative;
}
.seeble {
  position: absolute;
  top: 0;
  left: 25px;
  color: #66b1ff;
}
.disseeble {
  position: absolute;
  top: 0;
  left: 15px;
  color: #66b1ff;
}
.revise {
  color: #66b1ff;
  text-decoration: underline;
}
</style>
