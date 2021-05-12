<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-row class="el-row-box">
        <el-col style="width:100px">
          <div class="grid-content grid-content-title">
            <p style="transform: translateY(-10px);">商品ID:</p>
            <p>商品分类:</p>
          </div>
        </el-col>
        <el-col style="width:240px;margin-right:20px;"><div class="grid-content">
          <div>
            <el-input v-model="listQuery.goodsSn" clearable class="filter-item" style="width: 235px;" placeholder="请输入商品编号"/>
          </div>
           <!-- 新增商品分类下拉框 -->
           <div style="white-space:nowrap">
              <el-select v-model="shopKindValue" placeholder="请选择" style="width:115px;margin-bottom:10px;" @change="shopKindChange">
                <el-option v-for="item in shopKind" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-select v-model="listQuery.categoryId" placeholder="请选择" style="width:115px;margin-bottom:10px;">
                <el-option v-for="item in shopKindChidren" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
           </div>
        </div></el-col>
        <el-col style="width:100px">
          <div class="grid-content grid-content-title">
            <p style="transform: translateY(-10px);">商品名称:</p>
            <p>品牌:</p>
          </div>
        </el-col>
        <el-col style="width:240px;margin-right:20px;"><div class="grid-content">
          <div>
            <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称"/>
          </div>
          <!-- 新增品牌下拉框 -->
          <div>
            <el-select v-model="listQuery.brandId" collapse-tags style="width: 200px;margin-bottom:10px;" placeholder="品牌">
              <el-option v-for="item in shopBrand" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </div>
        </div></el-col>
        <el-col style="width:300px"><div class="grid-content grid-content-button">
          <el-button class="filter-item filter-button" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
          <el-button class="filter-item filter-button" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
          <el-button :loading="downloadLoading" class="filter-item filter-button" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
        </div></el-col>
      </el-row>
    <div>
    </div>
    <div>
  </div>
</div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="宣传画廊">
              <img v-for="pic in props.row.gallery" :key="pic" :src="pic" class="gallery">
            </el-form-item>
            <el-form-item label="商品介绍">
              <span>{{ props.row.brief }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="关键字">
              <span>{{ props.row.keywords }}</span>
            </el-form-item>
            <el-form-item label="类目ID">
              <span>{{ props.row.categoryId }}</span>
            </el-form-item>
            <el-form-item label="品牌商ID">
              <span>{{ props.row.brandId }}</span>
            </el-form-item>
            <el-form-item label="集采起订量">
              <span>{{ props.row.moq }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品编号" prop="goodsSn"/>

      <el-table-column align="center" min-width="100" label="名称" prop="name"/>

    <!--取消字段 <el-table-column align="center" min-width="100" label="仅对该公司可见" prop="company"/> -->

      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="40">
        </template>
      </el-table-column>

      <!--取消字段 <el-table-column align="center" property="iconUrl" label="分享图">
        <template slot-scope="scope">
          <img :src="scope.row.shareUrl" width="40">
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="详情" prop="detail">
        <template slot-scope="scope">
          <div class="dialogBox">
            <el-dialog class="detailDialog" :visible.sync="detailDialogVisible" title="商品详情">
              <div class="outBox">
                <div class="inBox" v-html="goodsDetail"/>
              </div>
            </el-dialog>
          </div>
          <el-button type="primary" size="mini" @click="showDetail(scope.row.detail)">查看</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="专柜价格" prop="counterPrice"/>

      <!-- <el-table-column align="center" label="当前价格" prop="retailPrice"/> -->
 
      <el-table-column align="center" label="是否新品" prop="isNew">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isNew ? 'success' : 'error' ">{{ scope.row.isNew ? '新品' : '非新品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否热品" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{ scope.row.isHot ? '热品' : '非热品' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否在售" prop="isOnSale">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isOnSale ? 'success' : 'error' ">{{ scope.row.isOnSale ? '在售' : '未售' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="品牌" prop="brandName"></el-table-column>
      <el-table-column label="分类" prop="cagegoryName"></el-table-column>
      <el-table-column label="企业价" prop="collectPrice"></el-table-column>
      <el-table-column label="个人价" prop="memberPrice"></el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <h3 style="text-align:center;">确认要删除商品吗?</h3>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteShopList">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { listBrand } from '@/api/brand'
import { listCategory, listCatL1 } from '@/api/category'
import { listGoods, deleteGoods } from '@/api/goods'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
  components: { BackToTop, Pagination },
  data() {
    return {
      dialogVisible: false, // 确认删除弹窗
      shopBrand:[], // 商品品牌下拉框
      shopKind:[], //商品分类下拉框
      shopKindValue: '',
      shopKindChidren:[], // 商品分类下级
      handleDeleteList: {}, // 删除的商品
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        goodsSn: undefined,
        name: undefined,
        brandId: undefined,
        categoryId: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      goodsDetail: '',
      detailDialogVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getCategory1()
    this.getCategory2()
    this.getBranList()
    this.getList()
  },
  methods: {
    getBranList() {
      var config = {
        page: 1,
        limit: 999,
        sort: 'add_time',
        order: 'desc'
      }
      listBrand(config) 
        .then(response => {
          this.shopBrand = response.data.data.list
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCategory1() {
      listCatL1().then(response => {
        this.shopKind = response.data.data.list
      })
    },
    getCategory2() {
      this.shopKindChidren = []
      listCategory()
        .then(response => {
          if (response.data.data.list.length > 0) {
            response.data.data.list.forEach(e => {
              if (this.shopKindValue === '') {
                e.children.forEach(a => {
                  this.shopKindChidren.push({id: a.id, name: a.name})
                })
              } else {
                if (e.id === this.shopKindValue) {
                  e.children.forEach(a => {
                    this.shopKindChidren.push({id: a.id, name: a.name})
                  })
                }
              }
            })
          }
        })
    },
    shopKindChange (data) {
      this.getCategory2()
    },
    getList() {
      this.listLoading = true
      listGoods(this.listQuery).then(response => {
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
    handleCreate() {
      this.$router.push({ path: '/goods/create' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/goods/edit', query: { id: row.id }})
    },
    showDetail(detail) {
      this.goodsDetail = detail
      this.detailDialogVisible = true
    },
     handleClose(done) { // 关闭前的回调
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteShopList(){  // 弹窗 确认删除
    // 参数不对
    delete this.handleDeleteList.addTime
    delete this.handleDeleteList.updateTime

      deleteGoods(this.handleDeleteList).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(this.handleDeleteList)
        this.list.splice(index, 1)
        this.dialogVisible = false;
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
        this.dialogVisible = false;
      })
    },
    handleDelete(row) { // 删除按钮
      this.dialogVisible = true;
      this.handleDeleteList = row;
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品ID', '商品编号', '名称', '专柜价格', '当前价格', '是否新品', '是否热品', '是否在售', '首页主图', '宣传图片列表', '商品介绍', '详细介绍', '商品图片', '商品单位', '关键字', '类目ID', '品牌商ID']
        const filterVal = ['id', 'goodsSn', 'name', 'counterPrice', 'retailPrice', 'isNew', 'isHot', 'isOnSale', 'listPicUrl', 'gallery', 'brief', 'detail', 'picUrl', 'goodsUnit', 'keywords', 'categoryId', 'brandId']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .gallery {
    width: 80px;
    margin-right: 10px;
  }
  .grid-content-title{
    text-align: right;
    margin-right:2em;
  }
  .grid-content{
    p{
      line-height:20px;
      white-space: nowrap;
      font-size:14px;
      color:#909399;
      font-weight:bold;
    }
  }
  .grid-content-button{
    height: 86px; display: table-cell;vertical-align: middle;text-align: center;white-space:nowrap;
  }
  .detailDialog /deep/ .el-dialog {
    // width: 100%;
    overflow: hidden;
  }
 .dialogBox /deep/ .el-dialog__wrapper {
    overflow: hidden !important;
  }
  .el-row-box{
    display:flex;
    flex-wrap: nowrap;
  }
  .detailDialog /deep/ img {
    width: 100%;
  }
  .detailDialog /deep/ .el-dialog__body{
    width: 102%;
    padding-top: 0 !important;
    overflow-y: auto !important;
    height: 740px;
    // overflow: -moz-scrollbars-none;
  }
 
</style>
