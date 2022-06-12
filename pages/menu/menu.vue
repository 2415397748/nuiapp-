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
				data:{}
			}
		},
		onLoad(option) {
			this.id = JSON.parse(option["id"]) || "";
			const account = this.menus.filter((items) => items.id === this.id);
			this.src = account[0].src;
			this.menu = account[0].menu;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('send', (data) => {
				//data.data为接收的数据
				this.data = data.data
				console.log('接收的数据',data.data)
			})
		},
		onUnload(){
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('recive', {
				data: this.data
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
