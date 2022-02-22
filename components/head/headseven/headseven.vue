<!-- 自定义头部1 -->
<template>
	<view class="headseven" :style="{'padding-top': topheight +'px'}">
		<image class="img" :src="$changeImg(headico)" @click="fanhui"></image>
	</view>
</template>

<script>
	export default {
		name:"headseven",
		data() {
			return {
				headico:'/uploads/ico/ico220216028662.png',
				topheight:0,
			};
		},
		props:['title','icon'],
		created(){
			this.topheight = uni.getSystemInfoSync().statusBarHeight+5;//顶部距离
		},
		methods:{
			fanhui(){
				this.$emit('fanhui');
			}
		}
	}
</script>

<style lang="scss" scoped>
.headseven{
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 10;
	width: 100%;
	display: flex;
	/* #ifdef  H5 || APP-PLUS */
	justify-content: space-between;
	height: 40px;
	line-height: 40px;
	/* #endif */
	/* #ifdef  MP-WEIXIN */
	height: 35px;
	line-height: 30px;
	/* #endif */
}
.img{
	width: 20px;
	height: 20px;
	/* #ifdef  H5 || APP-PLUS */
	padding: 10px;
	/* #endif */
	/* #ifdef  MP-WEIXIN */
	padding:5px;
	/* #endif */
}
</style>
