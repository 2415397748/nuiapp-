<template>
	<view style="text-align: center;padding-top: 20px;">
		<view v-if="!this.$store.state.token">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">账号:</view>
					<input class="uni-input" placeholder="请输入账号" v-model="from.account" @keydown.enter.native="formSubmit"/>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码:</view>
					<input class="uni-input" placeholder="请输入密码" v-model="from.password" @keydown.enter.native="formSubmit"/>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">登录</button>
					<button type="default" form-type="reset" >注册</button>
				</view>
			</form>
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
	export default {
		data() {
			return {
				from:{
					account:'',
					password:'',
				},
				MySQL:[
					{
					    account: 'admin',
						password: 'admin123',
					},
				],
				val:'yq1586'
			}
		},
		// onLoad: function () {
		// 	console.log(this.$store.state.token)
		// },
		methods: {
			//表单提交并重置
			formSubmit(e) {
				const account = this.$data.MySQL.filter((items) => items.account === this.from.account && items.password === this.from.password);
				if(account.length < 1){
					uni.showModal({
						content: '账号密码错误',
						showCancel:false
					});
				}else {
					this.$store.dispatch('login', this.from.account)
				};
				this.from.account= '';
				this.from.password= '';
				console.log(this.$store.state.token)
			},
			//表单祖册并重置
			formReset(e) {
				const account = this.$data.MySQL.filter((items) => items.account === this.from.account);
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
				}
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
