<template>
	<view>
		<view>
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
					<button type="default" form-type="reset">注册</button>
				</view>
			</form>
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
				]
			}
		},
		methods: {
			//表单提交并重置
			formSubmit(e) {
				// console.log(e);
				const account = this.$data.MySQL.filter((items) => items.account === this.from.account && items.password === this.from.password);
				if(account.length > 0){
					console.log('登录成功',JSON.stringify(this.from))
				}else {
					uni.showModal({
						content: '账号密码错误',
						showCancel:false
					});
				};
				this.from.account= '';
				this.from.password= '';
			},
			//表单祖册并重置
			formReset(e) {
				const account = this.$data.MySQL.filter((items) => items.account === this.from.account);
				if(account.length > 0){
					console.log('账号已存在',JSON.stringify(this.from))
				}else {
					uni.showModal({
						content: '注册成功',
						showCancel:false
					});
				}
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
