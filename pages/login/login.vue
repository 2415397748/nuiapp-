<template>
	<view style="text-align: center;padding-top: 20px;">
		<view v-if="!this.$store.state.token">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" style="padding: 0 20px;">
				<uni-forms-item label="账号 :" name="account">
					<uni-easyinput type="text" v-model="formData.account" placeholder="请输入账号" @keydown.enter.native="formSubmit"/>
				</uni-forms-item>
				<uni-forms-item label="密码 :" name="password">
					<uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" @keydown.enter.native="formSubmit"/>
				</uni-forms-item>
			</uni-forms>
			<button @click="formSubmit">登录</button>
			<button @click="formReset" >注册</button>
			<view style="padding-top: 10px;">
				<text>账号：admin&#12288;&#12288;密码：admin123</text>
			</view>
		</view>
		<view v-else>
			<view>
				<image src="../../static/yonghu.png"></image>
			</view>
			<text>用户：{{val}}</text>
			<button type="default" @click="handleLogout" >退出登录</button>
		</view>
	</view>
</template>

<script>
	import {validateaCcount,validateaPassword} from '../../Utils/validatorUtils.js'
	export default {
		data() {
			return {
				MySQL:[
					{
					    account: 'admin',
						password: 'admin123',
					},
				],
				val:'yq1586',
				// 表单数据
				formData: {
					account: '',
					password: ''
				},
				rules: {
					// 对account字段进行必填验证
					account: {
						rules: [{
								required: true,
								errorMessage: '账号不能为空',
							},
							{
								minLength: 5,
								maxLength: 10,
								errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
							},
							{
								validateFunction:validateaCcount
							}
						]
					},
					// 对email字段进行必填验证
					password: {
						rules: [{
							required: true,
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						},
						{
							validateFunction:validateaPassword
						}
						]
					}
				}
			}
		},
		methods: {
			// 表单提交并重置
			formSubmit() {
				this.$refs.form.validate().then(res=>{
					const account = this.MySQL.filter((items) => items.account === res.account && items.password === res.password);
					if(account.length < 1){
						uni.showModal({
							content: '账号密码错误',
							showCancel:false
						});
					}else {
						this.$store.dispatch('login', res.account);
						this.formData.account= '';
						this.formData.password= '';
					};
				}).catch(err =>{})
			},
			//表单注册并重置
			formReset(e) {
				this.$refs.form.validate().then(res=>{
					const account = this.MySQL.filter((items) => items.account === this.formData.account);
					if(account.length > 0){
						uni.showModal({
							content: '账号已存在',
							showCancel:false
						});
					}else {
						uni.showModal({
							content: '注册成功',
							showCancel:false
						});
						this.MySQL.push(this.formData);
						this.formData.account= '';
						this.formData.password= '';
					}
				}).catch(err =>{})
			},
			//退出登录
			handleLogout() {
				this.$store.dispatch('logout')
			},
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
