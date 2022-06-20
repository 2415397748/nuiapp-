<template>
	<view>
		<view class="up_img_wrap">
			<uni-list v-for="(item,index) in list" :key="item.id">
				<uni-list-chat :title="item.menu" :avatar="item.src" :note="'￥' + String(item.price)" badge-positon="left" clickable @click="navigateTo(item)">
					<view class="chat-custom-right">
						<uni-icons type="star-filled" color="#999" size="18"></uni-icons>
						<text class="chat-custom-text">数量:{{item.quantity}}</text>
					</view>
				</uni-list-chat>
			</uni-list>
		</view>
		<view style="position: fixed;bottom: 5px;left: 0;width: 80%;background-color: aqua;height: 46px;z-index: 1000;">
			<text style="line-height: 46px;">总价格：{{totalPrices}}</text>
		</view>
		<view style="position: fixed;bottom: 5px;right: 0;width: 20%;z-index: 1000;">
			<button @click="checkOut()">付款</button>
		</view>
		<view style="height: 50px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myMenus:[],
				totalPrices:0,
				menus:[
					{
						id: 1,
						src: '../../static/qingcaichaolongxia.jpeg',
						menu:'青菜炒龙虾',
						price:20,
						quantity:0
					},
					{
						id: 2,
						src: '../../static/lajiaochaorou.jpeg',
						menu:'辣椒炒肉',
						price:16,
						quantity:0
					},
					{
						id: 3,
						src: '../../static/mapodoufu.jpeg',
						menu:'麻婆豆腐',
						price:14,
						quantity:0
					},
					{
						id: 4,
						src: '../../static/xianggudundoufu.jpeg',
						menu:'香菇炖豆腐',
						price:15,
						quantity:0
					},
					{
						id: 6,
						src: '../../static/laziya.jpeg',
						menu:'辣子鸭',
						price:16,
						quantity:0
					},
					{
						id: 7,
						src: '../../static/xiangguhuaji.jpeg',
						menu:'香菇滑鸡',
						price:17,
						quantity:0
					},
					{
						id: 11,
						src: '../../static/hongshaoqiezi.jpeg',
						menu:'红烧茄子',
						price:13,
						quantity:0
					},
					{
						id: 12,
						src: '../../static/fanqiechaojidan.jpeg',
						menu:'番茄炒鸡蛋',
						price:18,
						quantity:0
					},
				],
			}
		},
		onLoad(){
			//取出总价
			const totalPrices = uni.getStorageSync('totalPrices');
			//取出菜单信息
			const menus = uni.getStorageSync('menus');
			if(totalPrices > 0){
				this.totalPrices = totalPrices;
				this.menus = menus;
			}
		},
		onShow() {
			//取出总价和菜单信息
			const totalPrices = uni.getStorageSync('totalPrices');
			const menus = uni.getStorageSync('menus');
			if(totalPrices > 0){
				this.totalPrices = totalPrices;
				this.myMenus = Object.assign(menus,{});
			}
		},
		methods:{
			checkOut(){
				if(this.totalPrices){
					uni.showToast({
						title: '付款成功',
						duration: 1000
					});
					this.totalPrices = 0;
					this.myMenus = this.menus;
					// //缓存菜单信息和总价
					uni.setStorageSync('totalPrices',0);
					uni.setStorageSync('menus',this.menus);
				}else {
					uni.showToast({
						title: '请先选择商品',
						icon:'none',
						duration: 1000
					});
				}
			}
		},
		computed:{
			list(){
				const rest = this.myMenus.filter(item => item.quantity >= 1)
				if(rest.length >=1) return rest
				else return []
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
