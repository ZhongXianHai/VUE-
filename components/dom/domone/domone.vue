<!-- 底部备案样式1 -->
<template>
	<view class="domone">
		<image class="ico" src="../../../static/img/shiming.png">
		<p>备案号 粤ICP-51255</p>
	</view>
</template>

<script>
	export default {
		name:"domone",
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.domone{
	height: 120rpx;
	font-size: $uni-text-font;
	color: #777;
	display: flex;
	justify-content: center;
	align-items: center;
}
.domone .ico{
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
}
</style>
