<!-- 自定义头部四 搜索-->
<template>
	<view class="headfour" :style="{'padding-top': topheight +'px'}" @click="headbut">
		<image class="img" src="../../../static/img/fangdajing.png"></image>
		<view class="capsule-text">
			<swiper class="textbox" vertical="true" duration="500" interval="3000" circular="true" autoplay>
				<swiper-item  v-for="(item,index) in resou" :key="index">
					<view> {{item.name}} </view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name:"headfour",
		data() {
			return {
				topheight:0,//距离顶部的高
			}
		},
		props:{
			resou:{
				type:Array,
				default:() => [],
			}
		},
		//组件创建完毕执行
		created(){
			this.topheight = uni.getSystemInfoSync().statusBarHeight+5;//顶部距离
		},
		methods: {
			headbut(){
				this.$emit('headbut',null);
			}
		}
	}
</script>

<style lang="scss" scoped>
.headfour{
	position: fixed;
	top: 0px;
	left: 0px;
	z-index: 10;
	width: 96%;
	padding: 0px 2%;
	height: 35px;
	line-height: 35px;
	background: $uni-color-color;
}
.headfour .img{
	position: absolute;
	width: 20px;
	height: 20px;
	margin: 5px;
	z-index: 10;
}
.capsule-text{
	/* #ifdef  H5 || APP-PLUS */
	width: 100%;
	/* #endif */
	/* #ifdef  MP-WEIXIN */
	width: 60%;
	/* #endif */
	height:30px;
	font-size: $uni-name-font;
	color: #666;
	background: #fff;
	border-radius: 15px;
	overflow: hidden;
}
.textbox{
	width: 100%;
	height: 30px;
	line-height: 30px;
	text-indent: 30px;
}
</style>
