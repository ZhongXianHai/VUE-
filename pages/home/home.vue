<template>
	<view class="home">
		<headsix :usedata="usedata" @headfun="headfun"></headsix>
		<boxone title="我的订单">
			<view slot="right" class="box-right-one">
				<p>全部</p>
				<image class="box-right-img" :src="$changeImg(icoone)"></image>
			</view>
			<imgtwo :icodata="icodata" :icodatasum="icodatasum" @icobut="icobut"></imgtwo>
		</boxone>
		<boxone title="常用功能">
			<imgthree :icodata="funico"></imgthree>
		</boxone>
		<view class="dombox">
			<image :src="$changeImg(dombanner)" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
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
				dombanner:'/uploads/banner/banner220215054549.jpg',//底部推广素材
				icodata:[{//订单状态图标
					'name':'待付款',
					'image':'/uploads/ico/ico220215118936.png',
				},{
					'name':'待发货',
					'image':'/uploads/ico/ico220215119876.png',
				},{
					'name':'待收货',
					'image':'/uploads/ico/ico220215116984.png',
				},{
					'name':'待评价',
					'image':'/uploads/ico/ico220215110208.png',
				},{
					'name':'售后中',
					'image':'/uploads/ico/ico220215115995.png',
				}],
				icodatasum:[1,1,1,1,1],//订单状态数数组
				funico:[{
					'name':'我的钱包',
					'image':'/uploads/ico/ico220217016836.png',
				},{
					'name':'推广中心',
					'image':'/uploads/ico/ico220217012533.png',
				},{
					'name':'浏览足迹',
					'image':'/uploads/ico/ico220215036786.png',
				},{
					'name':'地址管理',
					'image':'/uploads/ico/ico220215034930.png',
				},{
					'name':'发票信息',
					'image':'/uploads/ico/ico220215038041.png',
				},{
					'name':'我的评价',
					'image':'/uploads/ico/ico220217017863.png',
				},{
					'name':'联系客服',
					'image':'/uploads/ico/ico220217015954.png',
				},{
					'name':'个人设置',
					'image':'/uploads/ico/ico220215033513.png',
				}]
			}
		},
		onLoad() {
			uni.getStorage({//获取缓存信息
				key: 'usedata',
				success:(res)=>{
					this.usedata = res.data; 
				}
			});
		},
		components:{
			headsix,
			boxone,
			imgtwo,
			imgthree
		},
		methods: {
			//头部点击
			headfun(){
				if(this.usedata.id){
					console.log("个人信息");
				}else{
					uni.navigateTo({
						url: '/pages/signin/signin',
					})
				}
			},
			// 订单状态点击
			icobut(res){
				
				console.log(res);
			}
		}
	}
</script>
<style lang="scss" scoped>
//查看全部按钮
.box-right-one{
	color: #999;
	font-size: $uni-span-font;
	display: flex;
	align-items: center;
}
.box-right-img{
	width: 10px;
	height: 10px;
	margin-left: 2px;
}
.dombox{
	width: 94%;
	height: 300rpx;
	margin:15px 3%;
	border-radius: 20rpx;
	overflow: hidden;
}
</style>
