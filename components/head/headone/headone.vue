<!-- 自定义头部1 -->
<template>
	<view class="headone" :style="{'padding-top': topheight +'px'}">
		<view class="box"><slot name="leftcont"></slot></view>
		<view class="cont"><slot name="centcont"></slot></view>
		<view class="box"><slot name="rightcont"></slot></view>
	</view>
</template>
<script>
	export default {
		name:"headone",
		data() {
			return {
				topheight:0,
			};
		},
		//组件创建完毕执行
		created(){
			this.topheight = uni.getSystemInfoSync().statusBarHeight+5;//顶部距离
		},
	}
</script>
<style lang="scss" scoped>
.headone{
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 10;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* #ifdef  H5 || APP-PLUS */
	height: 40px;
	/* #endif */
	/* #ifdef  MP-WEIXIN */
	height: 35px;
	/* #endif */
}
.cont{
	max-width: 50%;
	height: 30px;
	overflow: hidden;
}
.box{
	width: 20px;
	height: 20px;
	/* #ifdef  H5 || APP-PLUS */
	padding:10px;
	/* #endif */
	/* #ifdef  MP-WEIXIN */
	padding:5px;
	/* #endif */
}
</style>
