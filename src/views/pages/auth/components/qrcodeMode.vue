<template>
	<div class="qr-login-module">
		<div class="title-container">
			<div class="title-title">扫码登录</div>
			<div class="title-subtitle">请使用『{{app.name}}』移动端扫描二维码</div>
		</div>
		<div class="qr-container">
			<canvas id="qrcode"></canvas>
			<div class="qrcode-mask" v-if="isExpired">
				<div class="qr-refresh-cover" @click="refreshQrcode">
					<a-icon :type="refreshLoading?'loading':'redo'" style="font-size:40px"/>
					<span>{{refreshLoading?'加载中...':'刷新二维码'}}</span>
				</div>
			</div>
			<div class="qrcode-mask" v-if="isScan">
				<a-icon type="check-circle" theme="filled" style="font-size:60px;position:absolute;color:#52c41a"/>
			</div>
		</div>
		<div :class="['scan-tip',isScan?'':'scan-tip-hide']">扫码成功<br><span>请在『{{app.name}}』移动端确认登录</span></div>
	</div>
</template>

<script>
import QRCode from 'qrcode'
import {mapGetters} from 'vuex'
import { getUUID } from "@/utils";
export default {
	name:"QrcodeMode",
	data() {
		return {
			isScan:false,
			isExpired:false,
			refreshLoading:false
		}
	},
	computed: {
		...mapGetters(["app"])
	},
	mounted(){
		let data = JSON.stringify({qrlogin:{token:getUUID()}})
		QRCode.toCanvas(document.getElementById('qrcode'), data, { margin:1.5,width:200 }, (error)=> {
			if (error) return this.$message.error('生成二维码失败')
			this.isExpired = false
			// 二维码失效事件
			let validTimer = setTimeout(() => {
				this.isExpired = true;
				this.isScan = false
				clearTimeout(validTimer);
			}, 10 * 1000);
			this.longPolling();
		})
	},
	methods: {
		// 刷新获取二维码
		refreshQrcode(){
			if(this.refreshLoading) return
			this.refreshLoading = true
			let data = JSON.stringify({qrlogin:{token:getUUID()}})
			let refreshTimer = setTimeout(()=>{
				clearTimeout(refreshTimer)
				QRCode.toCanvas(document.getElementById('qrcode'), data, { margin:1.5,width:200 }, (error)=> {
					this.refreshLoading = false
					if (error) return this.$message.error('生成二维码失败')
					this.isExpired = false
					// 二维码失效事件
					let validTimer = setTimeout(() => {
						clearTimeout(validTimer);
						this.isExpired = true;
						this.isScan = false
					}, 60 * 1000);
					this.longPolling();
				})
			},1000)
		},
		// 对二维码轮询
		async longPolling(){
			try {
        let {data: { code: status }} = await this.checkBindingStatus();
        if (status === 0) {
          this.longPolling();
        } else {
          if (status === 1) {
            this.$message.success("账号绑定成功!");
            this.qrcode = false;
            this.bindingStatus = -2;
          }
        }
      } catch (e) {
        // 当服务器失联后，通过前端设置的有效期断开连接，停止长轮询
        if (Date.now() < this.expire) {
          this.longPolling();
        }
      }
		}
	},
}
</script>

<style lang="less" scoped>
.qr-login-module{
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.title-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50px;

		.title-title{
			font-size: 24px;
			color: #1f2329;
			font-weight: 600;
			line-height: 32px;
			white-space: pre-wrap;
		}

		.title-subtitle{
			font-size: 14px;
			color: #646a73;
			margin-top: 12px;
			line-height: 20px;
			min-height: auto;
			white-space: pre-wrap;
		}
	}

	.qr-container{
		position: relative;
		width: 200px;
    height: 200px;
    min-height: 200px;
		margin: 32px auto;
		border-radius: 10px;
    background-color: #fff;
		overflow: hidden;

		.qrcode-mask{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 200px;
			height: 200px;
			min-height: 200px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			&::before{
				position: absolute;
				content: "";
				display: block;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				border-radius: 10px;
				background-color: #000;
				opacity: .6;
			}

			.qr-refresh-cover{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;
				color: #fff;
				font-size: 14px;
				cursor: pointer;

				span{
					margin-top: 10px;
				}
			}
		}
	}

	.scan-tip{
		width: 100%;
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    color: #1f2329;
    font-weight: 700;
    transition: all .3s;

		span{
			font-size: 14px;
			line-height: 22px;
			font-weight: 400;
			text-align: center;
			color: #646a73;
			margin-top: 12px;
			display: inline-block;
		}

		&-hide{
			opacity: 0;
		}
	}
}

</style>
