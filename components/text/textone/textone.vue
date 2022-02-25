<!-- 无内容展示 -->
<template>
	<view class="textone">
		<image :src="$changeImg(oncont)" mode="widthFix"></image>
	</view>
</template>
<script>
	export default {
		name:"textone",
		data() {
			return {
				oncont:'/uploads/ico/ico220225053776.png',
			}
		}
	}
</script>
<style lang="scss" scoped>
.textone{
	width: 500rpx;
	height: 500rpx;
	margin: 200rpx auto;
}
</style>
