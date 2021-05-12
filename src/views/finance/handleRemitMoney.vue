<template>
  <div class="app-container">
    <div class="appBox">
      <el-scrollbar style="height: 100%;">
        <h3>用户打款信息</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="订单号">
            {{ form.orderId }}
          </el-form-item>
          <el-form-item label="订单金额">
            {{ form.orderAmount }} 元
          </el-form-item>
          <el-form-item label="汇款户名">
            {{ form.remitterName }}
          </el-form-item>
          <el-form-item label="汇款银行账号">
            {{ form.cardNo }}
          </el-form-item>
          <el-form-item label="汇款开户银行">
            {{ form.bankName }}
          </el-form-item>
          <el-form-item label="汇款金额">
            {{ form.amount }} 元
          </el-form-item>
          <el-form-item label="汇款凭证">
            <img :src="form.voucher" width="200px" @click="handlePictureCardPreview">
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img :src="form.voucher">
            </el-dialog>
          </el-form-item>
          <el-form-item label="审核结果">
            <el-radio v-model="form.status" label="1" @change="changeStatus">通过</el-radio>
            <el-radio v-model="form.status" label="2" @change="changeStatus">驳回</el-radio>
          </el-form-item>
          <el-form-item v-if="bankAccountType" label="银行流水号" prop="bankAccount">
            <el-input v-model="form.bankAccount" placeholder="请填写银行汇款流水号" style="width: 400px;"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" style="width: 400px;"/>
          </el-form-item>
          <el-form-item label="备注截图">
            <el-upload
              :action="uploadPath"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headers"
              class="avatar-uploader"
              accept=".jpg,.jpeg,.png,.gif"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2" size="tiny">
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <div style="position: absolute;bottom: 0;width: 100%;height: 60px;line-height: 60px;">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" size="mini" @click="handel">确定</el-button>
    </div>
  </div>
</template>
<script>
import { detail, handle } from '@/api/finance'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
export default {
  name: 'HandleRemitMoney',
  data() {
    return {
      uploadPath,
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible2: false,
      bankAccountType: true,
      url: [],
      urlStr: '',
      form: {
        id: this.$route.query.id,
        orderId: '',
        orderAmount: '',
        remitterName: '',
        cardNo: '',
        companyNo: '',
        bankName: '',
        amount: '',
        bankAccount: '',
        remark: '',
        status: '1',
        voucher: ''
      },
      rules: {
        bankAccount: [
          { required: true, message: '请输入银行流水账号', trigger: 'blur' }
        ]
      }
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
    this.showDetail()
  },
  methods: {
    showDetail() {
      detail({ payId: this.form.id }).then(response => {
        this.form = response.data.data
        this.form.status = String(response.data.data.status)
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    changeStatus() {
      if (this.form.status === '1') {
        this.bankAccountType = true
      } else if (this.form.status === '2') {
        this.bankAccountType = false
      }
    },
    handel() {
      this.$refs.form.validate((valid) => {
        console.log(this.form)
        if (valid) {
          if (this.form.status === '1') {
            const h = this.$createElement
            this.$msgbox({
              title: '确认审核',
              message: h('p', null, [
                h('p', null, '请再次确认本次审核内容! '),
                h('p', { style: 'font-weight: bolder' }, '银行流水号:'),
                h('p', { style: 'font-weight: bolder' }, this.form.bankAccount)
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(action => {
              this.form.bankSerialNumber = this.form.bankAccount
              this.form.status = this.form.status
              this.form.remark = this.form.remark
              this.form.remarkScreenshot = this.url.join(';')
              handle(this.form).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.$notify.success({
                    title: '成功',
                    message: '审核成功'
                  })
                  this.$router.push('list')
                }
              }).catch(error => {
                this.$notify.error({
                  title: '失败',
                  message: error.message
                })
              })
            })
          } else if (this.form.status === '2') {
            this.form.remarkScreenshot = this.url.join(';')
            handle(this.form).then(response => {
              if (response.status === 200) {
                this.$notify.success({
                  title: '成功',
                  message: '驳回成功'
                })
                this.$router.push('list')
              }
            }).catch(error => {
              this.$notify.error({
                title: '失败',
                message: error.message
              })
            })
          }
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handlePictureCardPreview2(file) {
      this.dialogVisible2 = true
      this.dialogImageUrl = file.url
    },
    handleSuccess(response, file, fileList) {
      this.url.push(response.data.url)
    }
  }
}
</script>
<style scoped>
  .appBox{position: absolute;height: calc(100% - 90px);width: calc(100% - 40px);box-shadow: 2px 2px 5px #E9EAEC;border: 1px solid #E9EAEC;padding: 10px 0 10px 10px;}
  .el-scrollbar>>>.el-scrollbar__wrap{overflow-x: hidden;}
</style>
