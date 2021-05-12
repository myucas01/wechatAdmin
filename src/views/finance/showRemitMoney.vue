<template>
  <div class="app-container">
    <div class="appBox">
      <el-scrollbar style="height: 100%;">
        <h3>用户打款信息</h3>
        <el-form ref="form" :model="form" label-width="160px">
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
            {{ form.statuName }}
          </el-form-item>
          <el-form-item v-if="bankAccountType" label="银行流水号" prop="bankSerialNumber">
            {{ form.bankSerialNumber }}
          </el-form-item>
          <el-form-item label="备注">
            {{ form.remark }}
          </el-form-item>
          <el-form-item label="备注截图">
            <span v-for="(item, index) in form.remarkScreenshot" :key="index">
              <img :src="item" width="200px" @click="handlePictureCardPreview2(item)">
              <el-dialog :visible.sync="dialogVisible2" size="tiny">
                <img :src="src">
              </el-dialog>
            </span>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <div style="position: absolute;bottom: 0;width: 100%;height: 60px;line-height: 60px;">
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import { detail } from '@/api/finance'
export default {
  name: 'ShowRemitMoney',
  data() {
    return {
      bankAccountType: true,
      dialogVisible: false,
      dialogVisible2: false,
      src: '',
      form: {
        id: this.$route.query.id,
        orderId: '',
        orderAmount: '',
        remitterName: '',
        cardNo: '',
        bankName: '',
        amount: '',
        bankSerialNumber: '',
        remark: '',
        status: '1',
        voucher: '',
        remarkScreenshot: [],
        statuName: ''
      }
    }
  },
  created() {
    this.showDetail()
  },
  methods: {
    showDetail() {
      detail({ payId: this.form.id }).then(response => {
        if (response.status === 200) {
          console.log(response)
          this.form.id = response.data.data.id
          this.form.bankName = response.data.data.bankName
          this.form.bankSerialNumber = response.data.data.bankSerialNumber
          this.form.orderId = response.data.data.orderId
          this.form.orderAmount = response.data.data.orderAmount
          this.form.amount = response.data.data.amount
          this.form.voucher = response.data.data.voucher
          this.form.remitterName = response.data.data.remitterName
          this.form.cardNo = response.data.data.cardNo
          this.form.remark = response.data.data.remark
          this.form.remarkScreenshot = response.data.data.remarkScreenshot.split(';')
          this.form.status = response.data.data.status
          if (this.form.status === 1) {
            this.form.statuName = '通过'
            this.bankAccountType = true
          } else if (this.form.status === 2) {
            this.form.statuName = '驳回'
            this.bankAccountType = false
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handlePictureCardPreview2(item) {
      this.dialogVisible2 = true
      this.src = item
    }
  }
}
</script>
<style scoped>
  .appBox{position: absolute;height: calc(100% - 90px);width: calc(100% - 40px);box-shadow: 2px 2px 5px #E9EAEC;border: 1px solid #E9EAEC;padding: 10px 0 10px 10px;}
  .el-scrollbar>>>.el-scrollbar__wrap{overflow-x: hidden;}
</style>
