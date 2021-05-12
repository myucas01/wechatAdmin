<template>
  <div class="app-container">
    <div class="includ-1">
      <!--查看菜单-->
      <div class="filter-container">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="品牌ID" />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查找</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--列表-->
      <el-table :data="tableList">
        <el-table-column label="品牌ID" prop="id" align="center"></el-table-column>
        <el-table-column label="品牌名称" prop="name" align="center"></el-table-column>
        <el-table-column label="品牌图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" width="100px" height="100px" />
          </template>
        </el-table-column>
        <el-table-column label="介绍" prop="desc" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-popover
              placement="bottom"
              trigger="click"
              width="688px"
            >-->
            <el-dialog
              :visible.sync="dialogVisible"
              width="40%"
              max-height="500px"
              :before-close="handleClose"
            >
              <div class="dilog" v-loading="loading">
                <div class="dilog_title">配送范围设置</div>
                <div class="dilog_edit">点击修改</div>
                <div class="dilog_content">
                  <el-tree
                    accordion
                    node-key="province_code"
                    :data="data"
                    show-checkbox
                    ref="tree"
                    @node-click="handleNodeClick"
                    highlight-current
                    :props="defaultProps"
                    @check="check_checked"
                    :default-checked-keys="resourceCheckedKey"
                  ></el-tree>
                  <!-- :default-checked-keys="authorities" -->
                </div>
              </div>

              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="insert_city">确 定</el-button>
              </span>
            </el-dialog>

            <el-button slot="reference" @click="getArea(scope)">设置配送区域</el-button>
            <!-- <el-button >click 激活</el-button> -->
            <!-- </el-popover> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="includ-2"></div>
  </div>
</template>

<script>
import { listBrand, distributeRead, distributeInsert } from "@/api/brand";
export default {
  name: "Scope",
  data() {
    return {
      loading:true, // 加载全配送区域数据
      insert_brand_id: '',
      resourceCheckedKey: [],
      dialogVisible: false,
      tableList: [],
      data: [],
      defaultProps: {
        children: "citycode_list",
        label: "province_name"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      listBrand().then(res => {
        if (res.status === 200) {
          this.tableList = res.data.data.list;
        }
      });
    },
    getArea(get_data) {  // 初始化树状图数据
      ;this.resourceCheckedKey = [];
      this.dialogVisible = true
      this.loading = true;
      this.insert_brand_id = get_data.row.id;
      distributeRead({ brand_id: get_data.row.id })
        .then(res => {
          if (res.data.errno == 0) {
            this.data = JSON.parse(
              JSON.stringify(res.data.data)
                .replace(/city_code/g, "province_code")
                .replace(/city_name/g, "province_name")
            );
            console.log(this.data)
            this.data.forEach(item=>{
              item.citycode_list.forEach(_item=>{
                if(_item.ischeck){
                  this.resourceCheckedKey.push( _item.province_code )
                }
              })
            })
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err);
          this.loading = false
        });
    },
    check_checked(data,val){ // 每次点击checkbox
      console.log(this.$refs.tree.getCheckedNodes(true)) // 全部的选中的复选框
      var arrlist = this.$refs.tree.getCheckedNodes(true).map(item=>{
        return item.province_code
      })
      this.resourceCheckedKey = arrlist;
    },
    insert_city(){ // 点击确定之后
      this.dialogVisible = false;
      distributeInsert({city_code: this.resourceCheckedKey.join(","), brand_id:this.insert_brand_id}).then(res=>{
        if(res.data.errno == 0){
          this.$message({showClose:true,type:'success',message:'修改地址成功!'});
        }
      })
      this.resourceCheckedKey = [];
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClose(done) {
      //关闭弹窗
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss">
.dilog {
  // width: 686px;
  // max-height: 700px;
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid #797979;
}
.dilog_title {
  text-align:left;
  text-indent: 40px;
  height: 50px;
  line-height: 50px;
  font: 600 20px/50px "";
  border-bottom: 1px solid #797979;
}
.dilog_edit {
  text-align:left;
  text-indent: 40px;
  line-height: 43px;
  font: 500 16px/43px "";
  border-bottom: 1px solid #797979;
  height: 43px;
}
.dilog_content {
  height: 500px;
  overflow: auto;
}
</style>