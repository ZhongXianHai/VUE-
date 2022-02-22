<!-- 导航图标 -->
<template>
	<view class="imgthree">
		<view class="contbox" v-for="(item,index) in icodata" @key="index">
			<view class="icobox">
				<image :src="$changeImg(item.image)" mode="widthFix"></image>
				<view class="icobox-name">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"imgthree",
		data() {
			return {
			}
		},
		props:{
			icodata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.imgthree{
	width: 100%;
	display: flex;
	margin-top: 20rpx;
	flex-wrap: wrap;
}
.contbox{
	width: 19%;
	margin: 20rpx 3%;
	position: relative;
	text-align: center;
}
.contbox:active{
	background: #eee;
}
.contbox image{
	width: 60rpx;
	height: 60rpx;
	vertical-align: middle;
}
.contbox .icobox-name{
	font-size: $uni-text-font;
	color: #333;
	line-height: 40rpx;
}
.contbox .icosum{
	position: absolute;
	left:60rpx;
	top: -10rpx;
	width: 30rpx;
	height: 30rpx;
	color: #fff;
	font-size: $uni-span-font;
	border-radius: 50%;
	border: 4rpx solid #ddd;
	line-height: 30rpx;
	text-indent: 8rpx;
	background: $uni-price-color;
}
</style>
