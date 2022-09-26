<template>
	<view>
		<view class="up_img_wrap">
			<uni-list v-for="(item,index) in myMenus" :key="item.id">
				<uni-list-chat :title="item.menu" :avatar="item.src" :note="'￥' + String(item.price)" badge-positon="left" clickable @click="navigateTo(item)">
					<view class="chat-custom-right">
						<text class="chat-custom-text"></text>
						<uni-number-box :value="item.quantity" @change="(value) => changeValue(value,item)" @click.native.stop="nativeStop()"/>
					</view>
				</uni-list-chat>
			</uni-list>
		</view>
		<view style="position: fixed;bottom: 5px;left: 0;width: 80%;background-color: aqua;height: 46px;z-index: 1000;">
			<text style="line-height: 46px;">总价格：{{myTotalPrices}}</text>
		</view>
		<view style="position: fixed;bottom: 5px;right: 0;width: 20%;z-index: 1000;">
			<button @click="checkOut()">结算</button>
		</view>
		<view style="height: 50px;"></view>
	</view>
</template>

<script>
	export default {
		props:{
			menus:{
				type:Array,
				required: true,
			},
			totalPrices:{
				type:Number,
				required: true,
			}
		},
		data() {
			return {
				numberValue: 0,
				vModelValue: 0,
				value:0,
				myTotalPrices:this.totalPrices,
				myMenus:this.menus
			};
		},
		methods:{
			navigateTo(item){
				let value = '../menu/menu?id=' + item.id;
				uni.navigateTo({
					url: value,
					events: {
						recive: (data) => {
							this.myMenus = data.data;
							this.myTotalPrices = 0;
							data.data.forEach(val => {
								this.myTotalPrices += val.quantity * val.price
							})
						}
					},
					success: (res) => {
						res.eventChannel.emit('send', {
							//data为传入的数据
							// data: this.myMenus
						})
					}
				})
			},
			nativeStop(){
				
			},
			changeValue(value,item) {
				//计算价格
				this.myMenus.some(val => {
				 	if(val.id == item.id) return val.quantity = value;
				})
				this.myTotalPrices = 0;
				this.myMenus.forEach(val => {
					this.myTotalPrices += val.quantity * val.price
				})
				//缓存菜单信息和总价
				uni.setStorageSync('totalPrices',this.myTotalPrices);
				uni.setStorageSync('menus',this.myMenus);
			},
			checkOut(){
				if(this.myTotalPrices){
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

<style lang="less">
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	// .uni-list-chat__content-note,.uni-ellipsis{
	// 	color: black;
	// 	background-color: black;
	// }
	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}
</style>