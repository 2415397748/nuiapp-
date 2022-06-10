<template>
	<view>
		<view>
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索" clearButton="auto" cancelButton="none" v-model="val"/>
		</view>
		<view v-for="(item,index) in list" class="item">
			<image style="width: 100px; height: 100px;" :src="item.src" :alt="item.menu"  @click="navigateTo(item)"></image>
			<view>
				<text>{{item.menu}}</text>
			</view>
		</view>
		<view>
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
						:direction="direction" @trigger="trigger" @fabClick="fabClick" />
			点单数量：{{data.money}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//菜单列表
				menus:[
					{
						id: 1,
						src: '../../static/qingcaichaolongxia.jpeg',
						menu:'青菜炒龙虾',
					},
					{
						id: 2,
						src: '../../static/lajiaochaorou.jpeg',
						menu:'辣椒炒肉',
					},
					{
						id: 3,
						src: '../../static/mapodoufu.jpeg',
						menu:'麻婆豆腐',
					},
					{
						id: 4,
						src: '../../static/xianggudundoufu.jpeg',
						menu:'香菇炖豆腐',
					},
					{
						id: 6,
						src: '../../static/laziya.jpeg',
						menu:'辣子鸭',
					},
					{
						id: 7,
						src: '../../static/xiangguhuaji.jpeg',
						menu:'香菇滑鸡',
					},
					{
						id: 11,
						src: '../../static/hongshaoqiezi.jpeg',
						menu:'红烧茄子',
					},
					{
						id: 12,
						src: '../../static/fanqiechaojidan.jpeg',
						menu:'番茄炒鸡蛋',
					},
				],
				filterName:'',
				val:'',
				data:{
					money: 0,
				},
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
				content: [{
						iconPath: '/static/image.png',
						selectedIconPath: '/static/image-active.png',
						text: '相册',
						active: false
					},
					{
						iconPath: '/static/home.png',
						selectedIconPath: '/static/home-active.png',
						text: '首页',
						active: false
					},
					{
						iconPath: '/static/star.png',
						selectedIconPath: '/static/star-active.png',
						text: '收藏',
						active: false
					}
				]
			}
		},
		onLoad() {
			console.log(this.data)
		},
		methods: {
			search(val){
				this.val = this.filterName
			},
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
		},
		computed:{
			list(){
				const filterName = this.val.trim().toLowerCase()
				if (filterName) {
				const searchProps = ['menu']
				const rest = this.menus.filter(item => searchProps.some(key => item[key].toString().toLowerCase().indexOf(filterName) > -1))
				//只需要搜索菜名，不需要使用some函数
				// const rest = this.menus.filter(item => item['menu'].toLowerCase().indexOf(filterName) > -1)
				return rest
			  }
			return this.menus
			}
		}
	}
</script>

<style>
.item{
	padding: 10px 10px;
	display: inline-block;
	width: calc(50% - 20px);
	text-align:center
 }
 .warp {
 		padding: 10px;
 	}
 
 	.button {
 		margin-bottom: 10px;
 	}
</style>
