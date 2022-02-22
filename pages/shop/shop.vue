<template>
	<view class="shop">
		<!-- 头部导航 -->
		<headone class="head">
			<image slot="leftcont" class="img" :src="$changeImg(headico)" @click="fanhui"></image>
			<p slot="centcont">{{ shop.name }}</p>
			<!-- #ifdef  H5 || APP-PLUS -->
			<image slot="rightcont" class="img" :src="$changeImg(fenxico)" @click="fenxiang"></image>
			<!-- #endif -->
		</headone>
		<!-- 回到顶部 -->
		<huitopone v-if="headstat" @gotop="gotop"></huitopone>
		<!-- 滚动内容 -->
		<view class="shopbox" :style="{'top':topheight+'px','height':'calc(100vh - '+topheight+'px - '+domheight+'px )'}">
			<scrollone :scrolltop="scrolltop" :loadtopstat="loadtopstat" @refresherrefresh="refresherrefresh" @scroll="scroll">
				<!-- 商品主图 -->
				<bannertwo :banner="shop.zhuimg"></bannertwo>
				<!-- 商品价格 -->
				<boxone bk="#fff" :wh="88" :mg="3" :pd="3" :br="10">
					<view class="price">
						<view class="newprice">￥<span>{{ shop.price }}</span></view>
						<view class="oldprice">原价￥<span>{{ shop.oldprice }}</span></view>
					</view>
					<view class="name">{{ shop.name }}<span v-for="(item,index) in shop.label" :key="index" :style="{color: extract(item,'color'),background:'url('+extract(item,'image')+') no-repeat',border:extract(item,'bdstat')+'px solid'+ extract(item,'color'),'border-radius':extract(item,'bjstat')+'px',padding:extract(item,'bdstat')?'0px 1px':'1px 2px'}">{{ extract(item,"text") }}</span></view>
					<!-- <view class="butlist"> -->
					<boxone :ds="1" :ju="1">
						<view class="bux"><image class="img" :src="$changeImg(shoucico)"></image><p>浏览{{ sum(shop.seesum) }}</p></view>
						<view class="bux"><image class="img" :src="$changeImg(xiaosico)"></image><p>销量{{ sum(shop.salesum) }}</p></view>
						<view class="bux" @click="fenxiang"><image class="img" :src="$changeImg(fengxico)"></image><p>分享</p></view>
					</boxone>
					<!-- </view> -->
				</boxone>
				<!-- 商品参数 -->
				<boxone bk="#fff" :wh="88" :mg="3" :pd="3" :br="10">
					<!-- 数据一 -->
					<boxone class="guge" :ds="1" v-for="(item,y) in datatwo">
						<view class="guge-name">{{ item.name }}</view>
						<boxone class="guge-cont" :ds="1" :ju="1">
							<view class="guge-vale" @click="onetabar">{{ item.value }}</view>
							<image @click="onetabar" v-show="item.stat" class="guge-img" :src="$changeImg(youjico)"></image>
						</boxone>
					</boxone>
					<!-- 数据二 -->
					<boxone class="guge" :ds="1" :ju="1" v-show="skudata.length" @click="onetabar">
						<view class="skutext-img">
							<image v-for="(item,index) in skudata" class="skutextimg" :src="$changeImg(item.headimg)"></image>
						</view>
						<view class="skutext-val">共有{{ skudata.length }}种型号可选</view>
					</boxone>
					<!-- 数据三 -->
					<boxone class="guge" :ds="1" v-for="(item,index) in datafress" :key="index">
						<view class="guge-name">{{ item.name }}</view>
						<boxone class="guge-cont" :ds="1" :ju="1">
							<view class="guge-vale" @click="twotabar(index)">{{ item.value }}</view>
							<image v-show="item.stat" class="guge-img" :src="$changeImg(youjico)" @click="twotabar(index)"></image>
						</boxone>
					</boxone>
				</boxone>
				<!-- 商品评价 -->
				<boxone bk="#fff" :wh="88" :mg="3" :pd="3" :br="10" v-show="pinlundata.length">
					<view class="boxhead">
						<view class="boxhead-left">宝贝评价</view>
						<view class="boxhead-right" @click="boxbut()">
							<image src="../../static/img/yjtselect.png"></image>
							<p>查看全部</p>
						</view>
					</view>
					<!-- 评价内容 -->
					<pinlunone :pinlundata="pinlundata"></pinlunone>
				</boxone>
				<!-- 商品图文 -->
				<view class="imgone-title"><p></p>---- 图文详情 ----<p></p></view>
				<view class="imgone">
					<image v-for="(item,index) in shop.xqimg" :key="index" class="xqimg" :src="$changeImg(item)" mode="widthFix" @click="previewImg(index)"></image>
				</view>
			</scrollone>
		</view>
		<!-- 遮幕内容 -->
		<sandtwo @offbox="offbox" v-show="zhemustat">
			<!-- 选择sku -->
			<view class="payshop" v-show="contone">
				<tabarone @offbox="offbox">
					<boxone :wh="94" :pd="3" :ds="1">
						<view class="shopimg">
							<image :src="$changeImg(shop.headimg)"></image>
						</view>
						<view class="shoptext">
							<view class="shoptext-price"><span>￥</span>{{ skuprice }}</view>
							<view class="shoptext-stock">库存{{ skustock }}</view>
						</view>
					</boxone>
					<boxone :wh="94" :mg="3" class="skusroll" v-for="(item,index) in skuname" :key="index">
						<view class="skusroll-name">选择{{item.name}}</view>
						<boxone :ds="1":wp="1">
							<view class="sku-but" v-for="(title,value) in item['cont']" :key="value" @click="skubut(index,value)" :class="value == skuvalue[index] ? 'select':''">{{ title }}</view>
						</boxone>
					</boxone>
					<boxone :wh="94" :pd="3" class="skusroll">
						<view class="skusroll-name">选择数量</view>
						<boxone :ds="1"></boxone>
					</boxone>
					
					<boxone :wh="94" :pd="3" :ds="1">
						<view>加入购物车</view>
						<view>立即购买</view>
					</boxone>
				</tabarone>
			</view>
			<!-- 查看参数 -->
			<view class="shoptitle" v-show="conttwo">
				<tabartwo @offbox="offbox"></tabartwo>
			</view>
			<!-- 服务保障 -->
			<view class="apptitle" v-show="contthree">
				<tabartwo @offbox="offbox"></tabartwo>
			</view>
		</sandtwo>
		<!-- 底部导航 -->
		<headthree class="dombox">
			<view class="but" @click="gohome">
				<image class="img" :src="$changeImg(homeico)"></image>
				<p>首页</p>
			</view>
			<view class="but" @click="gochat">
				<image class="img" :src="$changeImg(kefuico)"></image>
				<p>客服</p>
			</view>
			<view class="but" @click="gocart">
				<image class="img" :src="$changeImg(cartico)"></image>
				<p>购物车</p>
			</view>
			<view class="paybut cart" @click="addcart">加购物车</view>
			<view class="paybut gopay" @click="gopay">立即购买</view>
		</headthree>
	</view>
</template>

<script>
	import { GetAloneData,UpShopSeesum } from "../../work/shop.js"
	import { GetPageData } from "../../work/evaluate.js"
	import { GetWholeData } from "../../work/sku.js"
	import { AddUseHost } from "../../work/seehost.js"
	import { AddUseCart } from "../../work/cart.js"
	import { GetSkuName } from "../../work/speci.js"
	import boxone from "../../components/box/boxone/boxone.vue"
	import sandtwo from "../../components/sand/sandtwo/sandtwo.vue"
	import tabarone from "../../components/tabar/tabarone/tabarone.vue"
	import tabartwo from "../../components/tabar/tabartwo/tabartwo.vue"
	import headone from "../../components/head/headone/headone.vue"
	import headthree from '../../components/head/headthree/headthree.vue'
	import scrollone from "../../components/scroll/scrollone/scrollone.vue"
	import huitopone from "../../components/huitop/huitopone/huitopone.vue"
	import bannertwo from "../../components/banner/bannertwo/bannertwo.vue"
	import pinlunone from "../../components/pinlun/pinlunone/pinlunone.vue"
	export default {
		name:"shop",
		data() {
			return {
				headico:'/uploads/ico/ico220216028662.png',
				fenxico:'/uploads/ico/ico220218109421.png',
				homeico:'/uploads/ico/ico220218105862.png',
				kefuico:'/uploads/ico/ico220218102742.png',
				cartico:'/uploads/ico/ico220218109340.png',
				youjico:'/uploads/ico/ico220214059125.png',
				headstat:false,//回到顶部显示隐藏
				topheight:45,//滚动窗体距离头部值
				domheight:50,//滚动窗体距离底部值
				scrolltop:0,//滚动条位置
				loadtopstat:false,//滚动条下拉加载状态
				id:0,//商品id
				shop:[],//商品数据
				skudata:[],//sku数据
				skuname:[],//规格名称
				skuvalue:[],//选中值
				skutext:'',//选中sku名称
				dataone:{},//楼层1数据
				datatwo:[{//楼层2数据
					'name':"选择",
					'value':'规格',
					'stat':1,
				}],
				datafress:[{//楼层3数据
					'name':"保障",
					'value':'正品保证 · 48小时快速退款',
					'stat':1,
				},{
					'name':"发货",
					'value':'广东省',
					'stat':0,
				},{
					'name':"参数",
					'value':'品牌 产地',
					'stat':1,
				}],
				pinlundata:[],//评论数据
				useseehost:[],//用户浏览记录
				// zhemustat:false,//遮幕开关
				// contone:false,//规格面板
				// conttwo:false,//参数面板
				// contthree:false,//保障面板
				zhemustat:true,//遮幕开关
				contone:true,//规格面板
				conttwo:false,//参数面板
				contthree:false,//保障面板
				skuprice:0.0,//规格选择价格
				skuid:0,//选择skuid
				skustock:999,//sku库存
				shoucico:'/uploads/ico/ico220217032461.png',
				xiaosico:'/uploads/ico/ico220217030743.png',
				fengxico:'/uploads/ico/ico220217036696.png',
			}
		},
		components:{
			boxone,
			sandtwo,
			tabarone,
			tabartwo,
			headthree,
			headone,
			scrollone,
			huitopone,
			bannertwo,
			pinlunone
		},
		onLoad(option){
			this.id = option.id;
			//获取用户浏览商品记录
			uni.getStorage({
			    key: 'useseehost',
			    success:(obj)=>{
					if(obj.data){
						this.useseehost = obj.data;//暂存用户浏览数据
					}else{
						this.useseehost = [];
					}
			    }
			});
			this.getshopdata();//提取商品数据
			this.getskuname();//获取商品skuname
			this.getshopsku();//获取商品sku数据
			this.getshopevaluate();//获取商品评论数据
			this.upshopdata();//更新商品浏览次数
			this.addusedata();//存入用户浏览记录
		},
		//组件创建完毕执行
		created(){
			/* #ifdef  MP-WEIXIN */
			this.topheight = uni.getSystemInfoSync().statusBarHeight+40;//顶部距离
			this.domheight = 0;//底部距离
			/* #endif */
		},
		//计算属性
		computed:{
			// newname(a,b){
			// 	console.log(a+'-'+b);
			// 	// return this.skuname[a].stat == b?'select':'';
			// }
		},
		methods: {
			//获取商品数据
			async getshopdata(){
				GetAloneData(this.id,'*').then(res =>{
					res.data['zhuimg'] = JSON.parse(res.data['zhuimg']);
					res.data['xqimg'] = JSON.parse(res.data['xqimg']);
					res.data['label'] = JSON.parse(res.data['label']);
					this.shop = res.data;
					console.log(this.shop);
				})
			},
			//获取商品sku数据
			async getshopsku(){
				GetWholeData(this.id).then(res =>{
					this.skudata = res.data;
					console.log(this.skudata);
				})
			},
			//获取商品sku名称
			async getskuname(){
				GetSkuName(this.id).then(res =>{
					if(res.status){
						if(res.data['text']){
							this.skuname = JSON.parse(res.data['text']);
							for(let i=0;i<this.skuname.length;i++){
								this.skuvalue.push(0);
								// this.skuname[i].stat = 0;
							}
							// console.log(this.skuname);
						}
					}
				})
			},
			//获取商品评论
			async getshopevaluate(){
				GetPageData(this.id,null,3).then(res =>{
					this.pinlundata = res.data.data;
				})
			},
			//更新商品浏览次数
			upshopdata(){
				UpShopSeesum(this.id).then(res=>{
					console.log('浏览次数'+res.message);
				})
			},
			//存入用户浏览记录
			addusedata(){
				if(this.useseehost.indexOf(this.id) < 0){
					const addtitle = {
						'shopid':this.id,
						'date':Math.round(new Date().getTime()/1000).toString()//时间
					}
					AddUseHost(addtitle).then(res=>{
						if(res.status){
							this.useseehost.push(this.id);//存入id
							uni.setStorageSync('useseehost', this.useseehost);//缓存用户浏览的商品数组
						}
					})
				}
			},
			//标签
			extract(a,b){
				if(b == "image"){
					return uni.http + uni.label[a][b];
				}
				return uni.label[a][b];
			},
			//归纳数量
			sum(value){
				const sumdata = String(value).split("");
				if(sumdata.length>4){
					return sumdata[0]+"万+"
				}else if(sumdata.length>3){
					return sumdata[0]+"千+"
				}else{
					return this.shop.salesum;
				}
			},
			//内容选择
			onetabar(){
				this.zhemustat = true;
				this.contone = true;//打开规格面板
			},
			//内容选项
			twotabar(str){
				switch(str){
					case 0:
						this.zhemustat = true;
						this.conttwo = true;//打开保障面板
					break;
					case 2:
						this.zhemustat = true;
						this.contthree = true;//打开参数面板
					break;
					default:
				}
			},
			//关闭选项
			offbox(){
				this.zhemustat = false;
				this.contone = false;//关闭规格面板
				this.conttwo = false;//关闭参数面板
				this.contthree = false;//关闭保障面板
			},
			//选择sku属性
			skubut(a,b){
				this.$set(this.skuvalue,a,b);
				// console.log(this.skuname);
				
			// 	const arr = this.skuname;
			// 	this.$set(arr[a],'stat',b);
			//     this.$nextTick(()=>{
			// 		this.skuname = arr;
			// 	})
				
			// 	const arr = this.skuname;
			//     arr[a].stat = b;
			//     this.$nextTick(()=>{
			//        this.skuname = arr;
			//     })
			 // console.log(this.skuname);
			
			},
			//滚动条距离
			scroll(str){
				if(str.data > 300){
					this.headstat = true;
				}else{
					this.headstat = false;
				}
			},
			//回到顶部
			gotop(){
				this.scrolltop = 0;
				console.log("回到顶部");
			},
			//头部返回
			fanhui(){
				uni.navigateBack({
				    delta: 1
				});
			},
			//收藏商品
			shouchang(){
				console.log("收藏商品")
			},
			//分享商品
			fenxiang(){
				console.log("分享商品")
			},
			//滚动条下拉刷新
			refresherrefresh(){
				this.loadtopstat = true;
			},
			//查看评论
			boxbut(){
				console.log("查看评论")
			},
			//回到首页
			gohome(){
				uni.switchTab({
					 url: '/pages/index/index'
				})
			},
			//去购物车
			gocart(){
				uni.setStorageSync('shopid', this.id);//缓存商品id,用户购物车返回
				uni.navigateTo({
					 url: '/pages/cartcopy/cartcopy'
				})
			},
			//去客服页面
			gochat(){
				if(uni.usedata){
					console.log("已登录");
					// uni.switchTab({
					// 	 url: '/pages/kefu/kefu'
					// })
				}else{
					console.log("未登录");
				}
			},
			//加入购物车
			addcart(){
				if(uni.usedata){
					
				}else{
					console.log("未登录");
				}
			},
			//立即购买
			gopay(){
				if(uni.usedata){
					console.log("已登录");
				}else{
					console.log("未登录");
				}
			},
			//预览详情图片多张
			previewImg(index) {
				let imagedata = [];
				for (let i = 0; i < this.imgdata.length; i++) {
					imagedata.push(uni.http + this.imgdata[i]);
				}
				uni.previewImage({
					current: index,
					urls:imagedata,
					indicator: 'default',
					loop: true
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.head{
	background: $uni-color-color;
	color: #fff;
	font-size: $uni-title-font;
	line-height: 30px;
}
//内容滚动框
.shopbox{
	width: 100%;
	position: fixed;
	left: 0px;
}
// 头部价格名称
.price{
	font-size: $uni-text-font;
	display:flex;
	align-items:flex-end;
}
.newprice{
	color: $uni-price-color;
}
.newprice span{
	font-size: $uni-theme-font;
}
.oldprice{
	line-height:25px;
	font-family: "Microsoft YaHei";
	margin-left: 10px;
	color: #999;
}
.oldprice span{
	text-decoration:line-through;
}
.name{
	height: 40px;
	margin: 5px 0px;
	font-size: $uni-title-font;
	line-height: 20px;
	overflow: hidden;
}
.name span{
	margin-left: 5px;
	font-size: $uni-span-font;
}
.bux{
	font-family:"Microsoft YaHei";
	color: #999;
	font-size: $uni-text-font;
	height: 30px;
	display: flex;
	align-items: center;
}
.bux .img{
	width: 16px;
	height: 16px;
	vertical-align:middle;
}
//规格导航
.guge{
	height: 60rpx;
	line-height: 60rpx;
	font-size: $uni-name-font;
}
.guge-name{
	color: #999;
	overflow: hidden;
	font-family:"Microsoft YaHei";
	margin-right: 20rpx;
}
.guge-cont{
	flex: 1;
}
.guge-vale{
	flex: 1;
}
.guge-img{
	width: 30rpx;
	height: 30rpx;
	margin: 15rpx 0rpx 15rpx 10rpx;
}
//规格图片
.skutext-img{
	flex: 1;
	overflow: hidden;
}
.skutext-img .skutextimg{
	width: 60rpx;
	height: 60rpx;
	margin-right: 5px;
}
.skutext-val{
	height: 50rpx;
	padding: 0rpx 10rpx;
	line-height: 50rpx;
	background: #eee;
	color: #999;
	border-radius: 20rpx;
	font-size: $uni-text-font;
}
// 评价标题
.boxhead{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.boxhead-left{
	max-width: 100px;
	font-weight: 600;
	font-size: $uni-name-font;
}
.boxhead-right{
	flex: 1;
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	color: $uni-color-color;
}
.boxhead-right image{
	width: 10px;
	height: 10px;
	margin-left: 2px;
}
.imgone-title{
	height: 100rpx;
	display: flex;
	color: #999;
	font-size: $uni-span-font;
	align-items: center;
	justify-content: center;
}
//详情图片
.imgone{
	width: 100%;
	background: #fff;
	padding-bottom: 10px;
	line-height: 0px;
}
.xqimg{
	width: 98%;
	margin: -1rpx 1%;
}
// 选购面板
.shopimg{
	width: 200rpx;
	position: relative;
}
.shopimg image{
	width: 200rpx;
	height: 200rpx;
	border-radius: 10rpx;
	border: 6rpx solid #fff;
	position: absolute;
	left: 0px;
	bottom: 0px;
}
.shoptext{
	flex: 1;
	margin-left: 50rpx;
}
.shoptext-price{
	line-height: 60rpx;
	font-weight: 600;
	font-size: $uni-title-font;
	color: $uni-price-color;
}
.shoptext-price span{
	font-size: $uni-name-font;
}
.shoptext-stock{
	color: #666;
	font-size: $uni-text-font;
	line-height: 30rpx;
}
//规格选择
.skusroll{
	border-top: 1rpx solid #ddd;
}
.skusroll .skusroll-name{
	height: 60rpx;
	line-height: 60rpx;
	font-size: $uni-title-font;
	color: #000;
}
.skusroll .sku-but{
	padding: 12rpx 24rpx;
	background: #eee;
	font-size: $uni-name-font;
	margin:10rpx 30rpx 10rpx 0rpx;
}
.skusroll .select{
	background: $uni-color-color;
	color: #fff;
}
// 底部导航
.dombox{
	position: fixed;
	bottom: 0px;
	left: 0px;
	background: #ffffff;
	box-shadow: 0px 0px 2px #333;
}
.dombox .but{
	width: 50px;
	height: 50px;
}
.dombox .but p{
	width: 100%;
	line-height: 20rpx;
	text-align: center;
	color: #333;
	font-size: $uni-span-font;
}
.dombox .img{
	width: 20px;
	height: 20px;
	margin: 10px 15px 0px;
	line-height: 0px;
}
.paybut{
	flex:1;
	height: 36px;
	line-height: 36px;
	text-align: center;
	font-size: $uni-name-font;
	border-radius: 18px;
	box-shadow: 0px 0px 2px #999;
	margin: 0px 5px;
}
.paybut:active{
	transform:scale(0.95);
}
.cart{
	background:#ddd;
}
.gopay{
	color: #fff;
	background: $uni-color-color;
}
</style>
