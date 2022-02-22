<!-- 自定义头部2 首页 -->
<template>
	<view class="headtwo">
		<slot></slot>
	</view>
</template>
<script>
	export default {
		name:"headtwo",
		data() {
			return {
			}
		},
		//组件创建完毕执行
		created(){
		}
	}
</script>

<style lang="scss" scoped>
.headtwo{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
