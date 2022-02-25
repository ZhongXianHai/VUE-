<!-- 导航3 -->
<template>
	<view class="navigthree">
		<view class="box" v-for="(item,index) in classdata" @click="classbut(index)">
			<image class="img" :src="$changeImg(item.image)"  mode="widthFix" @error="onerror($event,index)"></image>
			<view class="name">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navigthree",
		data() {
			return {
				
			}
		},
		props:{
			classdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			//图片加载失败
			onerror(e,index){
				this.classdata[index].image = require("../../../static/img/noimg.png");
			},
			classbut(str){
				this.$emit('classbut',{
					"index":str,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.navigthree{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.box{
	width: 27%;
	margin: 20rpx 3%;
}
.img{
	width: 80%;
	margin: 0rpx 10%;
}
.name{
	height: 30rpx;
	margin-top: -20rpx;
	line-height: 30rpx;
	color: #333;
	font-size: $uni-span-font;
	text-align: center;
	overflow: hidden;
}
</style>
