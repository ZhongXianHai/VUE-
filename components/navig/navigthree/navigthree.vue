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
	margin: 10px 3%;
}
.img{
	width: 80%;
	margin: 0px 10%;
}
.name{
	height: 15px;
	margin-top: -10px;
	line-height: 15px;
	color: #333;
	font-size: $uni-span-font;
	text-align: center;
	overflow: hidden;
}
</style>
