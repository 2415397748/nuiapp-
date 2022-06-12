<template>
	<view>
		<view class="up_img_wrap">
			<uni-list v-for="(item,index) in menus" :key="item.id">
				<uni-list-chat :title="item.menu" :avatar="item.src" :note="'￥' + String(item.price)" badge-positon="left" clickable @click="navigateTo(item)">
					<view class="chat-custom-right">
						<text class="chat-custom-text"></text>
						<uni-number-box value="0" @change="(value) => changeValue(value,item)" @click.native.stop="nativeStop()"/>
					</view>
				</uni-list-chat>
			</uni-list>
		</view>
		<view style="text-align: center;">
			<text>总价格：{{value}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			menus:{
				type:Array,
				required: true,
			},
			index:{
				type:Number,
				value:-1
			}
		},
		data() {
			return {
				numberValue: 0,
				vModelValue: 0,
				value:0,
				menusData:{}
			};
		},
		onLoad(){
			
		},
		methods:{
			navigateTo(item){
				let value = '../menu/menu?id=' + item.id;
				uni.navigateTo({
					url: value,
					events: {
						recive: (data) => {
							//data.data为返回的数据
							console.log('返回的数据',data.data)
							this.data = data.data
						}
					},
					success: (res) => {
						res.eventChannel.emit('send', {
							data: this.data
						})
					}
				})
			},
			change(value) {
				this.numberValue = value
			},
			nativeStop(){
				
			},
			changeValue(value,item) {
				this.menusData = Object.assign({},this.menus)
				this.menus.some(val => {
				 	if(val.id == item.id) return val.quantity = value;
				})
				// item.quantity = value;
				this.value = 0;
				this.menus.forEach(val => {
					this.value += val.quantity * val.price
				})
			},
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