<!-- 导航图标，带数字 -->
<template>
	<view class="imgtwo">
		<view class="icobox">
			<image :src="$changeImg(data.image)" mode="widthFix"></image>
			<view class="icobox-name">{{ data.name }}</view>
		</view>
		<view class="icosum" v-show="sum">{{ sum }}</view>
	</view>
</template>

<script>
	export default {
		name:"imgtwo",
		data() {
			return {
			}
		},
		props:{
			sum:{
				type:Number,
				default:0,
			},
			data:{
				type:Object,
				default:() => [],
			}
		}
	}
</script>

<style lang="scss" scoped>
.imgtwo{
	position: relative;
	text-align: center;
}
.imgtwo:active{
	background: #eee;
}
.imgtwo image{
	width: 80%;
	margin: 0rpx 10%;
	vertical-align: middle;
	line-height: 0rpx;
}
.imgtwo .icobox-name{
	font-size: $uni-span-font;
	color: #333;
	line-height: 30rpx;
}
.imgtwo .icosum{
	position: absolute;
	left:40rpx;
	top: -10rpx;
	width: 30rpx;
	height: 30rpx;
	color: #fff;
	font-size: $uni-span-font;
	border-radius: 50%;
	border: 4rpx solid #ddd;
	line-height: 30rpx;
	background: $uni-price-color;
}
</style>
