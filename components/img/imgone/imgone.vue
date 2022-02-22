<!-- 竖排图文，详情图片 -->
<template>
	<view class="imgone">
		<image v-for="(item,index) in imgdata" :key="index" class="xqimg" :src="$changeImg(item)" mode="widthFix" @click="previewImg(index)"></image>
	</view>
</template>
<script>
	export default {
		name:"imgone",
		data() {
			return {
			}
		},
		props:{
			imgdata:null,
		},
		methods: {
			// 预览图片多张
			previewImg(index) {
				let imagedata = [];
				for (let i = 0; i < this.imgdata.length; i++) {
					imagedata.push(uni.http + this.imgdata[i]);
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

<style lang="scss" scoped>
.imgone{
	width: 100%;
	background: #fff;
	padding-bottom: 10px;
	line-height: 0px;
}
.xqimg{
	width: 98%;
	margin-top: -1px;
}
</style>
