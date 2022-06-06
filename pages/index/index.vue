<template>
	<view>
		<view>
			<input class="uni-input" focus placeholder="搜索" v-model="val"
			 style="line-height: 50px;height: 50px;border:1px solid #555555;margin: 5px 20px;"/>
			<icon type="search" size="26" style="position: absolute;right: 30px;top: 15px;"/>
		</view>
		<view v-for="(item,index) in list" class="item" @click="navigateTo(item)">
			<image style="width: 100px; height: 100px;" :src="item.src" :alt="item.menu"></image>
			<view>
				<text>{{item.menu}}</text>
			</view>
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
						src: '../../static/青菜炒龙虾.jpeg',
						menu:'青菜炒龙虾',
					},
					{
						id: 2,
						src: '../../static/辣椒炒肉.jpeg',
						menu:'辣椒炒肉',
					},
					{
						id: 3,
						src: '../../static/麻婆豆腐.jpeg',
						menu:'麻婆豆腐',
					},
					{
						id: 4,
						src: '../../static/香菇炖豆腐.jpeg',
						menu:'香菇炖豆腐',
					},
					{
						id: 6,
						src: '../../static/辣子鸭.jpeg',
						menu:'辣子鸭',
					},
					{
						id: 7,
						src: '../../static/香菇鸡肉.jpeg',
						menu:'香菇鸡肉',
					},
					{
						id: 11,
						src: '../../static/香菇炖豆腐.jpeg',
						menu:'香菇炖豆腐',
					},
					{
						id: null,
						src: '../../static/香菇鸡肉.jpeg',
						menu:'香菇鸡肉',
					},
				],
				filterName:'',
				val:'',
			}
		},
		onLoad() {

		},
		methods: {
			search(val){
				this.val = this.filterName
			},
			navigateTo(item){
				let value = '../menu/menu?id=' + item.id 
				uni.navigateTo({
					url:value
				});
			},
		},
		computed:{
			list(){
				const filterName = this.val.trim().toLowerCase()
				if (filterName) {
				const searchProps = ['menu']
				const rest = this.menus.filter(item => searchProps.some(key => {
					console.log(filterName)
					console.log(item[key])
					return item[key].toString().toLowerCase().indexOf(filterName) > -1
				}))
				//只需要搜索菜名，不需要使用some函数
				// const rest = this.menus.filter(item => item['menu'].toLowerCase().indexOf(filterName) > -1)
				console.log(rest)
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
</style>
