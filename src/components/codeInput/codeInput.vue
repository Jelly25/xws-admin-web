<template>
	<div class="code-box-input">
    <div class="code-item" :class="codeValue.length == 0 && inputFocus ? 'code-item-active' : ''">{{codeValue[0]}}</div>
    <div class="code-item" :class="codeValue.length == 1 && inputFocus ? 'code-item-active' : ''">{{codeValue[1]}}</div>
    <div class="code-item" :class="codeValue.length == 2 && inputFocus ? 'code-item-active' : ''">{{codeValue[2]}}</div>
    <div class="code-item" :class="codeValue.length == 3 && inputFocus ? 'code-item-active' : ''">{{codeValue[3]}}</div>
    <div class="code-item" :class="codeValue.length == 4 && inputFocus ? 'code-item-active' : ''">{{codeValue[4]}}</div>
    <div class="code-item" :class="codeValue.length >= 5 && inputFocus ? 'code-item-active' : ''">{{codeValue[5]}}</div>
    <input class="input-code" autofocus v-model="codeValue" :maxlength="6" type="number" @blur="codeInputBlur" @focus="codeInputFocus" @input="codeInputChange" />
  </div>
</template>

<script>
	/**
	 * CodeInput 验证码输入框
	 * @description 该组件一般用于验证用户短信验证码的场景
	 * @property {String Number} maxlength 输入字符个数（默认4）
	 * @property {String} mode 模式选择，见上方"基本使用"说明（默认box）
	 * @property {String Number} value 预置值
	 * @property {Boolean} breathe 是否开启呼吸效果，见上方说明（默认true）
	 * @property {Boolean} focus 是否自动获取焦点（默认false）
	 * @property {Boolean} bold 字体和输入横线是否加粗（默认true）
	 * @property {String Number} font-size 字体大小，单位px（默认30）
	 * @property {String} active-color 当前激活输入框的样式（默认#2979ff）
	 * @property {String} inactive-color 非激活输入框的样式，文字颜色同此值（默认#606266）
	 * @property {String | Number} width 输入框宽度，单位px，高等于宽（默认50）
	 * @event {Function} change 输入内容发生改变时触发
	 * @event {Function} finish 输入字符个数达maxlength值时触发
	 */
	export default {
		name: "CodeInput",
		props: {
			// 最大输入长度
			maxlength: {
				type: [Number, String],
				default: 4
			},
			// 显示模式，box-盒子模式，bottomLine-横线在底部模式，middleLine-横线在中部模式
			mode: {
				type: String,
				default: "box"
			},
			// 预置值
			value: {
				type: [String, Number],
				default: ''
			},
			// 当前激活输入item，是否带有呼吸效果
			breathe: {
				type: Boolean,
				default: true
			},
			// 是否自动获取焦点
			focus: {
				type: Boolean,
				default: false
			},
			// 字体是否加粗
			bold: {
				type: Boolean,
				default: false
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 60
			},
			// 激活样式
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 未激活的样式
			inactiveColor: {
				type: String,
				default: '#606266'
			},
			// 输入框的大小，单位rpx，宽等于高
			width: {
				type: [Number, String],
				default: '80'
			},
			// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
			disabledKeyboard: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				codeValue: '',
				inputFocus: true,
			}
		},
		methods: {
			// 验证码输入框input
			codeInputChange() {
				if (this.codeValue && this.codeValue.length >= 6) {
					this.inputFocus = false
					this.$emit("finish",this.codeValue)
				}else{
					if(!this.inputFocus) this.inputFocus = true
					this.$emit('change',this.codeValue)
				}
			},
			// 验证码输入框失去焦点
			codeInputBlur() {
				this.inputFocus = false;
			},
			// 验证码输入框获取到焦点
			codeInputFocus() {
				this.inputFocus = true;
			},
		}
}
</script>

<style scoped lang="less">
.code-box-input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	position: relative;

	.input-code {
		width: 100%;
		height: 50px;
		position: absolute;
		left: 0px;
		top: 0px;
		color: transparent;
		background-color: transparent;
		opacity: 0;
	}

	.code-item {
		width: 50px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		border: 1px solid #606266;
		color: #1f2329;
		font-size: 30px;
		border-radius: 8px;
	}

	.code-item-active {
		border: 2px solid #2979ff;
	}
}
</style>
