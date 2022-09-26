<template>
	<view>
		<view style="text-align:center;padding-top: 10px;">
			<image :src="data.src"></image>
			<view style="position: relative;">
				<view>
					<text>{{data.menu}}</text>
				</view>
				<view>
					<text>价格：{{data.price}}</text>
				</view>
				<view style="position: absolute;bottom: 0;right: 5px;">
					<uni-number-box :value="data.quantity" @change="(value) => changeValue(value,this.data)" @click.native.stop="nativeStop()"/>
				</view>
			</view>
			<view style="position: fixed;bottom: 5px;left: 0;width: 80%;background-color: aqua;height: 46px;z-index: 1000;">
				<text style="line-height: 46px;">总价格：{{totalPrices}}</text>
			</view>
			<view style="position: fixed;bottom: 5px;right: 0;width: 20%;z-index: 1000;">
				<button @click="checkOut()">结账</button>
			</view>
			<view style="height: 50px;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//路由跳转传入的id
				id: '',
				src:'',
				data:{},
				totalPrices:0,
				quantity:0,
				price:0,
				//菜单列表
				menus:[],
			}
		},
		onLoad(option) {
			//取出总价
			const totalPrices = uni.getStorageSync('totalPrices');
			this.totalPrices = totalPrices;
			//取出菜单信息
			const menus = uni.getStorageSync('menus');
			this.menus = menus;
			//筛选对应的菜的信息
			this.id = JSON.parse(option["id"]) || null;
			const account = this.menus.filter((items) => items.id === this.id);
			// this.menus = Object.assign(account,{})
			this.data = account[0];
			
		},
		onUnload(){
			const totalPrices = uni.getStorageSync('totalPrices');
			this.totalPrices = totalPrices;
			//取出菜单信息
			const menus = uni.getStorageSync('menus');
			this.menus = menus;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('recive', {
				//data为传入的数据
				data: this.menus
			});
		},
		methods: {
			nativeStop(){
				
			},
			changeValue(value,item) {
				this.menus.some(val => {
				 	if(val.id == item.id) return val.quantity = value;
				})
				this.totalPrices = 0;
				this.menus.forEach(val => {
					this.totalPrices += val.quantity * val.price
				})
				uni.setStorageSync('totalPrices',this.totalPrices);
				uni.setStorageSync('menus',this.menus);
			},
			checkOut(){
				if(this.totalPrices){
					uni.switchTab({
						url: '/pages/ShoppingCart/ShoppingCart'
					});
				}else {
					uni.showToast({
						title: '请先选择商品',
						icon:'none',
						duration: 1000
					});
				}
			}
		}
	}
</script>

<style>

</style>
