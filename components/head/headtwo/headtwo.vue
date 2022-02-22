<!-- 自定义头部2 首页 -->
<template>
	<view class="headtwo" :style="{'padding-top': topheight +'px'}">
		<view class="left box"><slot name="leftcont"></slot></view>
		<view class="right box"><slot name="rightcont"></slot></view>
	</view>
</template>

<script>
	export default {
		name:"headtwo",
		data() {
			return {
				topheight:0,//距离顶部的高
			}
		},
		//组件创建完毕执行
		created(){
			this.topheight = uni.getSystemInfoSync().statusBarHeight+5;//顶部距离
		}
	}
</script>

<style lang="scss" scoped>
.headtwo{
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 10;
	width: 94%;
	padding: 0px 3%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.box{
	overflow: hidden;
}
.left{
	height: 40px;
	width: 90px;
}
.right{
	height: 30px;
	width: 65%;
}
</style>
