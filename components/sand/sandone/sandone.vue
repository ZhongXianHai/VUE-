<!-- 加载遮幕 -->
<template>
	<view class="sandone"></view>
</template>
<script>
	export default {
		name:"sandone",
		data() {
			return {
				
			}
		},
		props:{
			usedata:{
				type:Object,
				default:() => {},
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.sandone{
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 100;
}
</style>
