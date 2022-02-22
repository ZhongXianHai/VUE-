<template>
	<view class="headsix">
		<image :src="$changeImg(headbg)" mode="widthFix"></image>
		<view class="use">
			<image class="useimg" :src="$changeImg(usedata.headimg)"></image>
			<view class="usetitle" @click="headfun">
				<view class="use-name">{{usedata.name}}</view>
				<view class="use-type" v-show="usedata.tuishou">会员</view>
			</view>
		</view>
		<view class="usenav">
			<image :src="usedata.gender? $changeImg(nanshen) : $changeImg(nvsheng)"></image>
		</view>
	</view>
</template>
<script>
	export default {
		name:"headsix",
		data() {
			return {
				headbg:"/uploads/banner/banner220106092332.jpg",//背景图
				nanshen:"/uploads/ico/nan.jpg",
				nvsheng:"/uploads/ico/nv.jpg"
			}
		},
		props:{
			usedata:{
				type:Object,
				default:() => {},
			}
		},
		methods: {
			headfun(){
				this.$emit('headfun');
			},
		}
	}
</script>

<style lang="scss" scoped>
.headsix{
	width: 100%;
	min-height: 330rpx;
	position: relative;
}
.usenav{
	position: absolute;
	top: 76rpx;
	left: 50%;
	width: 46rpx;
	height: 46rpx;
	margin-left: 34rpx;
	border-radius: 50%;
	overflow: hidden;
	z-index: 10;
}
.use{
	position: absolute;
	top: 80rpx;
	left: 50%;
	width: 300rpx;
	height: 200rpx;
	margin-left: -150rpx;
	overflow: hidden;
}
.useimg{
	width: 130rpx;
	height: 130rpx;
	border-radius: 50%;
	margin: 0px 85rpx 10rpx;
	border: 2px solid #fff;
	background: #fff;
}
.usetitle{
	width: 100%;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.use-name{
	font-size: $uni-title-font;
	font-weight: 600;
	color: #333333;
}
.use-type{
	margin-left: 3px;
	padding: 2px;
	height: 15px;
	border-radius: 3px;
	font-size: $uni-span-font;
	background: $uni-color-color;
	color: #fff;
}
</style>
