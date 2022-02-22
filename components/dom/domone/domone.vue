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
	height: 60px;
	font-size: $uni-name-font;
	color: #999;
	display: flex;
	justify-content: center;
	align-items: center;
}
.domone .ico{
	width: 15px;
	height: 15px;
	margin-right: 5px;
}
</style>
