<template>
	<div id="page-login">
		<div class="main-logo">
			<img src="@/assets/images/app-logo.png" />
			<span>{{app.name}}</span>
		</div>
		<div class="main-content">
			<verify-mode ref="verifyMode" v-if="verifyMode" @exitVerifyMode="verifyMode=false"></verify-mode>
			<register-mode v-else-if="registerMode" @exitRegisterMode="registerMode=false"></register-mode>
			<div class="common-container" v-show="!verifyMode&&!registerMode">
				<div class="login-switch-box">
					<a-tooltip placement="left" :title="loginMode=='account'?'扫码登录':'账号登录'" :get-popup-container="getTooltipContainer">
						<div class="switch-mode-box" @click="changeLoginMode">
							<a-icon :type="loginMode=='account'?'qrcode':'laptop'" class="switch-mode-icon" />
						</div>
					</a-tooltip>
				</div>
				<div class="login-content-box">
					<account-mode v-show="loginMode=='account'" @verifyAuthCode="handleVerifyAuthCode"></account-mode>
					<qrcode-mode v-if="loginMode=='qrcode'"></qrcode-mode>
				</div>
				<div class="login-footer-box">
					<span>还没有账号?</span>
					<a-button type="link" @click="registerMode=true">立即注册</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import AccountMode from "./components/accountMode";
import QrcodeMode from "./components/qrcodeMode";
import VerifyMode from './components/verifyMode';
import RegisterMode from './components/registerMode'
export default {
	name: "Login",
	components:{
		AccountMode,
		QrcodeMode,
		VerifyMode,
		RegisterMode
	},
	data() {
		return {
			loginMode:"account",
			verifyMode:false,
			registerMode:false
		};
	},
	computed: {
		...mapGetters(["app"])
	},
	methods: {
		// tooltip嵌入到触发元素内
    getTooltipContainer(trigger){
      return trigger.parentElement;
    },
		// 切换登录模式
		changeLoginMode(){
			this.loginMode=this.loginMode=="account"?"qrcode":"account"
		},
		// 子组件回传进行验证码
		handleVerifyAuthCode(phone){
			this.verifyMode = true
			this.$nextTick(()=>{
				this.$refs.verifyMode.init(phone)
			})
		}
	}
};
</script>

<style lang="less" scoped>
#page-login {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 100%;
	width: 100%;
	background:url("@/assets/images/bg.png") no-repeat center;
	background-size: cover;

	.main-logo{
		position: absolute;
		top: 0;
		left: 0;
		height: 80px;
		display: flex;
		align-items: center;
		padding-left: 35px;

		& > img {
			width: 40px;
			height: 40px;
		}

		& > span {
			margin-left: 10px;
			color: #fff;
    	font-size: 30px;
			user-select: none;
			font-weight: 700;
		}
	}

	.main-content{
		width: 500px;
		height: 600px;
		background-color: #fff;
		overflow: hidden;
    border-radius: 12px;
    border: 1px solid #dee0e3;

		.common-container{
			height: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.login-switch-box{
			position: absolute;
			top: 4px;
			right: 4px;
			border-radius: 8px;
			width: 200px;
			height: 100px;
			overflow: hidden;

			.switch-mode-box{
				position: absolute;
				top: 0;
				right: 0;
				width: 120px;
				height: 120px;
				transform: translate(58px,-58px) rotate(45deg);
				cursor: pointer;
				background-color: #82a7fc;
				transition: background-color .3s;
				overflow: hidden;

				&:hover{
					background-color: #4e83fd;
				}

				.switch-mode-icon{
					position: absolute;
					bottom: -20px;
					left: 50%;
					transform: translateX(-40%) rotate(-45deg);
					font-size: 50px;
					color: #fff;
				}
			}

			// /deep/ .ant-tooltip{
			// 	transform: translateY(100%);
			// }

			// /deep/ .ant-tooltip-inner{
			// 	min-height: auto;
			// }
		}

    .login-content-box{
      flex: 1;
      padding: 40px 50px 0 40px;
    }

		.login-footer-box{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			font-size: 14px;
			color: #646a73;

			/deep/ .ant-btn{
				padding-left: 8px;
			}
		}
	}

}
</style>
