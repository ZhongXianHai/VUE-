<!-- 回到顶部 -->
<template>
	<view class="huitopone" @click="gotop">
		<view class="box bg"></view>
		<image class="box" src="../../../static/img/gotop.png"></image>
	</view>
</template>

<script>
	export default {
		name:"huitopone",
		data() {
			return {	
			}
		},
		methods: {
			gotop(){
				this.$emit('gotop');
			}
		}
	}
</script>

<style scoped>
.huitopone{
	position: fixed;
	bottom: 100px;
	right: 2%;
	z-index: 50;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 0px 0px 3px #666;
}
.box{
	position: absolute;
	left: 0px;
	top: 0px;
	width:100%;
	height: 100%;
}
.bg{
	background: #fff;
	opacity: 0.9;
}
</style>
