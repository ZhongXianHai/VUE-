<!-- 商品区1 -->
<template>
	<view class="shopone">
		<view class="shopbox" v-for="(item,index) in shopdata" :key="index">
			<view class="shopimg" @click="seeshop(index)">
				<image :src="$changeImg(item.headimg)" @error="onerror($event,index)" mode="widthFix"></image>
				<image class="topimg" :src="$actiImg(item.type)" v-if="item.type"></image>
			</view>
			<view class="shoptitle">{{ item.name }}</view>
			<view class="shoplebie">
				<span></span>
			</view>
			<view class="shopprice">
				<view class="price">￥{{ item.price }}<strong>{{ item.oldprice }}</strong></view>
				<!-- <span class="newprice"></span><span class="oldprice">￥</span> -->
				<image class="addcart" src="../../../static/img/gouwuche-select.png" @click="addcart(index)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"shopone",
		data() {
			return {}
		},
		props:{
			shopdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			//图片加载失败
			onerror(e,index){
				this.shopdata[index].headimg = require("../../../static/img/noimg.png");
			},
			//点击图片
			seeshop(i){
				this.$emit('seeshop',{
					'index':i,
				});
			},
			//点击购物车按钮
			addcart(i){
				this.$emit('addcart',{
					'index':i,
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
.shopone{
	width: 94%;
	margin: 0rpx 3% 20rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.shopbox{
	width: 48%;
	margin-bottom: 20rpx;
	background: #fff;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0rpx 0rpx 4rpx #999;
}
.shopimg{
	width: 100%;
	position: relative;
}
.topimg{
	position: absolute;
	left: 0rpx;
	top: 0rpx;
	z-index: 1;
}
.shoptitle{
	height: 60rpx;
	line-height: 60rpx;
	overflow: hidden;
	font-size: $uni-name-font;
	padding: 0rpx 20rpx;
}
.shopprice{
	padding: 10rpx 20rpx 30rpx;
	display: flex;
	align-items: center;
	position: relative;
}
.shopprice .price{
	font-size: $uni-title-font;
	color: red;
}
.shopprice .price span{
	font-size: $uni-text-font;
}
.shopprice .price strong{
	font-weight: 400;
	margin-left: 10rpx;
	font-size: $uni-span-font;
	text-decoration:line-through;
	color: #999;
}
.shopprice .addcart{
	position: absolute;
	top: 0rpx;
	right: 30rpx;
	width: 48rpx;
	height: 48rpx;
}
</style>
