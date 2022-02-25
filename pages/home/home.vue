<template>
	<view class="home">
		<headsix :usedata="usedata" @headfun="headfun"></headsix>
		<boxone bk="#fff" :wh="88" :mg="3" :pd="3" :br="10">
			<boxone :ds="1" :ju="1">
				<view class="box-title">我的订单</view>
				<boxone :ds="1" class="box-text" @click.native="quanbu">
					<image :src="$changeImg(icoone)"></image>
					<p>全部</p>
				</boxone>
			</boxone>
			<boxone :ds="1" :ju="1" class="orderlist">
				<imgtwo v-for="(item,index) in icodata" :key="index" :data="item" :sum="icosum[index]" @click.native="ordbut(index)"></imgtwo>
			</boxone>
		</boxone>
		<boxone bk="#fff" :wh="88" :mg="3" :pd="3" :br="10">
			<view class="box-title">常用功能</view>
			<boxone :ds="1" :ju="1" class="toollist">
				<imgthree v-for="(item,index) in funicoone" :data="item" :key="index" @click.native="icoonebut(index)" class="toollist-but"></imgthree>
			</boxone>
			<boxone :ds="1" :ju="1" class="toollist">
				<imgthree v-for="(item,index) in funicotwo" :data="item" :key="index" @click.native="icotwobut(index)" class="toollist-but"></imgthree>
			</boxone>
		</boxone>
		<boxone :wh="94" :mg="3" :br="10" class="dombox">
			<image :src="$changeImg(dombanner)" mode="widthFix"></image>
		</boxone>
	</view>
</template>

<script>
	import { GetOrderStat } from '../../work/order.js'
	import { GetUsertitle } from '../../work/user.js'
	import headsix from '../../components/head/headsix/headsix.vue'
	import boxone from "../../components/box/boxone/boxone.vue"
	import imgtwo from "../../components/img/imgtwo/imgtwo.vue"
	import imgthree from "../../components/img/imgthree/imgthree.vue"
	export default {
		name:"home",
		data() {
			return {
				usedata:{
					'id':0,
					'gender':0,
					'name':"点击登录",
					'tuishou':0,
					'headimg':"/uploads/ico/ico220106093974.jpg",//默认头像
				},
				icoone:'/uploads/ico/ico220214059125.png',//楼层箭头图标
				usestat:false,//用户登录状态
				dombanner:'/uploads/banner/banner220215054549.jpg',//底部推广素材
				icosum:[0,0,0,0,0],
				icodata:[{//订单状态图标
					'name':'待付款',
					'image':'/uploads/ico/ico220215118936.png',
					'sum':0,
					'page':'',
				},{
					'name':'待发货',
					'image':'/uploads/ico/ico220215119876.png',
					'sum':0,
					'page':'',
				},{
					'name':'待收货',
					'image':'/uploads/ico/ico220215116984.png',
					'sum':0,
					'page':'',
				},{
					'name':'待评价',
					'image':'/uploads/ico/ico220215110208.png',
					'sum':0,
					'page':'',
				},{
					'name':'售后中',
					'image':'/uploads/ico/ico220215115995.png',
					'sum':0,
					'page':'',
				}],
				funicoone:[{
					'name':'我的钱包',
					'image':'/uploads/ico/ico220217016836.png',
					'page':'',
				},{
					'name':'推广中心',
					'image':'/uploads/ico/ico220217012533.png',
					'page':'',
				},{
					'name':'浏览足迹',
					'image':'/uploads/ico/ico220215036786.png',
					'page':'',
				},{
					'name':'地址管理',
					'image':'/uploads/ico/ico220215034930.png',
					'page':'',
				}],
				funicotwo:[{
					'name':'发票信息',
					'image':'/uploads/ico/ico220215038041.png',
					'page':'',
				},{
					'name':'我的评价',
					'image':'/uploads/ico/ico220217017863.png',
					'page':'',
				},{
					'name':'联系客服',
					'image':'/uploads/ico/ico220217015954.png',
					'page':'',
				},{
					'name':'个人设置',
					'image':'/uploads/ico/ico220215033513.png',
					'page':'',
				}]
			}
		},
		onLoad() {
			//验证用户是否登录
			uni.getStorage({
			    key: 'usedata',
			    success: (res)=>{
					if(res.data){
						this.usestat = res.data;
						this.getloginuser();//获取用户信息
					}else{
						this.usestat = false;
					}
			    }
			});
			this.getordersum();//获取用户订单信息
		},
		components:{
			headsix,
			boxone,
			imgtwo,
			imgthree
		},
		methods: {
			//获取登录的用户信息
			getloginuser(){
				GetUsertitle().then(res=>{
					this.usedata = res.data; 
				})
			},
			//获取未读的订单数量
			getordersum(){
				GetOrderStat().then(res=>{
					let ordersum = [0,0,0,0,0];
					for(let i=0;i<res.data.length;i++){
						if(i<4){
							ordersum[i] = res.data[i];
						}
						if(i>4){
							ordersum[4] += res.data[i];
						}
					}
					this.icosum = ordersum;
				})
			},
			//头部点击
			headfun(){
				if(this.usestat){
					console.log("个人信息");
				}else{
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			},
			//全部订单
			quanbu(){
				if(this.usestat){
					//跳转页面
					uni.navigateTo({
						
					})
				}else{
					//跳转登录
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			},
			// 订单状态点击
			ordbut(res){
				if(this.usestat){
					//跳转页面
					uni.navigateTo({
						 url:  this.icodata[res].page
					})
				}else{
					//跳转登录
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			},
			//图标点击
			icoonebut(res){
				if(this.usestat){
					//跳转页面
					uni.navigateTo({
						 url: this.funicoone[res].page
					})
				}else{
					//跳转登录
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			},
			//图标点击
			icotwobut(res){
				if(this.usestat){
					//跳转页面
					uni.navigateTo({
						 url:  this.funicotwo[res].page
					})
				}else{
					//跳转登录
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
.box-title{
	line-height: 60rpx;
	font-size: $uni-name-font;
}
//查看全部按钮
.box-text{
	height: 60rpx;
	color: #999;
	line-height: 60rpx;
	font-size: $uni-span-font;
	flex-direction: row-reverse;
}
.box-text image{
	width: 30rpx;
	height: 30rpx;
	margin-top: 16rpx;
	margin-left: 5rpx;
}
//订单状态
.orderlist{
	padding: 16rpx 0rpx 6rpx;
}
//工具栏目
.toollist{
	margin: 20rpx 0rpx;
}
.toollist-but{
	width: 15%;
}
.dombox{
	height: 300rpx;
	overflow: hidden;
}
</style>
