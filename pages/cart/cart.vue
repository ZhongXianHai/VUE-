<template>
	<view class="cart">
		<!-- 头部导航 -->
		<headone class="head">
			<view slot="centcont">购物车</view>
			<!-- #ifdef  H5 || APP-PLUS -->
			<image slot="rightcont" :src="$changeImg(deleico)" mode="aspectFill" @click="deleshop"></image>
			<!-- #endif -->
		</headone>
		<view class="contbox" :style="{'top':topheight+'px','height':'calc(100vh - '+topheight+'px - '+domheight+'px )'}">
			<!-- 自定义滚动区域 -->
			<scrollone :loadtopstat="loadtopstat" @scrolltolower="scrolltolower" @refresherrefresh="refresherrefresh">
					<!-- 商品成员 -->
					<modtyone :cartdata="cartdata" @select="select" @goshop="goshop" @jianbut="jianbut" @addbut="addbut"></modtyone>
					<!-- 无商品展示 -->
					<textone v-show="cartdata.length<1"></textone>
					<!-- 底部导航 -->
					<domtwo></domtwo>
			</scrollone>
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
	</view>
</template>

<script>
	import { GetUserCart,UpUseCart,UpAllData,DeleAllData } from '../../work/cart.js'
	import headone from '../../components/head/headone/headone.vue'
	import headthree from '../../components/head/headthree/headthree.vue'
	import scrollone from "../../components/scroll/scrollone/scrollone.vue"
	import textone from '../../components/text/textone/textone.vue'
	import modtyone from '../../components/modty/modtyone/modtyone.vue'
	import domtwo from '../../components/dom/domtwo/domtwo.vue'
	export default {
		name:"cart",
		data() {
			return {
				payico:'/uploads/ico/ico220218121441.png',
				headico:'/uploads/ico/ico220216028662.png',
				deleico:'/uploads/ico/ico220218116208.png',
				resum:0,//当前刷新数
				loginsum:1,//总刷新数
				restat:false,//刷新事件，手动刷新true，系统加载false
				topheight:45,//滚动窗体距离头部值
				domheight:50,//滚动窗体距离底部值
				selectstat:false,//全选
				zonjimuch:0.0,//总计价格
				loadtopstat:false,//下拉状态
				pagestat:1,//当前页数
				pageend:1,//最后页数
				cartdata:[],
				cartids:[],
				time:null,
				deleids:[],
			}
		},
		components:{
			headone,
			headthree,
			scrollone,
			textone,
			modtyone,
			domtwo
		},
		onLoad(option){
			//验证用户是否登录
			uni.getStorage({
			    key: 'usedata',
			    success: function (res) {
					if(!res.data){
						//跳转登录页面
						uni.navigateTo({
							 url:  '/pages/signin/signin'
						})
					}
			    }
			});
		},
		//组件创建完毕执行
		created(){
			/* #ifdef  MP-WEIXIN */
			this.topheight = uni.getSystemInfoSync().statusBarHeight+40;//顶部距离
			/* #endif */
			this.getusecartdata();//获取购物车商品
		},
		methods: {
			//获取购物车数据
			getusecartdata(){
				GetUserCart(this.pagestat,6).then(res=>{
					if(res.status){
						this.cartdata = this.cartdata.concat(res.data.data);//合并俩数组
						this.pagestat = res.data.current_page;
						this.pageend = res.data.last_page;
						this.cartids = [];
						for(let i=0;i<this.cartdata.length;i++){
							this.cartids.push(this.cartdata[i].id);
						}
						console.log(this.cartdata);
					}else{
						uni.showToast({
							icon:'none',
						    title: res.message,
							position:'bottom',
						    duration: 1000
						});
					}
					this.updata();
				})
			},
			//删除购物车商品
			deleshop(str){
				uni.showModal({
				    title: '确定删除选中商品？',
				    success:(res)=>{
				        if (res.confirm) {
							this.deleids = [];
							for(let i=0;i<this.cartdata.length;i++){
								if(this.cartdata[i].stat){
									this.deleids.push(this.cartdata[i].id);
								};
							}
							this.deleallshop();//删除商品
				        }
				    }
				});
			},
			//删除选中商品
			deleallshop(){
				DeleAllData(this.deleids).then(res=>{
					if(res.status){
						this.pagestat = 1;
						this.resum = 0;
						this.cartdata = [];
						this.getusecartdata();//获取购物车商品
						uni.showToast({
							icon:'none',
						    title: '删除成功',
							position:'bottom',
						    duration: 2000
						});
					}else{
						console.log(res.message);
					}
				})
			},
			//去下单事件
			tabarevent(str){
				let statsum = 0;
				let nopaysum = 0;
				for(let i=0;i<this.cartdata.length;i++){
					if(this.cartdata[i].stat){
						statsum += 1;
						if(this.cartdata[i].shopstat){
							if(this.cartdata[i].skustat){
								if(this.cartdata[i].stock < 1){
									nopaysum += 1;
								}
							}else{
								nopaysum += 1;
							}
						}else{
							nopaysum += 1;
						}
					};
				}
				if(!statsum){
					uni.showToast({
						icon:'none',
					    title: '请勾选要购买的商品',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(nopaysum){
					uni.showToast({
						icon:'none',
					    title: '存在无库存或已下架的商品',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				//去下单
				uni.navigateTo({
					url: '/pages/payshop/payshop'
				})
			},
			//接收到来自底部导航的全选事件
			tabarselect(str){
				let stat = this.selectstat?0:1;
				this.selectstat = !this.selectstat;
				//更新购物车数据
				clearTimeout(this.time);//清理之前
				this.time = setTimeout(() => {
					UpAllData(this.cartids,{'stat':stat}).then(res=>{
						if(res.status){
							for(let i=0;i<this.cartdata.length;i++){
								this.cartdata[i].stat = stat;
							}
							this.shopzonji();
						}else{
							uni.showToast({
								icon:'none',
							    title: '已经全选好了',
								position:'bottom',
							    duration: 2000
							});
						}
					})
				}, 500)
			},
			//收到导航条发出的触底事件
			scrolltolower(){
				//还在加载
				if(this.loaddomstat){
					return false;
				}
				//已是最后一页
				if(this.pagestat >= this.pageend){
					return false;
				}
				this.resum = 0;
				this.loaddomstat = true; 
				this.pagestat = this.pagestat+1;
				uni.showLoading({
				    title: '加载中',
				});
				this.getusecartdata();//加载购物车商品
			},
			//收到导航条下拉刷新事件
			refresherrefresh(str){
				//用户手动刷新
				this.pagestat = 1;
				this.resum = 0;
				this.cartdata = [];
				this.restat = true;
				this.loadtopstat = true;//开启加载
				this.getusecartdata();//获取购物车商品
			},
			//加载成功
			updata(){
				this.resum += 1;//记录加载成功值
				//加载进度完成
				if(this.resum == this.loginsum){
					if(this.restat){//属于用户刷新
						this.restat = false;
						this.loadtopstat = false;//关闭加载
					}else{
						this.loaddomstat = false;
						setTimeout(function(){
							uni.hideLoading();
						},1000)
					}
				}
				this.shopzonji();
			},
			//接收到来自商品的选中事件
			select(str){
				let cartid = this.cartdata[str.index].id;
				let stat = this.cartdata[str.index].stat?0:1;
				this.cartdata[str.index].stat = stat;
				//更新购物车数据
				clearTimeout(this.time);//清理之前
				this.time = setTimeout(() => {
					UpUseCart(cartid,{'stat':stat}).then(res=>{
						if(res.status){
							this.shopzonji();
						}
					})
				}, 500)
			},
			//接收到来自商品的加商品事件
			addbut(str){
				let cartid = this.cartdata[str.index].id;
				let shopnum = this.cartdata[str.index].shopnum;
				this.cartdata[str.index].shopnum = shopnum+1;
				//更新购物车数据
				clearTimeout(this.time);//清理之前
				this.time = setTimeout(() => {
					UpUseCart(cartid,{'shopnum':shopnum+1}).then(res=>{
						if(res.status){
							this.shopzonji();
						}else{
							uni.showToast({
								icon:'none',
							    title: '操作失败',
								position:'bottom',
							    duration: 2000
							});
						}
					})
				}, 500)
			},
			//接收到来自商品的减商品事件
			jianbut(str){
				let cartid = this.cartdata[str.index].id;
				let shopnum = this.cartdata[str.index].shopnum;
				this.cartdata[str.index].shopnum = shopnum-1;
				//更新购物车数据
				clearTimeout(this.time);//清理之前
				this.time = setTimeout(() => {
					UpUseCart(cartid,{'shopnum':shopnum-1}).then(res=>{
						this.shopzonji();
						if(!res.status){
							uni.showToast({
								icon:'none',
							    title: '操作失败',
								position:'bottom',
							    duration: 2000
							});
						}
					})
				},500)
			},
			//接收到来自商品的去商品详情页
			goshop(str){
				let shopid = this.cartdata[str.index].shopid;
				uni.navigateTo({
					url: '/pages/shop/shop?id='+shopid
				})
			},
			//计算选中商品总价格
			shopzonji(){
				let money = 0;
				for(let i=0;i<this.cartdata.length;i++){
					if(this.cartdata[i].stat){
						money += this.cartdata[i].shopnum*this.cartdata[i].price;
					}
				}
				this.zonjimuch = money.toFixed(2);
			}
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
	left: 0rpx;
	width: 100%;
	overflow: hidden;
}
.dombox{
	position: fixed;
	left: 0rpx;
	bottom: 100rpx;
	height: 100rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 4rpx #999;
}
.select{
	height: 40rpx;
	padding: 30rpx;
	font-size: $uni-text-font;
	color: #333;
	display: flex;
}
.select p{
	width: 36rpx;
	height: 36rpx;
	overflow: hidden;
	border: 2rpx solid #999;
	border-radius: 50%;
}
.select p.yes{
	background:url(../../static/img/select.png) no-repeat;
	background-size: 36rpx 36rpx;
}
.select span{
	padding-left: 10rpx;
}
.price{
	flex: 1;
	text-align: center;
}
.price span{
	font-size: $uni-title-font;
	font-weight: 600;
	color: $uni-price-color;
}
.but{
	width: 200rpx;
	height: 40rpx;
	padding: 30rpx;
	color: #ffffff;
	background: $uni-color-color;
	display: flex;
	justify-content: center;
	align-items: center;
}
.but .but-image{
	width: 32rpx;
	height: 32rpx;
	margin-bottom: 4rpx;
}
</style>