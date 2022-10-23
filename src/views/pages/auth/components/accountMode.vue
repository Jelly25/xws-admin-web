<template>
	<div class="account-login-module">
		<div class="module-title">欢迎使用{{app.name}}</div>
		<a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="账号登录" class="account-module">
        <a-form-model hideRequiredMark :model="accountForm" :rules="accountFormRules" ref="accountForm">
					<a-form-model-item label="手机号" prop="account">
						<a-input placeholder="请输入手机号" v-model="accountForm.account"/>
					</a-form-model-item>
					<a-form-model-item label="密码" prop="password">
						<a-input-password placeholder="请输入密码" v-model="accountForm.password" />
					</a-form-model-item>
					<a-form-model-item label="验证码" prop="captcha" class="verify-container">
						<a-input placeholder="请输入验证码" v-model="accountForm.captcha" />
						<captcha @receiveUUID = "handleReceiveUUID"></captcha>
					</a-form-model-item>
				</a-form-model>
				<a-button :loading="loginLoading" type="primary" size="large" block @click="handleLogin" :disabled="formIsValid">登录</a-button>
      </a-tab-pane>
      <a-tab-pane key="2" tab="验证码登录" force-render class="authcode-module">
				<a-input placeholder="请输入你的手机号" v-model="phoneNumber" />
        <a-button type="primary" size="large" block @click="handleGetAuthCode" :disabled="phoneNumberIsValid">下一步</a-button>
      </a-tab-pane>
		</a-tabs>
		<div class="terms-and-policy-container">
			<a-checkbox :checked="agreeTerms" @change="handleAgreeTerms">
				<span>我已阅读并同意</span>
				<a-button type="link" @click="$router.push('/terms')">服务协议</a-button>
				<span>和</span>
				<a-button type="link" @click="$router.push('/privacy')">隐私政策</a-button>
			</a-checkbox>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { Modal } from 'ant-design-vue';
import Captcha from "./captcha.vue";
export default {
	name:"AccountMode",
	components:{Captcha},
	data() {
		return {
			agreeTerms:false,
			accountForm:{
				account:"",
				password:"",
				captcha:"",
				uuid:""
			},
			phoneNumber:"",
			loginLoading:false
		}
	},
	computed: {
		...mapGetters(["app"]),
		accountFormRules(){
			return {
				account:[
					{ required: true, whitespace:true, message: '手机号不能为空', trigger: ['blur','change'] },
					{ pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '手机号格式不正确', trigger: ['blur','change'] },
				],
				password:[
					{ required: true, whitespace:true, message: '密码不能为空', trigger: ['blur','change'] },
					{ min: 6, max: 16, message: '密码由6-16位字符组成', trigger: ['blur','change'] },
				],
				captcha:[
					{ required: true, whitespace:true, message: '验证码不能为空', trigger: ['blur','change'] }
				]
			}
		},
		formIsValid(){
			return Object.values(this.accountForm).indexOf("") !==-1
		},
		phoneNumberIsValid(){
			return !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(this.phoneNumber)
		}
	},
	methods: {
		...mapActions(["userLogin","userInfo","permMenus"]),
		// 同意协议
		handleAgreeTerms(e){
			this.agreeTerms = e.target.checked
		},
		handleReceiveUUID(uuid){
			this.accountForm.uuid = uuid
		},
		// 点击登录
		handleLogin(){
			if(!this.agreeTerms){
				return Modal.confirm({
					title: '提示',
					content: "请先阅读同意并勾选服务协议和隐私政策",
					centered:true,
					icon:"info-circle",
					okText:"同意",
					cancelText:"取消",
					onOk:()=> {
						this.agreeTerms = true
						this.handleLogin()
					}
				});
			}
			this.$refs.accountForm.validate(async (valid) => {
				if (!valid) return
				this.loginLoading = true
				try {
					await this.userLogin({data:this.accountForm,options:{needToast:false}})
					await this.userInfo({options:{needToast:false}})
					await this.permMenus({options:{needToast:false}})
					this.$message.success("登录成功")
					this.$router.push("/")
					this.loginLoading = false
				} catch (error) {
					this.$message.error(error)
					this.loginLoading = false
				}
			});
		},
		// 点击下一步获取验证码
		handleGetAuthCode(){
			if(!this.agreeTerms){
				return Modal.confirm({
					title: '提示',
					content: "请先阅读同意并勾选服务协议和隐私政策",
					centered:true,
					icon:"info-circle",
					okText:"同意",
					cancelText:"取消",
					onOk:()=> {
						this.agreeTerms = true
						this.handleGetAuthCode()
					}
				});
			}
			// 验证码接口 发送成功emit==>verifyAuthCode
			this.$emit("verifyAuthCode",this.phoneNumber)
		}
	},
}
</script>

<style lang="less" scoped>
.account-login-module{
	height: 100%;

	.module-title{
		margin-bottom: 12px;
		font-size: 22px;
		color: #1f2329;
		font-weight: 600;
		line-height: 30px;
		white-space: pre-wrap;
	}

	/deep/ .ant-tabs-bar{
		border-bottom: none;
	}

	/deep/ .ant-tabs-tab{
		padding: 5px 2px;
	}

	.account-module{

		/deep/ .ant-form-item{
			display: flex;
			// align-items: center;
			margin-bottom: 15px;

			.ant-form-item-label{
				width: 60px;
				text-align: left;
			}

			.ant-form-item-control-wrapper{
				flex: 1;

				.ant-input{
					height: 40px;
				}
			}
		}

		.verify-container{
			/deep/ .ant-form-item-children{
				display: flex;
			}

			/deep/ .ant-input{
				flex: 1;
			}
		}
	}

	.authcode-module{
		/deep/ .ant-input{
			height: 40px;
			margin-bottom: 15px;
		}
	}

	.terms-and-policy-container{
		margin-top: 15px;
		user-select: none;

		/deep/ .ant-btn{
			padding: 0 5px;
		}

		/deep/ .ant-checkbox-checked::after{
			box-sizing: border-box;
		}

		/deep/ .ant-checkbox-checked .ant-checkbox-inner::after{
			box-sizing: border-box;
		}
	}
}
</style>
