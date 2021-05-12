<template>
  <div class="app-containerset">
    <h3>{{parentCompanyName?parentCompanyName:''}} 地址管理</h3>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <div class="filter-seek">
        <div class="seekLeft">
          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="company">企业名称:</label>
            <el-input
              id="company"
              v-model="listQuery.name"
              clearable
              class="filter-item"
              style="width: 220px;height:36px"
              placeholder
            />
          </div>

          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="selectTittle">企业类型:</label>
            <el-select class="selectTittle" v-model="listQuery.subType" placeholder>
              <el-option
                v-for="(item,index) in subTypeS"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="seekLeftBox">
            <label style="color: #333;margin-right:10px;font-weight:300" for="selectTittle">账号状态:</label>
            <el-select class="selectTittle" v-model="listQuery.status" placeholder>
              <el-option
                v-for="(item,index) in selictList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="seekRight">
          <el-button
            class="filter-item searchBtn"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >查找</el-button>
        </div>
      </div>
    </div>
    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" min-width="100px" label="企业名称" prop="name" />
      <el-table-column align="center" label="企业类型" prop="subtype">
        <template
          slot-scope="scope"
        >{{scope.row.subType == 0? '总公司':( scope.row.subType == 1? '一级子公司/省级': ( scope.row.subType == 2? '二级子公司/市级': ( scope.row.subType == 3? '三级子公司/县级': ( scope.row.subType == 4? '四级子公司/分支': '其它' ) ) ))}}</template>
      </el-table-column>
      <el-table-column align="center" label="账号状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" type="success">可用</el-tag>
          <el-tag v-if="scope.row.status==1" type="warning">禁止</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">注销</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所在地区">
        <template slot-scope="scope">{{scope.row.province}} {{scope.row.city}} {{scope.row.county}}</template>
      </el-table-column>

      <el-table-column align="center" label="详细地址">
        <template slot-scope="scope">{{scope.row.addressDetail}}</template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="操作" prop="setting">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            class="statusBtn"
            @click="reviseAddress(scope.row)"
          >修改收货地址</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="revuseAdd" v-if="dilogOpen">
      <div class="tableBox">
        <div class="daloghead">
          <h3>修改收货地址</h3>
          <i class="el-icon-close" v-on:click="closeBtn()"></i>
        </div>

        <el-form :inline="true" :model="ruleForm" label-width="150px" class="demo-form-inline">
          <el-form-item label="企业名称: ">
            <el-input style="width:250px;color:#000 !important" v-model="ruleForm.name" :disabled="true"  placeholder-id placeholder="请输入企业名称" />
          </el-form-item>
          <!-- <input type="text" v-model="ruleForm.name" > -->
          <!-- <el-form-item label="详细地址: ">
            <el-select
              style="width: 120px;margin-right:10px;margin-bottom:10px"
              v-model="list.province"
              :remote-method="remoteMethod"
              :loading="loading"
              remote
              @change="handleCompany($event)"
              reserve-keyword
              filterable
              placeholder="请选择省"
            >
              <el-option
                v-for="item in ruleForm.provinceNameS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              style="width: 120px;margin-right:10px;margin-bottom:10px"
              v-model="list.city"
              :remote-method="remoteMethod"
              :loading="loading"
              remote
              @change="handleCompany($event)"
              reserve-keyword
              filterable
              placeholder="请选择市"
            >
              <el-option
                v-for="item in ruleForm.cityNameS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              style=" width: 120px;margin-right:10px;margin-bottom:10px"
              v-model="list.county"
              :remote-method="remoteMethod"
              :loading="loading"
              remote
              @change="handleCompany($event)"
              reserve-keyword
              filterable
              placeholder="请选择区"
            >
              <el-option
                v-for="item in ruleForm.countiesNameS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <br />
          </el-form-item> -->
          <el-form-item label="企业收货地址:" required>
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
              </div>
          </el-form-item>

          <el-form-item label="详细地址:" required>
            <el-input
              v-model="ruleForm.addressDetail"
              style="width:607px;"
              placeholder="请输入详细地址信息,如道路、门牌号、建筑名称、楼层、单元等信息"
            />
            <div class="warningInfo" style="color: red">详细地址长度需要在5-200个汉字或字符之间</div>
          </el-form-item>
          <el-form-item style="width:100%;text-align:center;margin-top:40px">
            <el-button style="width:100px" @click="closeBtn()">取消</el-button>
            <el-button style="width:100px;margin-left: 30px" type="primary" @click="submitForm">确认保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import {
  receivingAddress,
  receivingAddressUpdate /*修改收货地址*/,
  companyRead /*city*/,
  regionClist
} from "@/api/user";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
export default {
  name: "UserAddress",
  components: { Pagination },
  data() {
    return {
      provinceList: [], // 省
      list: null,
      infoList: null,
      total: 0,
      loading: false,
      listLoading: true,
      dilogOpen: false,
      selictList: "1",
      companyTypeS: "",
      parentCompanyName: this.$route.query.companyName, //母公司名字
      province: "", //省
      city: "", //市
      county: "", //县区
      addressDetail: "", //具体地址
      subTypeS: [
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
          label: "其他"
        }
      ],
      selictList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "可用"
        },
        {
          value: "1",
          label: "不可用"
        }
        // {
        //   value: "3",
        //   label: "未开通"
        // }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        status: "",
        subType: "",
        name: "",
        companyId: "ID"
      },
      ruleForm: {
        action: "编辑企业地址",
        // parentCompany: "", // 所属企业
        // companyName: "",
        // subType:"请选择该账号的企业类型",// 账户类型
        // username: "",
        // companyId: this.$route.query.id,
        // accountOwner: "", // 账户持有人
        // mobile: "", // 联系方式
        // remarks: "",
        // password: "",
        // newPassword: "",
        // company: "", // 账号企业名称
        // address: "", // 地址
        // email: "", // 邮箱
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
      downloadLoading: false,
      formInline: {}
    };
  },
  created() {
    this.getList();
    this.companyRead();
  },
  watch: {},
  methods: {
    submitForm(){ // 更改地址
      console.log(this.ruleForm)
      this.ruleForm.city = this.ruleForm.addresses[0].city
      this.ruleForm.county = this.ruleForm.addresses[0].county
      this.ruleForm.province = this.ruleForm.addresses[0].province
      receivingAddressUpdate(this.ruleForm).then(res=>{
        console.log(res)
        if(res.data.errno == 0){
          // 成功
          this.getList()
          this.dilogOpen =false;
          this.$message.success("修改成功");

        }else{
          // 修改失败
          this.$message.error("修改失败");
        }
      })
    },
    reviseAddress(row) {
      console.log("打开弹窗");
      console.log(row);
      this.ruleForm.id = row.id
      this.ruleForm.companyId = row.companyId
      this.ruleForm.name = row.name
      this.ruleForm.addressDetail = row.addressDetail
      this.ruleForm.city = row.city
      this.ruleForm.county = row.county
      this.ruleForm.province = row.province

      this.ruleForm.addresses[0].city = row.city
      this.ruleForm.addresses[0].county = row.county
      this.ruleForm.addresses[0].province = row.province
    this.companyRead();
      


      this.dilogOpen = true;
    },
    getList() {
      this.listLoading = true;
      this.listQuery.companyId = this.$route.query.id;
      receivingAddress(this.listQuery)
        .then(response => {
          if (response.data.data.list) this.list = response.data.data.list;
          this.total = response.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
          console.log("没有数据");
        });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    closeBtn() {
      //关闭弹窗
      console.log("关闭弹窗");
      this.dilogOpen = false;
    },
    // 城市

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
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input.is-disabled /deep/ .el-input__inner{
  color:#606266;
}
.el-input__inner{
  color:#000;
}
.app-containerset {
  // position: relative;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
}
.filter-container {
  display: flex !important;
  flex-direction: column !important;
  .filter-seek {
    border: 1px solid #999;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
          align-items: center;
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
.revuseAdd {
  width: 100%;
  z-index: 999;
  height: 100%;

  // padding-bottom: 400px!important;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  .tableBox {
    width: 800px;
    height: 500px;
    margin: 200px auto;
    background: rgb(253, 252, 252);
    display: flex;
    flex-direction: column;
    .daloghead {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      h3 {
        margin: 20px;
      }
      i {
        display: block;
        margin: 20px;
      }
    }
    .demo-form-inline {
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 400px;
      margin: auto;
    }
  }
}
.revuseAdd .tableBox .demo-form-inline[data-v-f078cf54]{
  width:100%;
}
</style>