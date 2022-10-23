<template>
	<div class="register-module">
		<div class="back-container">
			<div class="back-button" @click="handleBack">
				<a-icon type="left" />
				<span>返回</span>
			</div>
		</div>
		<div class="title-container">
			<div class="title-title">用户注册</div>
		</div>
		<div class="form-container">
			<a-form-model hideRequiredMark :model="registerForm" :rules="registerFormRules" ref="registerForm">
				<a-form-model-item label="姓名" prop="userName">
					<a-input placeholder="请输入姓名" v-model="registerForm.userName"/>
				</a-form-model-item>
				<a-form-model-item label="手机号" prop="phoneNumber">
					<a-input :disabled="verifyLoading" placeholder="请输入手机号" v-model="registerForm.phoneNumber"/>
				</a-form-model-item>
				<a-form-model-item label="密码" prop="password">
					<a-input-password placeholder="请输入密码" v-model="registerForm.password" />
				</a-form-model-item>
				<a-form-model-item label="确认密码" prop="checkPassword">
					<a-input-password placeholder="请再次输入密码" v-model="registerForm.checkPassword" />
				</a-form-model-item>
				<a-form-model-item label="验证码" prop="verifyCode" class="verify-container">
					<a-input placeholder="请输入验证码" v-model="registerForm.verifyCode" />
					<a-button type="primary" :loading="verifyLoading" :disabled="phoneNumberIsValid" @click="getVerifyCode">
						{{verifyLoading?countDown+'秒后重新发送':'获取验证码'}}
					</a-button>
				</a-form-model-item>
			</a-form-model>
		</div>
		<div class="flex-grow"></div>
		<a-button class="submit-button" type="primary" size="large" block :disabled="formIsValid" @click="handleRegister">注册</a-button>
	</div>
</template>

<script>
export default {
	name:"ResisterMode",
	data() {
		return {
			registerForm:{
				userName:"",
				phoneNumber:"",
				password:"",
				checkPassword:"",
				verifyCode:""
			},
			countDown:60,
			verifyLoading:false,//获取验证码loading
		}
	},
	computed: {
		registerFormRules(){
			let validateCheckPass = (rule, value, callback) => {
				if (value !== this.registerForm.password) {
					callback(new Error("两次输入密码不匹配"));
				} else {
					callback();
				}
			};
			return {
				userName:[
					{ required: true, whitespace:true, message: '用户名不能为空', trigger: ['blur','change'] },
					{ min: 2, max: 4, message: '用户名由2-4位字符组成', trigger: ['blur','change'] },
				],
				phoneNumber:[
					{ required: true, whitespace:true, message: '手机号不能为空', trigger: ['blur','change'] },
					{ pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/, message: '手机号格式不正确', trigger: ['blur','change'] },
				],
				password:[
					{ required: true, whitespace:true, message: '密码不能为空', trigger: ['blur','change'] },
					{ min: 6, max: 16, message: '密码由6-16位字符组成', trigger: ['blur','change'] },
				],
				checkPassword:[
					{ required: true, whitespace:true, message: '确认密码不能为空', trigger: ['blur','change'] },
					{ validator: validateCheckPass, trigger: ['blur','change'] }
				],
				verifyCode:[
					{ required: true, whitespace:true, message: '验证码不能为空', trigger: ['blur','change'] }
				]
			}
		},
		formIsValid(){
			return Object.values(this.registerForm).indexOf("") !==-1
		},
		phoneNumberIsValid(){
			return !/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(this.registerForm.phoneNumber)
		}
	},
	methods: {
		// 返回
		handleBack(){
			this.$emit("exitRegisterMode")
		},
		// 获取验证码
		getVerifyCode(){
			this.verifyLoading = true
			this.countDown--
			let timer = setInterval(()=>{
				this.countDown--
				if(this.countDown==0){
					this.countDown = 60
					this.verifyLoading = false
					clearInterval(timer)
				}
			},1000)
		},
		// 执行注册
		handleRegister(){
			this.$refs.registerForm.validate(valid => {
				if (!valid) return
			});
		}
	},
}
</script>

<style lang="less" scoped>
.register-module{
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 40px 40px;

	.back-container{
		height: 40px;

		.back-button{
			display: inline-flex;
			align-items: center;
			height: 30px;
			padding: 0 5px;
			border-radius: 6px;
			font-size: 15px;
			cursor: pointer;
			background-color: #fff;
			transition: background-color .3s;

			/deep/ .anticon{
				display: flex;
				align-items: center;
			}

			span{
				margin-left: 5px;
			}

			&:hover{
				background-color: #e8e9e9;
			}
		}
	}

	.title-container{
		margin-bottom: 24px;

		.title-title{
			font-size: 22px;
			color: #1f2329;
			font-weight: 600;
			line-height: 30px;
		}
	}

	.form-container{
		/deep/ .ant-form-item{
			display: flex;
			// align-items: center;
			margin-bottom: 15px;

			.ant-form-item-label{
				width: 80px;
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

			/deep/ .ant-btn{
				height: 40px;
				margin-left: 20px;
			}
		}
	}

	.flex-grow{
		flex-grow: 1;
	}

	.submit-button{
		margin-top: 15px;
	}
}
</style>
