<!-- 动画框1000，逐渐变高 -->
<template>
	<view class="tabartwo" :style="[{background:back}]">
		<view class="tabar-cont">
			<slot></slot>
		</view>
		<view class="tabar-off" @click="offbox">关闭</view>
	</view>
</template>
<script>
	export default {
		name:"tabartwo",
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
.tabartwo{
	width: 100%;
	height: 1000rpx;
	position: relative;
	animation:myfirst 0.2s;
}
@keyframes myfirst
{
	from {height:0rpx;}
	to {height:1000rpx;}
}
.tabar-cont{
	width: 100%;
	height: 900rpx;
}
.tabar-off{
	width: 94%;
	height: 80rpx;
	margin: 10rpx 3%;
	border-radius: 80rpx;
	background: $uni-color-color;
	color: #fff;
	text-align: center;
	line-height: 80rpx;
	box-shadow: 0px 0px 3px #999;
}
</style>
