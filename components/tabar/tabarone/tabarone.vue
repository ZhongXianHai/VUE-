<!-- 动画框800，逐渐变高 -->
<template>
	<view class="tabarone" :style="[{background:back}]">
		<view class="tabar-off" @click="offbox">
			<image :src="$changeImg(offico)"></image>
		</view>
		<view class="tabar-cont">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name:"tabarone",
		data() {
			return {
				offico:'/uploads/ico/ico220221107914.png',
			}
		},
		props:{
			back:{
				type:String,
				default:"#fff",
			}
		},
		methods: {
			offbox(i){
				this.$emit('offbox',{
					
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.tabarone{
	width: 100%;
	height: 900rpx;
	position: relative;
	animation:myfirst 0.2s;
}
@keyframes myfirst
{
	from {height:0rpx;}
	to {height:900rpx;}
}
.tabar-off{
	position: absolute;
	right: 0rpx;
	top: 0rpx;
	padding: 20rpx;
	width: 50rpx;
	height: 50rpx;
}
.tabar-cont{
	width: 100%;
	height: 100%;
}
</style>
