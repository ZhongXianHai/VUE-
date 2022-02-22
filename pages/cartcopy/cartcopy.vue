<template>
	<view class="cartcopy">
		<!-- 头部导航 -->
		<headone class="head">
			<image slot="leftcont" :src="$changeImg(headico)" mode="aspectFill" @click="fanhui"></image>
			<view slot="centcont">购物车</view>
			<!-- #ifdef  H5 || APP-PLUS -->
			<image slot="rightcont" :src="$changeImg(deleico)" mode="aspectFill" @click="deleshop"></image>
			<!-- #endif -->
		</headone>
		<!-- 购物车商品 -->
		<view class="contbox" :style="{'top':topheight+'px','height':'calc(100vh - '+topheight+'px - '+domheight+'px )'}">
			<scrollone :loadtopstat="loadtopstat" @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh">
					<modtyone :cartdata="cartdata" @select="select" @specibut="specibut" @jianbut="jianbut" @addbut="addbut"></modtyone>
			</scrollone>
		</view>
		<!-- 总计导航 -->
		<headthree class="dombox">
			<view class="select" @click="tabarselect">
				<p :class="selectstat ? 'yes':''"></p>
				<span>全选</span>
			</view>
			<view class="price">
				总计：<span>￥{{ zonjimuch }}</span>
			</view>
			<view class="but" @click="tabarevent">
				<view>去结算</view>
				<image class="but-image" :src="$changeImg(payico)"></image>
			</view>
		</headthree>
	</view>
</template>

<script>
	import headone from '../../components/head/headone/headone.vue'
	import headthree from '../../components/head/headthree/headthree.vue'
	import scrollone from "../../components/scroll/scrollone/scrollone.vue"
	import modtyone from '../../components/modty/modtyone/modtyone.vue'
	export default {
		name:"cartcopy",
		onShow() {
			uni.hideTabBar();//隐藏底部导航
		},
		data() {
			return {
				payico:'/uploads/ico/ico220218121441.png',
				headico:'/uploads/ico/ico220216028662.png',
				deleico:'/uploads/ico/ico220218116208.png',
				topheight:45,//滚动窗体距离头部值
				domheight:50,//滚动窗体距离底部值
				widstat:true,//购物车操作模式 删除、完成
				selectstat:true,//全选
				zonjimuch:0.0,//总计价格
				loadtopstat:false,//下拉状态
				cartdata:[{//购物车数据
					id:1,
					shopnum:5,
					skuid:1,
					stat:1,
					shopdata:{
						name:'新疆香酥脆枣空心红枣小包装零食',
						headimg: require('../../static/img/shop.jpg'),
						type:require('../../static/img/type.png'),
						speci:'250g',
						price:'9.90',
						stock:'10',
						stat:'1',
					}
				},{
					id:1,
					shopnum:5,
					skuid:1,
					stat:0,
					shopdata:{
						name:'新疆香酥脆枣空心红枣小包装零食',
						headimg: require('../../static/img/shop.jpg'),
						type:require('../../static/img/type.png'),
						speci:'250g',
						price:'9.90',
						stock:'10',
						stat:'2',
					}
				}]
			}
		},
		components:{
			headone,
			headthree,
			scrollone,
			modtyone
		},
		//组件创建完毕执行
		created(){
			/* #ifdef  MP-WEIXIN */
			this.topheight = uni.getSystemInfoSync().statusBarHeight+40;//顶部距离
			/* #endif */
		},
		methods: {
			//删除购物车商品
			deleshop(str){
				console.log("删除购物车商品");
			},
			//去下单事件
			tabarevent(str){
				console.log("去下单");
			},
			//接收到头部组件的返回事件
			fanhui(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//接收到来自底部导航的全选事件
			tabarselect(str){
				this.selectstat = !this.selectstat;
				console.log("全选");
			},
			//收到导航条发出的触底事件
			scrolltolower(){
				if(this.loaddomstat){
					console.log("还在加载");
					return false;
				}
				this.loaddomstat = true; 
				console.log("开始加载");
				setTimeout(() => {
					console.log("加载完成");
				    this.loaddomstat = false;//关闭加载
				}, 3000)
			},
			//收到导航条下拉刷新事件
			refresherrefresh(str){
				console.log("开始加载");
				this.loadtopstat = true;//开启加载
				setTimeout(() => {
					console.log("加载完成");
				    this.loadtopstat = false;//关闭加载
				}, 3000)
			},
			//接收到来自商品的选中事件
			select(str){
				//更新购物车数据
				console.log(str);
			},
			//接收到来自商品的加商品事件
			addbut(str){
				//更新购物车数据
				console.log(str);
			},
			//接收到来自商品的减商品事件
			jianbut(str){
				//更新购物车数据
				console.log(str);
			},
			//接收到来自商品的选择规格事件
			specibut(str){
				//更新购物车数据
				console.log(str);
			},
			//计算选中商品总价格
		}
	}
</script>
<style lang="scss" scoped>
.head{
	background: $uni-color-color;
	color: #fff;
	font-size: $uni-title-font;
}
.contbox{
	position: fixed;
	left: 0px;
	width: 100%;
	overflow: hidden;
}
.dombox{
	position: fixed;
	left: 0px;
	bottom: 0px;
	height: 50px;
	background: #ffffff;
	box-shadow: 0px 0px 2px #999;
}
.select{
	height: 20px;
	padding: 15px;
	font-size: 12px;
	color: #333;
	display: flex;
}
.select p{
	width: 18px;
	height: 18px;
	border: 1px solid #eee;
	border-radius: 50%;
}
.select p.yes{
	background:url(../../static/img/select.png) no-repeat;
	background-size: 18px 18px;
}
.select span{
	padding-left: 5px;
}
.price{
	flex: 1;
	text-align: center;
}
.price span{
	color: red;
}
.but{
	width: 100px;
	height: 20px;
	padding: 15px;
	color: #ffffff;
	background: $uni-color-color;
	display: flex;
	justify-content: center;
	align-items: center;
}
.but .but-image{
	width: 16px;
	height: 16px;
	margin-bottom: 2px;
}
</style>