<!-- 评论1 -->
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
			<image class="plimg" v-show="item.img" :style="{'width':imagewidth+'px','height':imagewidth+'px'}" :src="$changeImg(item.img)" mode="widthFix" @click="previewImg(index)"></image>
		</view>
	</view>
</template>
<script>
	export default {
		name:"pinlunone",
		data() {
			return {
				'usehead':'/uploads/head/head.jpg',//，默认用户头像
			}
		},
		props:{
			pinlundata:{
				type:Array,
				default:()=>[],
			},
			imagewidth:{
				type:Number,
				default:80,
			},
		},
		methods: {
			//转化时间
			datefun(value){
				var date = new Date(value*1000);
				var year = date.getFullYear();
				var month = ("0" + (date.getMonth() + 1)).slice(-2);
				var sdate = ("0" + date.getDate()).slice(-2);
				// var hour = ("0" + date.getHours()).slice(-2);
				// var minute = ("0" + date.getMinutes()).slice(-2);
				// var second = ("0" + date.getSeconds()).slice(-2);
				var result = year + "-" + month + "-" + sdate;
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
	height: 50px;
	margin-top: 20rpx;
	display: flex;
	align-items: center;
}
.useimg{
	width: 30px;
	height: 30px;
	border: 1px solid #ddd;
	border-radius: 50%;
	overflow: hidden;
}
.usename{
	flex: 1;
	overflow: hidden;
	padding-left: 10px;
}
.usename p{
	color: #333;
	height: 20px;
	overflow: hidden;
	font-size: $uni-name-font;
}
.name-date{
	color: #999;
	height: 15px;
	line-height: 15px;
	overflow: hidden;
	font-size: $uni-span-font;
}
.pltext{
	color: #333;
	width: 100%;
	margin: 10rpx 0rpx;
	font-size: $uni-name-font;
	line-height: 16px;
}
.plimg{
	margin: 5px 0px;
	border-radius: 5px;
}
</style>
