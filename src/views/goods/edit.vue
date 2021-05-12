<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="商品编号" prop="goodsSn">
          <el-input v-model="goods.goodsSn"/>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name"/>
          <p style="margin: 0;line-height: 24px;font-size: 12px;color: #777;">建议保持在32个字节以下</p>
        </el-form-item>
        <el-form-item label="专柜价格" prop="counterPrice">
          <el-input v-model="goods.counterPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
<!-- 新增 -->
<!--        <el-form-item label="专柜价格" prop="counterPrice">-->
<!--          <el-input v-model="goods.counterPrice" placeholder="0.00">-->
<!--            <template slot="append">元</template>-->
<!--          </el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="购买方式" prop="goodsSn"> 
          <div class="buyWay">
            <!-- <div> -->
<!--              <el-radio v-model="radioWay" label="1">企业采集</el-radio>-->
<!--              <el-checkbox v-model="radioWay1">企业采集</el-checkbox><span style="color: red;">{{goods.caijiaError}}</span>-->
              <!-- <span>企业采集</span><span style="color: red;">{{goods.caijiaError}}</span> -->
            <!-- </div> -->
              <div>
                <el-checkbox v-model="radioWay1">企业采集</el-checkbox>
                <span style="color: red;">{{goods.caijiaError}}</span>
            </div>
            <el-row>
              <el-col :span="8"><div class="grid-content">
                <el-form-item label="集采价"><el-input :disabled="!radioWay1" v-model="goods.collectPrice" placeholder="请设置企业集采价格" @input="judgePrice(goods)"></el-input> </el-form-item>
              </div></el-col>
              <el-col :span="8"><div class="grid-content">
                <el-form-item label="集采起订单量"> <el-input :disabled="!radioWay1" type="number" autocomplete="off" v-model="goods.moq" placeholder="请设置企业集采起订量"></el-input> </el-form-item>
              </div></el-col>
            </el-row>
          </div>
          <div class="buyWay">
             <!-- <div>
             <span>会员购买</span><span style="color: red;">{{goods.buyError}}</span>
            </div> -->
<!--              <el-radio v-model="radioWay" label="2">会员购买</el-radio>-->
<!--               <el-checkbox v-model="radioWay2">会员购买</el-checkbox><span style="color: red;">{{goods.buyError}}</span>-->
              <div>
                <el-checkbox  v-model="radioWay2">会员购买</el-checkbox>  
              <span style="color: red;">{{goods.buyError}}</span>
            </div>
            <el-row>
              <el-col :span="8"><div class="grid-content">
                <el-form-item label="会员价"> <el-input type="number" :disabled="!radioWay2" v-model="goods.memberPrice" placeholder="请设置会员购买价格" @input="judgePurchase(goods)"></el-input> </el-form-item>
              </div></el-col>
              <el-col :span="8"><div class="grid-content">
                <el-form-item label="会员起定量"> <el-input type="number" :disabled="!radioWay2" v-model="goods.memberMoq" placeholder="请设置会员购买起订量" @input="judgePurchase(goods)"></el-input> </el-form-item>
              </div></el-col>
              <el-col :span="8"><div class="grid-content grid-content-orderSize">
                <el-form-item label="会员限购数"> <el-input type="number" :disabled="!radioWay2" v-model="goods.memberMaxQuantity" placeholder="请设置会员限购数" @input="judgePurchase(goods)"></el-input> </el-form-item>
              </div></el-col>
            </el-row>
          </div>
        </el-form-item>

         <el-form-item label="物流配送" prop="goodsSn">
           <el-radio v-for="item in distributions" :key="item.value" :label="item.value" v-model="goods.distributionMode">{{item.label}}</el-radio>
         </el-form-item>

        <!-- <el-form-item label="当前价格" prop="retailPrice">
          <el-input v-model="goods.retailPrice" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="加入扶贫商品专区" prop="povertyAlleviation">
          <el-radio v-model="goods.povertyAlleviation" :label="1">是</el-radio>
          <el-radio v-model="goods.povertyAlleviation" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="购买方式" prop="ispurchaseWay">
          <el-checkbox-group v-model="goods.ispurchaseWay">
          <el-checkbox label="1">企业集采</el-checkbox>
          <el-checkbox label="2" disabled>会员购买</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="集采起订量" prop="moq">
          <el-input v-model="goods.moq" placeholder="0">
          </el-input>
        </el-form-item> -->

        <el-form-item label="是否新品" prop="isNew">
          <el-radio-group v-model="goods.isNew">
            <el-radio :label="true">新品</el-radio>
            <el-radio :label="false">非新品</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否热卖" prop="isHot">
          <el-radio-group v-model="goods.isHot">
            <el-radio :label="false">普通</el-radio>
            <el-radio :label="true">热卖</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否在售" prop="isOnSale">
          <el-radio-group v-model="goods.isOnSale">
            <el-radio :label="true">在售</el-radio>
            <el-radio :label="false">未售</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadPicUrl"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif">
            <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
          <div>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片尺寸：建议550px * 550px（必须为正方形）</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片格式：只能上传jpg/png文件</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片大小：建议200KB以下，最好不超过800KB</p>
          </div>
        </el-form-item>

        <el-form-item label="宣传画廊">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :limit="5"
            :file-list="galleryFileList"
            :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card">
            <i class="el-icon-plus"/>
          </el-upload>
          <div>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片尺寸：建议550px * 550px（必须为正方形）</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片格式：只能上传jpg/png文件</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片大小：建议200KB以下，最好不超过800KB</p>
          </div>
        </el-form-item>

        <el-form-item label="商品单位">
          <el-input v-model="goods.unit" placeholder="件 / 个 / 盒"/>
        </el-form-item>

        <el-form-item label="关键字">
          <el-tag v-for="tag in keywords" :key="tag" closable type="primary" @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input v-if="newKeywordVisible" ref="newKeywordInput" v-model="newKeyword" class="input-new-keyword" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"/>
          <el-button v-else class="button-new-keyword" type="primary" @click="showInput">+ 增加</el-button>
        </el-form-item>

        <el-form-item label="所属分类">
          <el-cascader :options="categoryList" v-model="categoryIds" expand-trigger="hover" @change="handleCategoryChange"/>
        </el-form-item>

        <el-form-item label="所属品牌商">
          <el-select v-model="goods.brandId">
            <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item label="商品简介">
          <el-input v-model="goods.brief"/>
          <p style="margin: 0;line-height: 24px;font-size: 12px;color: #777;">建议保持在34个字节以下</p>
        </el-form-item>

        <el-form-item label="商品详细介绍">
          <editor :init="editorInit" v-model="goods.detail"/>
          <div style="margin-top: 20px;">
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片尺寸：建议750px * Npx</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片格式：只能上传jpg/png文件</p>
            <p style="margin: 0;line-height: 22px;color: #777;font-size: 12px;">图片大小：建议500KB以下，最好不超过1024KB</p>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>商品规格</h3>
      <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>

      <el-table :data="specifications">
        <el-table-column property="specification" label="规格名" />
        <el-table-column property="value" label="规格值" >
          <template slot-scope="scope">
            <el-tag type="primary">
              {{ scope.row.value }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="picUrl" label="规格图片">
          <template slot-scope="scope">
            <img v-if="scope.row.picUrl" :src="scope.row.picUrl" width="40">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="specVisiable" title="设置规格">
        <el-form ref="specForm" :rules="rules" :model="specForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="规格名" prop="specification">
            <el-input v-model="specForm.specification"/>
          </el-form-item>
          <el-form-item label="规格值" prop="value">
            <el-input v-model="specForm.value"/>
          </el-form-item>
          <el-form-item label="规格图片" prop="picUrl">
            <el-upload
              :headers="headers"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="uploadSpecPicUrl"
              class="avatar-uploader"
              accept=".jpg,.jpeg,.png,.gif">
              <img v-if="specForm.picUrl" :src="specForm.picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <h3>商品库存</h3>
      <el-table :data="products">
        <el-table-column property="value" label="货品规格" >
          <template slot-scope="scope">
            <el-tag v-for="tag in scope.row.specifications" :key="tag">
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column property="price" width="100" label="货品售价"/>
        <el-table-column property="memberPrice" width="100" label="会员售价"/>
        <el-table-column property="number" width="100" label="货品数量"/>
        <el-table-column property="url" width="100" label="货品图片">
          <template slot-scope="scope">
            <img v-if="scope.row.url" :src="scope.row.url" width="40">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleProductShow(scope.row)">设置</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="productVisiable" title="设置货品">
        <el-form ref="productForm" :model="productForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="货品规格列" prop="specifications">
            <el-tag v-for="tag in productForm.specifications" :key="tag">
              {{ tag }}
            </el-tag>
          </el-form-item>
          <el-form-item label="货品售价" prop="price">
            <!-- <el-input v-model="productForm.price"/> -->
            <el-input disabled="true" v-model="goods.collectPrice"/>
          </el-form-item>

          <el-form-item label="会员售价" prop="price">
            <!-- <el-input v-model="productForm.price"/> -->
            <el-input disabled="true"  v-model="goods.memberPrice"/>
          </el-form-item>

          <el-form-item label="货品数量" prop="number">
            <el-input v-model="productForm.number"/>
          </el-form-item>
          <el-form-item label="货品图片" prop="url">
            <el-upload
              :headers="headers"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="uploadProductUrl"
              class="avatar-uploader"
              accept=".jpg,.jpeg,.png,.gif">
              <img v-if="productForm.url" :src="productForm.url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="productVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleProductEdit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <h3>商品参数</h3>
      <el-button :plain="true" type="primary" @click="handleAttributeShow">添加</el-button>
      <el-table :data="attributes">
        <el-table-column property="attribute" label="商品参数名称"/>
        <el-table-column property="value" label="商品参数值"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleAttributeDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="attributeVisiable" title="设置商品参数">
        <el-form ref="attributeForm" :model="attributeForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="商品参数名称" prop="attribute">
            <el-input v-model="attributeForm.attribute"/>
          </el-form-item>
          <el-form-item label="商品参数值" prop="value">
            <el-input v-model="attributeForm.value"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attributeVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleAttributeAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleEdit">更新商品</el-button>
    </div>

  </div>
</template>
<script>
import { detailGoods, editGoods, listCatAndBrand } from '@/api/goods'
import { createStorage, uploadPath } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

const distributions = [{value: 1, label: '厂家直送'}, {value: 2, label: '物流配送'}]

export default {
  name: 'GoodsEdit',
  components: { Editor },
  data() {
    return {
      radioWay2:false,radioWay1:false,
      distributions,
      uploadPath,
      newKeywordVisible: false,
      newKeyword: '',
      keywords: [],
      galleryFileList: [],
      categoryList: [],
      brandList: [],
      categoryIds: [],
      goods: { gallery: [],ispurchaseWay:[] },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: {
        id: 0,
        specifications: [],
        price: 0.0,
        number: 0,
        url: ''
      },
      products: [
        { id: 0, specifications: ['标准'], price: 0.0,memberPrice: 0.0, number: 0, url: '' }
      ],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
      rules: {
        goodsSn: [
          { required: true, message: '商品编号不能为空', trigger: 'blur' }
        ],
        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
        povertyAlleviation: [{ required: true, message: '请选择是否为扶贫商品', trigger: 'blur' }],
        ispurchaseWay: [{ required: true, message: '请选择购买方式', trigger: 'blur' }],
        moq: [{ required: true, message: '集采起订量不能为空', trigger: 'blur' }]
      },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: [
          'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
        ],
        toolbar: [
          'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
          'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
        ],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData)
            .then(res => {
              success(res.data.data.url)
            })
            .catch(() => {
              failure('上传失败，请重新上传')
            })
        }
      },
      radioWay: '', // 1==企业采集  2==会员购买
      radioWay1: false,
      radioWay2: false,
      distribution_mode: '1', // 1==厂家直送  2==物流配送
    }
  },
  watch:{
    goods(newData,oldData){
      this.products[0].price = newData.collectPrice
      this.products[0].memberPrice = newData.memberPrice
     
    },
    radioWay1(newData,oldData){
      if(!newData){
        delete this.goods.collectPrice
        delete this.goods.moq
        if(this.radioWay2){
          this.goods.purchaseWay = 2
          delete this.products[0].price
        }
      }else{
        if(this.radioWay2){ this.goods.purchaseWay = 3 }
      }
      console.log( this.goods.purchaseWay )
    },
    radioWay2(newData,oldData){
      if(!newData){
        delete this.goods.memberPrice
        delete this.goods.memberMoq
        delete this.goods.memberMaxQuantity
        if(this.radioWay1){
          this.goods.purchaseWay = 1
          delete this.products[0].memberPrice
        }
      }else{
        if(this.radioWay1){ this.goods.purchaseWay = 3 }
      }
      console.log( this.goods.purchaseWay )
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
    // this.products[0].price = this.goods.collectPrice
    //   this.products[0].memberPrice = this.goods.memberPrice
  },
  // goods.collectPrice    goods.memberPrice
  filter: {
    numFilter (value) {
      let realVal = ''
      if (value) {
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    }
  },
  methods: {
    judgePrice: function (goods) {
      if (goods.collectPrice > goods.counterPrice) {
        goods.caijiaError = '*采集价格不得高于专柜价格'
      } else {
        goods.caijiaError = ''
      }
    },
    judgePurchase: function (goods) {
      if (goods.memberPrice > goods.counterPrice) {
        goods.buyError = '*会员价格不得高于专柜价格'
      } else {
        goods.buyError = ''
        if (goods.memberMoq !== undefined &&  goods.memberMaxQuantity !== undefined) {
          if (goods.memberMaxQuantity < goods.memberMoq) {
            goods.buyError = '*限购数量不能比起订量低'
          } else {
            goods.buyError = ''
          }
        }
      }
    },
    init: function() {
      if (this.$route.query.id == null) {
        return
      }

      const goodsId = this.$route.query.id
      detailGoods(goodsId).then(response => {
        this.goods = response.data.data.goods
        console.log(this.goods)
         if(this.goods.collectPrice){
            this.radioWay1 = true
          }
          if( this.goods.memberPrice){
            this.radioWay2 = true
          }

        this.specifications = response.data.data.specifications
        this.products = response.data.data.products
        this.attributes = response.data.data.attributes
        this.categoryIds = response.data.data.categoryIds
        // if(this.goods.purchaseWay==3){
        //   this.$set(this.goods,'ispurchaseWay',['1','2'])
        // }else if(this.goods.purchaseWay==1||this.goods.purchaseWay==2){
        //   let str=this.goods.purchaseWay.toString()
        //   this.$set(this.goods,'ispurchaseWay',[str])
        // }else{
        //   this.$set(this.goods,'ispurchaseWay',[])
        // }

        this.galleryFileList = []
        for (var i = 0; i < this.goods.gallery.length; i++) {
          this.galleryFileList.push({
            url: this.goods.gallery[i]
          })
        }
        const keywords = response.data.data.goods.keywords
        if (keywords !== null) {
          this.keywords = keywords.split(',')
        }
      })

      listCatAndBrand().then(response => {
        this.categoryList = response.data.data.categoryList
        this.brandList = response.data.data.brandList
      })
    },
    handleCategoryChange(value) {
      this.goods.categoryId = value[value.length - 1]
    },
    handleCancel: function() {
      this.$router.push({ path: '/goods/list' })
    },
    handleEdit: function() {
      // let str=this.goods.ispurchaseWay.join(',')
      // if(str.indexOf('1')>-1&&str.indexOf('2')>-1){
      //   this.goods.purchaseWay=3
      // }else{
      //   this.goods.purchaseWay=parseInt(str)
      // }
      // console.log(str)
      console.log("updata",this.goods.purchaseWay)
      const finalGoods = {
        goods: this.goods,
        specifications: this.specifications,
        products: this.products,
        attributes: this.attributes
      }
      editGoods(finalGoods)
        .then(response => {
          this.$notify.success({ 
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/goods/list' })
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1)
      this.goods.keywords = this.keywords.toString()
    },
    showInput() {
      this.newKeywordVisible = true
      this.$nextTick(_ => {
        this.$refs.newKeywordInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const newKeyword = this.newKeyword
      if (newKeyword) {
        this.keywords.push(newKeyword)
        this.goods.keywords = this.keywords.toString()
      }
      this.newKeywordVisible = false
      this.newKeyword = ''
    },
    uploadPicUrl: function(response) {
      this.goods.picUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl(response, file, fileList) {
      if (response.errno === 0) {
        this.goods.gallery.push(response.data.url)
      }
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    specChanged: function(label) {
      if (label === false) {
        this.specifications = [
          { specification: '规格', value: '标准', picUrl: '' }
        ]
        this.products = [
          { id: 0, specifications: ['标准'], price: 0.0, number: 0, url: '' }
        ]
      } else {
        this.specifications = []
        this.products = []
      }
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.url
    },
    handleSpecificationShow() {
      this.specForm = { specification: '', value: '', picUrl: '' }
      this.specVisiable = true
    },
    handleSpecificationAdd() {
      var index = this.specifications.length - 1
      for (var i = 0; i < this.specifications.length; i++) {
        const v = this.specifications[i]
        if (v.specification === this.specForm.specification) {
          index = i
        }
      }

      this.specifications.splice(index + 1, 0, this.specForm)
      this.specVisiable = false

      this.specToProduct()
    },
    handleSpecificationDelete(row) {
      const index = this.specifications.indexOf(row)
      this.specifications.splice(index, 1)
      this.specToProduct()
    },
    specToProduct() {
      if (this.specifications.length === 0) {
        return
      }
      // 根据specifications创建临时规格列表
      var specValues = []
      var spec = this.specifications[0].specification
      var values = []
      values.push(0)

      for (var i = 1; i < this.specifications.length; i++) {
        const aspec = this.specifications[i].specification

        if (aspec === spec) {
          values.push(i)
        } else {
          specValues.push(values)
          spec = aspec
          values = []
          values.push(i)
        }
      }
      specValues.push(values)

      // 根据临时规格列表生产货品规格
      // 算法基于 https://blog.csdn.net/tyhj_sf/article/details/53893125
      var productsIndex = 0
      var products = []
      var combination = []
      var n = specValues.length
      for (var s = 0; s < n; s++) {
        combination[s] = 0
      }
      var index = 0
      var isContinue = false
      do {
        var specifications = []
        for (var x = 0; x < n; x++) {
          var z = specValues[x][combination[x]]
          specifications.push(this.specifications[z].value)
        }
        products[productsIndex] = {
          id: productsIndex,
          specifications: specifications,
          price: 0.0,
          number: 0,
          url: ''
        }
        productsIndex++

        index++
        combination[n - 1] = index
        for (var j = n - 1; j >= 0; j--) {
          if (combination[j] >= specValues[j].length) {
            combination[j] = 0
            index = 0
            if (j - 1 >= 0) {
              combination[j - 1] = combination[j - 1] + 1
            }
          }
        }
        isContinue = false
        for (var p = 0; p < n; p++) {
          if (combination[p] !== 0) {
            isContinue = true
          }
        }
      } while (isContinue)

      this.products = products
    },
    handleProductShow(row) {
      this.productForm = Object.assign({}, row)
      this.productVisiable = true
    },
    uploadProductUrl: function(response) {
      this.productForm.url = response.data.url
    },
    handleProductEdit() {
      for (var i = 0; i < this.products.length; i++) {
        const v = this.products[i]
        if (v.id === this.productForm.id) {
          this.products.splice(i, 1, this.productForm)
          break
        }
      }
      this.productVisiable = false
    },
    handleAttributeShow() {
      this.attributeForm = {}
      this.attributeVisiable = true
    },
    handleAttributeAdd() {
      this.attributes.unshift(this.attributeForm)
      this.attributeVisiable = false
    },
    handleAttributeDelete(row) {
      const index = this.attributes.indexOf(row)
      this.attributes.splice(index, 1)
    }
  }
}
</script>

<style>
.el-card {
  margin-bottom: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
.grid-content-orderSize{
    position: relative;;
  }
  .orderSize{
    position: absolute;
    top: 15px;
    right: 0;
    color:#f00;
  }
  .buyWay .el-form-item__label{
    font-size:12px;
    font-weight:500 !important;
    width:110px !important;
  }

  .buyWay .el-form-item__content{
    margin-left:110px !important;
    padding:0 5px!important;
  }
 .buyWay .el-input__inner{
    padding:0 5px!important;
 }
</style>
