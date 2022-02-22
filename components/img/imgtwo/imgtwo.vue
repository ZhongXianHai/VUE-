<!-- 导航图标，带数字 -->
<template>
	<view class="imgtwo">
		<view class="contbox" v-for="(item,index) in icodata" @key="index" @click="icobut(index)">
			<view class="icobox">
				<image :src="$changeImg(item.image)" mode="widthFix"></image>
				<view class="icobox-name">{{ item.name }}</view>
			</view>
			<view class="icosum" v-show="icodatasum[index]">{{ icodatasum[index] }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"imgtwo",
		data() {
			return {
			}
		},
		props:{
			icodata:{
				type:Array,
				default:() => [],
			},
			icodatasum:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			icobut(i){
				this.$emit('icobut',{
					'index':i,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.imgtwo{
	width: 100%;
	display: flex;
	margin-top: 20rpx;
	justify-content: space-between;
}
.contbox{
	position: relative;
	text-align: center;
}
.contbox:active{
	background: #eee;
}
.contbox image{
	width: 60rpx;
	height: 60rpx;
	vertical-align: middle;
	line-height: 0rpx;
}
.contbox .icobox-name{
	font-size: $uni-text-font;
	color: #333;
	line-height: 30rpx;
}
.contbox .icosum{
	position: absolute;
	left:40rpx;
	top: -10rpx;
	width: 30rpx;
	height: 30rpx;
	color: #fff;
	font-size: $uni-span-font;
	border-radius: 50%;
	border: 4rpx solid #ddd;
	line-height: 30rpx;
	background: $uni-price-color;
}
</style>
