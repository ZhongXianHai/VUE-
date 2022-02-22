<!-- 首页轮播图1 -->
<template>
	<view class="bannerone">
		 <swiper class="swiper" interval="5000" duration="500" indicator-color="white" indicator-active-color="#666666" indicator-opacity="0.5" circular autoplay>
				<swiper-item  v-for="(item,index) in banner" :key="index">
					 <image class="swiperimg" :src="$changeImg(item.img)" @click="bannerbut(index)" mode="scaleToFill"></image>
				 </swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name:"bannerone",
		data() {
			return {
				
			}
		},
		props:{
			banner:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			bannerbut(i){
				this.$emit('bannerbut',{
					'index':i,
				});
			}
		}
	}
</script>

<style scoped>
.bannerone{
	width: 100%;
	height: 210px;
	overflow: hidden;
}
.swiper{
	width: 100%;
	height: 100%;
}
.swiperimg{
	width: 100%;
	height: 100%;
}
</style>
