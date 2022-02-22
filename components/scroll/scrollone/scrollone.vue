<!-- 封装滚动条1 -->
<template>
	<view class="scrollone">
		<scroll-view class="scroll"
			:scroll-y="true"
			:scroll-top="scrolltop"
			:refresher-background="bgcolor"
			:refresher-triggered="loadtopstat"
			:refresher-enabled="scrollstat"
			:refresher-threshold="topnumber"
			:lower-threshold="bomnumber"
			@scroll="scroll"
			@scrolltolower="scrolltolower"
			@refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore"
			@refresherabort="refresherabort"
		>
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"scrollone",
		data() {
			return {
				scrollstat:true,//自定义下拉刷新状态
				topnumber:80,//下拉刷新触发距离
				bomnumber:100,//上滑底部触发距离
				bgcolor:"#eee",//背景样式
			}
		},
		props:{
			scrolltop:{//当前距离
				type:Number,
				default:0,
			},
			loadtopstat:{//加载状态
				type:Boolean,
				default:false,
			}
		},
		methods: {
			//发出触底事件
			scrolltolower(){
				this.$emit('scrolltolower');
			},
			//发出top值
			scroll(event){
				this.$emit('scroll',{
					"data":event.detail.scrollTop,
				})
			},
			//发出下拉刷新事件
			refresherrefresh(){
				if(this.loadtopstat){
					return false;
				}else{
					this.$emit('refresherrefresh');
				}
			},
			//下拉刷新被复位
			refresherrestore(){
				console.log("被复位");
			},
			//下拉刷新被中止
			refresherabort(){
				console.log("被中止");
			}
		}
	}
</script>

<style scoped>
.scrollone{
	width: 100%;
	height: 100%;
}
.scroll{
	width: 100%;
	height: 100%;
}
</style>
