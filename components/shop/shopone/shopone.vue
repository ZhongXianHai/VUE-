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
				<span class="newprice">￥{{ item.price }}</span>
				<span class="oldprice">￥{{ item.oldprice }}</span>
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
	margin: 0px 3% 10px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.shopbox{
	width: 48%;
	margin-bottom: 10px;
	background: #fff;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0px 0px 2px #999;
}
.shopimg{
	width: 100%;
	position: relative;
}
.topimg{
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: 1;
}
.shoptitle{
	height: 30px;
	line-height: 30px;
	overflow: hidden;
	font-size: $uni-name-font;
	padding: 0px 10px;
}
.shopprice{
	padding: 5px 10px 15px;
	display: flex;
	align-items: center;
	position: relative;
}
.shopprice span.newprice{
	color: red;
}
.shopprice span.oldprice{
	margin-left: 2px;
	font-size: 10px;
	text-decoration:line-through;
	color: #999;
}
.shopprice .addcart{
	position: absolute;
	top: 0px;
	right: 15px;
	width: 24px;
	height: 24px;
}
</style>
