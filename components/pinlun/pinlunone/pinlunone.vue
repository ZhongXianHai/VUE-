<!-- 商品评论 -->
<template>
	<view class="pinlunone">
		<view v-for="(item,index) in pinlundata" :key="index">
			<view class="plhead">
				<image class="useimg" :src="$changeImg(usehead)"></image>
				<view class="usename">
					<p>{{ item.usename }}</p>
					<view class="name-date">{{ datefun(item.date) }}</view>
				</view>
			</view>
			<view class="pltext">{{ item.text }}</view>
			<image class="plimg" v-show="item.img" :src="$changeImg(item.img)" mode="widthFix" @click="previewImg(index)" @error="onerror($event,index)"></image>
		</view>
	</view>
</template>
<script>
	export default {
		name:"pinlunone",
		data() {
			return {
				noimg:"/uploads/ico/ico220224059062.png",//没有图片
				usehead:"/uploads/head/head.jpg",//，默认用户头像
			}
		},
		props:{
			pinlundata:{
				type:Array,
				default:()=>{},
			}
		},
		methods: {
			//图片加载失败
			onerror(e,i){
				if(this.pinlundata[i].img){
					this.pinlundata[i].img = this.noimg;
				}
			},
			//转化时间
			datefun(value){
				let date = new Date(value*1000);
				let year = date.getFullYear();
				let month = ("0" + (date.getMonth() + 1)).slice(-2);
				let sdate = ("0" + date.getDate()).slice(-2);
				let result = year + "-" + month + "-" + sdate;
				return result;
			},
			// 预览图片
			previewImg(index) {
				let imagedata = [];
				imagedata.push(uni.http + this.pinlundata[index].img);
				uni.previewImage({
					current: index,
					urls:imagedata,
					indicator: 'default',
					loop: true
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
.pinlunone{
	width: 100%;
}
.plhead{
	width: 100%;
	height: 100rpx;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
}
.useimg{
	width: 60rpx;
	height: 60rpx;
	border: 2rpx solid #ddd;
	border-radius: 50%;
	overflow: hidden;
}
.usename{
	flex: 1;
	overflow: hidden;
	padding-left: 20rpx;
}
.usename p{
	color: #333;
	height: 40rpx;
	overflow: hidden;
	font-size: $uni-name-font;
}
.name-date{
	color: #999;
	height: 30rpx;
	line-height: 30rpx;
	overflow: hidden;
	font-size: $uni-span-font;
}
.pltext{
	color: #333;
	width: 100%;
	margin: 10rpx 0rpx;
	font-size: $uni-name-font;
	line-height: 32rpx;
}
.plimg{
	width: 160rpx;
	height: 160rpx;
	overflow: hidden;
	margin: 10rpx 0rpx;
	border-radius:10rpx;
}
</style>
