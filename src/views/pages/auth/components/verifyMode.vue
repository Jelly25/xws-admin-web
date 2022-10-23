<template>
	<div class="auth-verify-module">
		<div class="back-container">
			<div class="back-button" @click="handleBack">
				<a-icon type="left" />
				<span>返回</span>
			</div>
		</div>
		<div class="title-container">
			<div class="title-title">输入手机号验证码</div>
			<div class="title-message-tip" v-if="!errMessageShow">
				请输入发送至
				<strong>{{encryptedPhone}}</strong>
				的6位数字验证码，有效期10分钟
			</div>
			<div class="title-message-tip error-message" v-else>验证码错误，请重新输入</div>
		</div>
		<div class="code-container">
			<code-input @change="handleAuthCodeChange" @finish="handleAuthCodeFinish"></code-input>
			<div class="code-box-count" v-if="countDownShow">
				<a-statistic-countdown format="ss" :value="countDown" style="margin-right: 5px" @finish="handleCountDownFinish"/>
				<span>秒后可重新获取验证码</span>
			</div>
			<div class="code-box-resend" v-else @click="handleResend">重新获取验证码</div>
			<div class="forget-box">
				<span>手机号已停用?</span>
				<a-button type="link">找回账号</a-button>
			</div>
		</div>
		<div class="flex-grow"></div>
		<a-button class="footer-button" type="primary" size="large" block :disabled="buttonDisabled">下一步</a-button>
	</div>
</template>

<script>
import CodeInput from "@/components/codeInput/codeInput";
export default {
	name:"QrcodeMode",
	components:{
		CodeInput
	},
	data() {
		return {
			phoneNumber:"",
			countDown:Date.now() + 1000 * 60,
			errMessageShow:false,
			countDownShow:true,
			buttonDisabled:true
		}
	},
	computed: {
		encryptedPhone(){
			return this.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/,'$1****$3')
		}
	},
	methods: {
		// 初始化获取父组件传递过来的手机号
		init(phone){
			this.phoneNumber = phone
		},
		// 返回
		handleBack(){
			this.$emit("exitVerifyMode")
		},
		// 倒计时结束事件
		handleCountDownFinish(){
			this.countDownShow = false
		},
		// 验证码输入完成事件
		handleAuthCodeFinish(e){
			this.buttonDisabled = false
			// 接口验证
		},
		// 验证码输入事件
		handleAuthCodeChange(e){
			if(!this.buttonDisabled){
				this.buttonDisabled = true
			}
		},
		// 重新发送验证码
		handleResend(){
			this.countDown = Date.now() + 1000 * 60
			this.countDownShow = true
			// 调用接口重新发送
		}
	},
}
</script>

<style lang="less" scoped>
.auth-verify-module{
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

		.title-message-tip{
			font-size: 14px;
			color: #646a73;
			margin-top: 8px;
			line-height: 20px;
			min-height: 40px;
		}

		.title-message-tip.error-message{
			color: #f54a45;
		}
	}

	.code-container{
		margin-bottom: 20px;

		.code-box-count{
			display: flex;
			align-items: center;
			margin-top: 15px;
			font-size: 15px;

			/deep/ .ant-statistic{
				line-height: 1;

				.ant-statistic-content{
					display: inline-flex;
					align-items: center;
				}
			}

			/deep/ .ant-statistic-content-value{
				font-size: 15px;
			}
		}

		.code-box-resend{
			margin-top: 15px;
			color: #3370ff;
			font-size: 15px;
			line-height: 1;
			cursor: pointer;
			-webkit-transition: color .2s;
			transition: color .2s;
			display: inline-block;
		}

		.forget-box{
			margin-top: 10px;
			font-size: 15px;

			/deep/ .ant-btn{
				padding-left: 5px;
			}
		}
	}

	.flex-grow{
		flex-grow: 1;
	}

	.footer-button{
		/deep/ .ant-btn{
			margin-top: 20px;
		}
	}
}
</style>
