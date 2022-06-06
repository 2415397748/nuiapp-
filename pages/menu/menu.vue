<template>
	<view>
		<view style="text-align:center;padding-top: 10px;">
			<image :src="src"></image>
			<view>
				<text>{{menu}}</text>
			</view>
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
				menu:'',
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
						id: 12,
						src: '../../static/香菇鸡肉.jpeg',
						menu:'香菇鸡肉',
					},
				],
			}
		},
		onLoad(option) {
			this.id = JSON.parse(option["id"]) || ""
			const account = this.menus.filter((items) => items.id === this.id)
			this.src = account[0].src
			this.menu = account[0].menu
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
