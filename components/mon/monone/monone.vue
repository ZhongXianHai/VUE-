<!-- 搜素框样式 -->
<template>
	<view class="monone">
		<image class="img" :src="$changeImg(fanda)"></image>
		<view class="monone-text">
			<swiper class="textbox" vertical="true" duration="500" interval="3000" circular="true" autoplay>
				<swiper-item  v-for="(item,index) in resou" :key="index">
					<view> {{item.name}} </view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name:"monone",
		data() {
			return {
				fanda:'/uploads/ico/ico220218114103.png',
			}
		},
		props:{
			resou:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.monone{
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.monone .img{
	width: 20px;
	height: 20px;
	margin: 0px 5px;
}
.monone-text{
	flex: 1;
	height:100%;
	overflow: hidden;
}
.textbox{
	width: 100%;
	height: 100%;
}
</style>
