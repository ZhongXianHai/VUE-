<!-- 商品详情轮播图1 -->
<template>
	<view class="bannertwo" :style="{'height': appwidth+'px'}" @touchstart="offacti" @touchend="onacti">
		<view class="banner-top" v-show="actistat"><image :src="$actiImg(shoptype)" mode="scaleToFill"></image></view>
		<swiper  class="swiper" interval="5000" duration="500" indicator-dots="true" indicator-color="#eee" indicator-active-color="#666" indicator-opacity="0.5" circular autoplay>
			<swiper-item  v-for="(item,index) in banner" :key="index">
				<image class="img"  :src="$changeImg(item)" mode="scaleToFill" @click="previewImg(index)"></image>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		name:"bannertwo",
		data() {
			return {
				appwidth:0,//显示器宽
				actistat:true,
				time:null,
			}
		},
		props:{
			banner:{
				type:Array,
				default:() => {},
			},
			shoptype:{
				type:Number,
				default:0,
			}
		},
		//组件创建完毕执行
		created(){
			this.appwidth = uni.getSystemInfoSync().screenWidth;//设备总宽
		},
		methods: {
			offacti(){
				this.actistat = false;
				if(this.time){
					 clearTimeout(this.time);
				}
			},
			onacti(){
				this.time = setTimeout((res) => {
					this.actistat = true;
				},3000);
			},
			// 预览图片多张
			previewImg(index) {
				let imagedata = [];
				for (let i = 0; i < this.banner.length; i++) {
					imagedata.push(uni.http+this.banner[i]);
				}
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

<style scoped>
.bannertwo{
	width: 100%;
	position: relative;
}
.banner-top{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
	z-index: 10;
}
.swiper{
	width: 100%;
	height: 100%;
}
</style>
