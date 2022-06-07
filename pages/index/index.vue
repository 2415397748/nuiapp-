<template>
	<view>
		<view>
			<input class="uni-input" focus placeholder="搜索" v-model="val"
			 style="line-height: 50px;height: 50px;border:1px solid #555555;padding-left: 20px;border-radius: 30px;margin-top: 5px;"/>
			<icon type="search" size="26" style="position: absolute;right: 15px;top: 13px;" v-if="!val"/>
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
</style>
