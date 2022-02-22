<!-- 自定义头部5 无用 -->

<template>
	<view class="headfive">
		<image class="img" :src="$changeImg(headico)" @click="fanhui"></image>
		<view class="cont">
			<image class="img" src="../../../static/img/fangdajing.png"></image>
			<view class="capsule-text">
				<swiper class="textbox" vertical="true" duration="500" interval="3000" circular="true" autoplay>
					<swiper-item  v-for="(item,index) in resou" :key="index">
						<view> {{item.name}} </view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- #ifndef MP-WEIXIN -->
		<image class="img" :src="$changeImg(kefuico)" @click="share"></image>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name:"headfive",
		data() {
			return {
				headico:'/uploads/ico/ico220218108174.png',
				kefuico:'/uploads/ico/ico220218109419.png',
				topheight:0,
			}
		},
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
.headfive{
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
