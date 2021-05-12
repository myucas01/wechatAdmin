<!--新增子公司-->
<template>
  <div class="app-container">
    <div class="appBox">
      <el-scrollbar style="height: 100%;">
        <div class="appWrap">
          <p class="appTitle">编辑和新增子公司</p>
          <p>基础信息</p>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">

            <el-form-item label="子公司名称" prop="company_name">
              <el-input v-model="ruleForm.company_name" placeholder="请填写子公司名称" />
            </el-form-item>

            <el-form-item label="子公司类型" prop="subType">
              <!-- <el-input v-model="ruleForm.company_type" placeholder="请填写子公司类型" /> -->
              <el-select v-model="ruleForm.subType" placeholder="请填写子公司类型">
                <el-option label="一级公司/省级" value="1"></el-option>
                <el-option label="二级公司/市级" value="2"></el-option>
                <el-option label="三级公司/县级" value="3"></el-option>
                <el-option label="四级公司/分支" value="4"></el-option>
                <el-option label="其它" value="5"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="子公司联系人" prop="company_linkman">
              <el-input v-model="ruleForm.company_linkman" placeholder="请填写子公司联系人" />
            </el-form-item>

            <el-form-item label="联系方式" prop="company_phone">
              <el-input v-model="ruleForm.company_phone" placeholder="请填写子公司联系人的联系方式" />
            </el-form-item>

            <el-form-item label="联系邮箱" prop="company_email">
              <el-input v-model="ruleForm.company_email" placeholder="请填写子公司联系邮箱" />
            </el-form-item>

            <el-form-item label="企业收货地址" required>
              <div>
                <div v-for="(item,index) in ruleForm.addresses" :key="index" class="addressItem">
                  <el-select v-model="item.province" placeholder="请选择省" @change="handleProvince($event,index)">
                    <el-option v-for="(option,i) in provinceList" :label="option.name" :value="option.name" :key="i" />
                  </el-select>
                  <el-select v-model="item.city" placeholder="请选择市" @change="handleCity($event,index)">
                    <el-option v-for="(option,i) in item.cityList" :key="i" :label="option.name" :value="option.name" />
                  </el-select>
                  <el-select v-model="item.county" placeholder="请选择区" @change="handleCounty($event,index)">
                    <el-option v-for="(option,i) in item.countyList" :key="i" :label="option.name" :value="option.name" />
                  </el-select>
                  <div style="margin-top: 10px;display: flex;">
                    <el-input v-model="item.addressDetail" style="flex: 1;" placeholder="请填写详细地址" />
                    <el-button v-if="addressShow" type="danger" style="width: 90px;margin-left: 10px;" icon="el-icon-delete"
                      @click="removeAddress(index)">删除</el-button>
                  </div>

                </div>

              </div>
              <!-- <el-button type="primary" style="margin-top: 10px;" icon="el-icon-plus" @click="addAdress">新增</el-button> -->
            </el-form-item>

            <el-form-item label="备注" prop="company_remark">
              <el-input v-model="ruleForm.company_remark" type="textarea" placeholder="请输入备注" />
            </el-form-item>

          </el-form>
          
        </div>
      </el-scrollbar>

    </div>
    <div style="position: absolute;bottom: 0;width: 100%;height: 60px;line-height: 60px;">
      <el-button @click="goBack">取消</el-button>
      <el-button :loading="qcLoading" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </div>
  </div>
</template>

<script>
  import { regionClist, companyAdd, companyRead, companyEdit } from '@/api/user'
  import SubsidiaryDetail from './SubsidiaryDetail.vue'
  export default {
    components:{
      SubsidiaryDetail
    },
    data() {
      return {
        id: this.$route.query.id,
        areaList: [],
        provinceList: [],
        addressShow: true,
        ruleForm: {
          'addresses': [{
            'addrType': 2,
            'addressDetail': '',
            'areaCode': '',
            'city': '',
            'county': '',
            cityList: [],
            countyList: [],
            'deleted': false,
            'isDefault': false,
            'province': ''
          }],
          'company_linkman': '',
          'company_name': '',
          'company_phone': '',
          'company_remark': '',
          'pid': this.$route.query.company_ids
        },
        rules: {
          company_name: [{
            required: true,
            message: '请填写企业名称',
            trigger: 'blur'
          }],
          company_linkman: [{
            required: true,
            message: '请填写企业联系人姓名',
            trigger: 'blur'
          }],
          company_phone: [{
            required: true,
            message: '请填写企业联系人的联系方式',
            trigger: 'blur'
          }],
            subType: [{
              required: true,
              message: '请填写子公司类型',
              trigger: 'blur'
            }]
         ,
            company_email:[{
              required: true,
              message: '请填写子公司联系邮箱',
              trigger: 'blur'
            }]
          
        }
      }
    },
    computed: {
      qcLoading() {
        return this.$store.getters.qcLoading
      }
    },
    watch: {
      ruleForm: {
        handler(newName, oldName) {
          if (this.ruleForm.addresses.length > 1) {
            this.addressShow = true
          } else {
            this.addressShow = false
          }
        },
        immediate: true,
        deep: true
      }
    },
    created() {
      if (this.id) {
        this.companyRead()
      } else {
        this.regionClist()
      }
    },
    methods: {
      companyRead() {
        const res = companyRead({
            company_id: this.id
          })
          .then(res => {
            if (res.data.errno == 0) {
              this.ruleForm = res.data.data

              const res1 = regionClist()
                .then(res1 => {
                  this.areaList = res1.data.data.list
                  this.areaList.forEach(item => {
                    this.provinceList.push(item)
                  })
                  this.ruleForm.addresses.forEach(item => {
                    this.areaList.forEach(city => {
                      if (item.province == city.name) {
                        item.cityList = city.children
                        city.children.forEach(county => {
                          if (item.city == county.name) {
                            item.countyList = county.children
                          }
                        })
                      }
                    })
                  })
                })


            }
          })
      },
      handleCounty(e, index) {
        this.ruleForm.addresses.forEach((item, i) => {
          if (i == index) {
            item.countyList.forEach(op => {
              if (e == op.name) {
                item.areaCode = op.code
              }
            })
          }
        })
      },
      handleProvince(e, index) {
        this.areaList.forEach(item => {
          if (e == item.name) {
            this.ruleForm.addresses.forEach((op, i) => {
              if (i == index) {
                op.city = ''
                op.county = ''
                op.countyList = []
                op.cityList = item.children
              }
            })
          }
        })
      },
      handleCity(e, index) {
        this.ruleForm.addresses.forEach((item, i) => {
          if (i == index) {
            item.county = ''
            item.cityList.forEach(op => {
              if (e == op.name) {
                item.countyList = op.children
              }
            })
          }
        })
      },

      regionClist() {
        const res = regionClist()
          .then(res => {
            this.areaList = res.data.data.list
            this.areaList.forEach(item => {
              this.provinceList.push(item)
            })
          })
      },
      goBack() {
        this.$router.go(-1)
      },
      // addAdress() {
        //   this.ruleForm.addresses.push({
        //     'addrType': 2,
        //     'addressDetail': '',
        //     'areaCode': '',
        //     'city': '',
        //     'county': '',
        //     cityList: [],
        //     countyList: [],
        //     'deleted': false,
        //     'isDefault': false,
        //     'province': ''
        //   })
      // },
      removeAddress(index) {
        this.ruleForm.addresses.splice(index, 1)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let bs = false
            this.ruleForm.addresses.forEach(item => {
              if (!item.province || !item.city || !item.county || !item.addressDetail) {
                this.$message.error('请输入企业收货地址')
                bs = true
                return
              }
            })
            if (bs) {
              return
            }
            const config = JSON.parse(JSON.stringify(this.ruleForm))
            config.addresses.forEach(item => {
              delete item.cityList
              delete item.countyList
            })
            if (this.id) {
              const res = companyEdit(config)
                .then(res => {
                  if (res.data.errno == 0) {
                    this.$message.success('修改成功')
                    this.$router.push('companyList')
                  } else {
                    this.$message.error(res.data.errmsg)
                  }
                })
            } else {
              const res = companyAdd(config)
                .then(res => {
                  if (res.data.errno == 0) {
                    this.$message.success('添加成功')
                    this.$router.push('companyList')
                  } else {
                    this.$message.error(res.data.errmsg)
                  }
                })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .appBox {
    position: absolute;
    height: calc(100% - 90px);
    width: calc(100% - 40px);
    box-shadow: 2px 2px 5px #E9EAEC;
    border: 1px solid #E9EAEC;
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

  .el-scrollbar>>>.el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .SubsidiaryDetail{
    width:100%;
    border-top:1px solid #000;
    padding:10px 0;
}
.sections_title{
    .detail{
        font:14px/20px "";
        color:#000;
    }
}
</style>
