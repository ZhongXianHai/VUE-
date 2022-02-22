<!-- 导航1 -->
<template>
	<view class="navigone">
		<view class="navigbox" v-for="(item,index) in navigdata" :key="index" @click="navigbut(index)">
			<view class="navigimg">
				<image :src="$changeImg(item.img)" mode="widthFix"></image>
			</view>
			<view class="navigtext">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"navigone",
		data() {
			return {
			}
		},
		props:{
			navigdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			navigbut(i){
				this.$emit('navigbut',{
					'index':i,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.navigone{
	width:94%;
	margin: 10px 3%;
	display: flex;
	flex-wrap: wrap;
}
.navigbox{
	width: 16%;
	padding: 5px 2%;
	border-radius: 5px;
	background: #fff;
}
.navigimg{
	width: 80%;
	margin: 10%;
}
.navigtext{
	width: 100%;
	margin-top: -6px;
	font-size: $uni-text-font;
	color: #555;
	text-align: center;
}
</style>
