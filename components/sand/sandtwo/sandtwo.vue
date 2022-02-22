<!-- 上下内容遮幕 -->
<template>
	<view class="sandtwo">
		<view class="sandtwo-bg" :style="[{ opacity:option,background:back}]" @click="offbox"></view>
		<view class="sandtwo-cont">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name:"sandtwo",
		data() {
			return {
				
			}
		},
		props:{
			back:{
				type:String,
				default:"#000",
			},
			option:{
				type:Number,
				default:0.5,
			}
		},
		methods: {
			offbox(){//关闭此项
				console.log("aa");
				this.$emit('offbox');
			}
		}
	}
</script>

<style scoped>
.sandtwo{
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 100;
}
.sandtwo-bg{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
}
.sandtwo-cont{
	position: absolute;
	width: 100%;
	left: 0px;
	bottom: 0px;
}
</style>
