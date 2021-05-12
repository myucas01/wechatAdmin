<template>
  <el-dialog width="30%" title="修改密码" :visible.sync="editPasswordShow.show">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="会员登录名">
        <el-input autocomplete="off" placeholder="请输入" v-model="editPasswordShow.info.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="原始密码" prop="password">
        <el-input autocomplete="off" type="password" placeholder="请输入原始密码" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input autocomplete="off" type="password" placeholder="请输入新密码" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="密码确认" prop="newPassword2">
        <el-input autocomplete="off" type="password" placeholder="请再次输入新密码" v-model="ruleForm.newPassword2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editPasswordShow.show = false">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      editPasswordShow: Object
    },
    data() {
      var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
      return {
        ruleForm: {
          password: '',
          newPassword: '',
          id: '',
          newPassword2: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入原始密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          newPassword2: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submit(formName) {
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            console.log(this.ruleForm)

          } else {
            console.log('error submit!!');
          }
        })
      }
    },
  }
</script>

<style>
</style>
