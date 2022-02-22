<!-- 导航2 -->
<template>
	<view class="navigtwo">
		<view  v-for="(item,index) in classdata" class="navigbox" :class="index == classindex? 'select':''" @click="classselect({index})">{{ item.name }}</view>
	</view>
</template>
<script>
	export default {
		name:"navigtwo",
		data() {
			return {
				
			}
		},
		props:{
			classindex:Number,//选中序号
			classdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			classselect(str){
				this.$emit('classselect',str)
			}
		}
	}
</script>

<style lang="scss" scoped>
.navigtwo{
	width: 100%;
}
.navigbox{
	margin: 10px 5px;
	height: 30px;
	border-radius:15px ;
	font-size:$uni-text-font;
	text-align: center;
	line-height: 30px;
}
.select{
	color: #fff;
	background: $uni-color-color;
}
</style>
