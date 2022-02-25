<!-- 导航图标 -->
<template>
	<view class="imgthree" >
		<view class="icobox">
			<image :src="$changeImg(data.image)" mode="widthFix"></image>
			<view class="icobox-name">{{ data.name }}</view>
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
			data:{
				type:Object,
				default:() => [],
			}
		}
	}
</script>

<style lang="scss" scoped>
.imgthree{
	text-align: center;
}
.imgthree:active{
	background: #eee;
}
.imgthree image{
	width: 70%;
	margin: 0rpx 15%;
	vertical-align: middle;
	line-height: 0rpx;
}
.imgthree .icobox-name{
	font-size: $uni-text-font;
	color: #333;
	line-height: 40rpx;
}
</style>
