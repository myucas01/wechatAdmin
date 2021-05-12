<template>
  <el-dialog
  title="批量导入"
  :visible.sync="dialogShow.show"
  width="40%">
  <div>
    <a :href="href"
       style="display: inline-block;  width: 200px;height: 30px;">
      <el-button style="width:200px;float:right;"
                 type="danger"
                 size="mini">下载企业账号批量导入模板</el-button>
    </a>
    <p>请选择文件</p>
    <el-upload class="upload-demo"
               :action="uploadFile"
               :show-file-list="false"
               :headers="headers"
               :on-success="uploadPicUrl"
               accept=".xls,.xlsx">
      <el-button slot="trigger"
                 size="small"
                 type="primary">选取文件并导入</el-button>
      <a target="blank"
         style="margin-left:10px ;">
        支持 xls、xlsx 的Excel文件
      </a>
    </el-upload>

  </div>
  <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogShow.show = false">取 消</el-button>
    <el-button type="primary" @click="dialogShow.show = false">确 定</el-button>
  </span> -->
</el-dialog>
</template>

<script>
  // import { uploadFile } from '@/api/storage'
  import { getToken } from '@/utils/auth'
  export default{
    props:[
      "dialogShow",
      "href",
      "uploadFile1"
    ],
    computed: {
      headers() {
        return {
          'X-Litemall-Admin-Token': getToken()
        }
      }
    },
    data(){
      return{
        uploadFile: this.uploadFile1,
        fileList:[],
      }
    },
    methods:{
      uploadPicUrl(res){
        if(res.errno==0){
          this.$message.success('导入成功')
          this.dialogShow.show=false
          this.$emit('uploadFile')
        }else{
          this.$message.error('导入失败')
        }
      }
    }
  }
</script>

<style>
</style>
