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
				<bannertwo :banner="shop.zhuimg" :shoptype="shop.type"></bannertwo>
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
							<image :src="$changeImg(youtico)"></image>
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
			<view v-show="contone">
				<tabarone @offbox="offbox">
					<boxone :wh="94" :pd="3" :ds="1">
						<view class="shopimg">
							<image class="shopimg-top" v-show="!shopstat" :src="$changeImg(nopayshop)" @click="skuImg"></image>
							<image :src="$changeImg(skuimage)"  @click="skuImg"></image>
						</view>
						<view class="shoptext">
							<view class="shoptext-price"><span>￥</span>{{ skuprice }} <strong>{{ oldskuprice }}</strong></view>
							<view class="shoptext-stock">库存：{{ skustock }}</view>
						</view>
					</boxone>
					<view class="specititle">
						<boxone :wh="94" :mg="3" class="skusroll" v-for="(item,index) in skuname" :key="index">
							<view class="skusroll-name">选择{{item.name}}</view>
							<boxone :ds="1":wp="1">
								<view class="sku-but" v-for="(title,value) in item['cont']" :key="value" @click="skubut(index,value,1)" :class="value == skuvalue[index] ? 'select':''">{{ title }}</view>
							</boxone>
						</boxone>
						<boxone :wh="94" :mg="3" :ds="1" :lh="1" class="skusroll skusum">
							<view class="skusroll-name">选择数量</view>
							<boxone :ds="1" :lh="1" class="shopsum">
								<view class="sumbatr" @click="jiafun">+</view>
								<input class="sumvalue" type="number" v-model="shopnum" maxlength="4" @blur="sunfun"/>
								<view class="sumbatr" @click="shaofun">-</view>
							</boxone>
						</boxone>
					</view>
					<view class="specibut" @click="pagebat">确定</view>
				</tabarone>
			</view>
			<!-- 服务保障 -->
			<view v-show="conttwo">
				<tabartwo @offbox="offbox">
					<view class="parament-title">基础服务</view>
					<boxone :wh="94" :mg="3" class="parament-cont">
						<boxone :ds="1" v-for="(item,index) in appfuwu" :key="index" class="parament-value">
							<view class="zuoico"><image :src="$changeImg(fuwuico)" mode="heightFix"></image></view>
							<view class="youtitle">{{ item.name }}</view>
						</boxone>
					</boxone>
				</tabartwo>
			</view>
			<!-- 查看参数 -->
			<view v-show="contthree">
				<tabartwo @offbox="offbox">
					<view class="parament-title">产品参数</view>
					<boxone :wh="94" :mg="3" class="parament-cont">
						<boxone :ds="1" v-for="(item,index) in shop.parameter" :key="index" class="parament-text">
							<view class="zuoname">{{ item.name }}</view>
							<view class="youtext">{{ item.value }}</view>
						</boxone>
					</boxone>
				</tabartwo>
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
				loginstat:true,//初步加载
				paystat:true,//操作方式，直接购买/加入购物车
				shopstat:true,//商品是否可售
				// seestat:false,//
				resum:0,//当前刷新数
				loginsum:4,//总刷新数
				restat:false,//刷新事件，手动刷新true，系统加载false
				topheight:45,//滚动窗体距离头部值
				domheight:50,//滚动窗体距离底部值
				scrolltop:0,//滚动条位置
				loadtopstat:false,//滚动条下拉加载状态
				headico:'/uploads/ico/ico220216028662.png',
				fenxico:'/uploads/ico/ico220218109421.png',
				homeico:'/uploads/ico/ico220218105862.png',
				kefuico:'/uploads/ico/ico220218102742.png',
				cartico:'/uploads/ico/ico220218109340.png',
				youjico:'/uploads/ico/ico220214059125.png',
				fuwuico:'/uploads/ico/ico220223101991.png',
				youtico:'/uploads/ico/ico220224042974.png',
				nopayshop:"/uploads/ico/ico220223017894.png",//暂不出售
				headstat:false,//回到顶部显示隐藏
				id:0,//商品id
				shop:[],//商品数据
				skudata:[],//sku数据
				skuname:[],//规格名称
				skuvalue:[],//选中值
				skutext:'',//选中sku名称
				skuimage:'',//选中sku图片
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
				zhemustat:false,//遮幕开关
				contone:false,//规格面板
				conttwo:false,//参数面板
				contthree:false,//保障面板
				skuprice:0.0,//规格选择价格
				oldskuprice:0.0,//旧的市场价
				skuid:0,//选择skuid
				skuindex:0,//选中sku序号
				shopnum:1,//下单数量
				skustock:0,//库存
				usestat:false,//用户登录状态
				shoucico:'/uploads/ico/ico220217032461.png',
				xiaosico:'/uploads/ico/ico220217030743.png',
				fengxico:'/uploads/ico/ico220217036696.png',
				appfuwu:[{
					name:"付款后7天内发货",
				},{
					name:"7天无理由—满足7天无理由退货申请的前提下，退货商品需买家承担退货和退货邮费",
				},{
					name:'假一赔四·正品保障'
				},{
					name:'24小时退款·订单售后成功后，将24小时内完成退款'
				}]
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
			//验证用户是否登录
			uni.getStorage({
			    key: 'usedata',
			    success: (res)=>{
					if(res.data){
						this.usestat = res.data;
					}else{
						this.usestat = false;
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
		},
		methods: {
			//获取商品数据
			async getshopdata(){
				GetAloneData(this.id,'*').then(res =>{
					res.data['zhuimg'] = JSON.parse(res.data['zhuimg']);
					res.data['xqimg'] = JSON.parse(res.data['xqimg']);
					res.data['label'] = JSON.parse(res.data['label']);
					res.data['parameter'] = JSON.parse(res.data['parameter']);
					this.skuprice = res.data.price;//规格选择价格
					this.skustock = res.data.stock;//库存
					this.oldskuprice = res.data.oldprice;//旧的市场价
					this.skuimage = res.data.headimg;//sku图片
					this.shop = res.data;
					this.updata();
				})
			},
			//获取商品sku数据
			async getshopsku(){
				GetWholeData(this.id).then(res =>{
					this.skudata = res.data;
					this.updata();
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
							}
						}
					}
					this.updata();
				})
			},
			//获取商品评论
			async getshopevaluate(){
				GetPageData(this.id,null,3).then(res =>{
					this.pinlundata = res.data.data;
					console.log(this.pinlundata);
					this.updata();
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
			skubut(a,b,c){
				this.$set(this.skuvalue,a,b);
				this.skutext = "";
				for(let i=0;i<this.skuname.length;i++){
					this.skutext = this.skutext + this.skuname[i].cont[this.skuvalue[i]];
				}
				for(let t=0;t<this.skudata.length;t++){
					if(this.skudata[t].speci == this.skutext){
						this.skuindex = t;//sku序号
						this.skuid = this.skudata[t].id;//确定skuid
						this.skuprice = this.skudata[t].price;//规格选择价格
						this.skustock = this.skudata[t].stock;//sku库存
						this.oldskuprice = this.skudata[t].oldprice;//旧的市场价
						this.shopstat = this.skudata[t].stat;//商品状态
						this.skuimage = this.skudata[t].headimg;//sku图片
						if(c){//属于用户点击
							this.sunfun();//重新计算输入库存
							if(!this.skudata[t].stat){
								uni.showToast({
									icon:'none',
									title: '此商品停售',
									position:'bottom',
									duration: 2000
								});
							}
						}
					}
				}
			},
			//滚动条距离
			scroll(str){
				this.scrolltop = str.data;
				if(str.data > 300){
					this.headstat = true;
				}else{
					this.headstat = false;
				}
			},
			//回到顶部
			gotop(){
				this.scrolltop = 0;
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
			//加数量
			jiafun(){
				if(this.shopnum >= this.skustock){
					this.shopnum = this.skustock;
					uni.showToast({
						icon:'none',
					    title: '库存不足',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				this.shopnum += 1;
			},
			//减数量
			shaofun(){
				if(this.shopnum <= 1){
					this.shopnum = 1;
					uni.showToast({
						icon:'none',
					    title: '至少为1',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				this.shopnum -= 1;
			},
			//输入数量
			sunfun(){
				if(this.shopnum <1){
					this.shopnum = 1;
					uni.showToast({
						icon:'none',
					    title: '至少为1',
						position:'bottom',
					    duration: 2000
					});
				}else if(this.shopnum >this.skustock){
					this.shopnum = this.skustock;
					uni.showToast({
						icon:'none',
					    title: '库存不足',
						position:'bottom',
					    duration: 2000
					});
				}
			},
			//分享商品
			fenxiang(){
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSceneSession",
				//     type: 0,
				//     href: "http://uniapp.dcloud.io/",
				//     title: "uni-app分享",
				//     summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				//     imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
				//     success: function (res) {
				//         console.log("success:" + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
			},
			//滚动条下拉刷新
			refresherrefresh(){
				//用户手动刷新
				this.resum = 0;
				this.restat = true;
				//执行重置数据
				this.loadtopstat = true;//开启加载
				this.getshopdata();//提取商品数据
				this.getskuname();//获取商品skuname
				this.getshopsku();//获取商品sku数据
				this.getshopevaluate();//获取商品评论数据
			},
			//加载成功
			updata(){
				this.resum += 1;//记录加载成功值
				//加载进度完成
				if(this.resum == this.loginsum){
					if(this.restat){//属于用户刷新
						this.restat = false;
						this.loadtopstat = false;//关闭加载
					}
				}
				this.skubut(0,0,0);
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
				// uni.navigateTo({
				// 	 url: '/pages/signin/signin'
				// })
			},
			//加入购物车
			addcart(){
				if(this.usestat){
					this.paystat = false;//改为加入购物车
					this.onetabar();//打开规格面板
				}else{
					uni.showToast({
						icon:'none',
					    title: '请先登录',
						position:'bottom',
					    duration: 1000
					});
					//未登录,跳转登录
					setTimeout(function(){
						uni.navigateTo({
							 url: '/pages/signin/signin'
						})
					},2000)
				}
			},
			//立即购买
			gopay(){
				if(this.usestat){
					this.paystat = true;//立即购买
					this.onetabar();//打开规格面板
				}else{
					uni.showToast({
						icon:'none',
					    title: '请先登录',
						position:'bottom',
					    duration: 1000
					});
					//未登录,跳转登录
					setTimeout(function(){
						uni.navigateTo({
							 url: '/pages/signin/signin'
						})
					},2000)
				}
			},
			//去下单，或加入购物车
			pagebat(){
				if(this.shopnum > this.skustock){
					uni.showToast({
						icon:'none',
					    title: '库存不足',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(!this.shopstat){
					uni.showToast({
						icon:'none',
					    title: '此商品停售',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(this.paystat){
					console.log("购买该商品");
					//跳转下单页面
					// uni.navigateTo({
					// 	 url: '/pages/payshop/payshop?shopid='+this.id;
					// })
				}else{
					const addtitle={
						'shopid':this.id,
						'skuid':this.skuid,
						'shopnum':this.shopnum,
					}
					AddUseCart(addtitle).then(res=>{
						this.offbox();//关闭规格面板
						uni.showToast({
							icon:'none',
						    title: res.message,
							position:'bottom',
						    duration: 2000
						});
					})
				}
			},
			//预览详情图片多张
			previewImg(index) {
				let imagedata = [];
				for (let i = 0; i < this.shop.xqimg.length; i++) {
					imagedata.push(uni.http + this.shop.xqimg[i]);
				}
				uni.previewImage({
					current: index,
					urls:imagedata,
					indicator: 'default',
					loop: true
				});
			},
			//预览sku图片
			skuImg(){
				let imagedata = [];
				if(this.skudata.length < 1){
					imagedata.push(uni.http + this.shop.headimg);
				}
				for (let i = 0; i < this.skudata.length; i++) {
					imagedata.push(uni.http + this.skudata[i].headimg);
				}
				uni.previewImage({
					current: this.skuindex,
					urls:imagedata,
					indicator: 'default',
					loop: true
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.head{
	background: $uni-color-color;
	color: #fff;
	font-size: $uni-title-font;
	line-height: 60rpx;
}
//内容滚动框
.shopbox{
	width: 100%;
	position: fixed;
	left: 0rpx;
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
	line-height:50rpx;
	font-family: "Microsoft YaHei";
	margin-left: 20rpx;
	color: #999;
}
.oldprice span{
	text-decoration:line-through;
}
.name{
	height: 80rpx;
	margin: 10rpx 0rpx;
	font-size: $uni-title-font;
	line-height: 40rpx;
	overflow: hidden;
}
.name span{
	margin-left: 10rpx;
	font-size: $uni-span-font;
}
.bux{
	font-family:"Microsoft YaHei";
	color: #999;
	font-size: $uni-text-font;
	height:60rpx;
	display: flex;
	align-items: center;
}
.bux .img{
	width:32rpx;
	height: 32rpx;
	vertical-align:middle;
}
//规格导航
.guge{
	height: 64rpx;
	line-height: 64rpx;
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
	margin-right: 10rpx;
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
	max-width: 200rpx;
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
	width: 20rpx;
	height: 20rpx;
	margin-left: 4rpx;
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
	padding-bottom: 20rpx;
	line-height: 0rpx;
}
.xqimg{
	width: 98%;
	line-height: 0rpx;
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
	background: #fff;
	left: 0rpx;
	bottom: 0rpx;
	box-shadow: 0rpx 0rpx 4rpx #999;
}
.shopim-top{
	z-index: 10;
}
.shoptext{
	flex: 1;
	margin-left: 50rpx;
}
.shoptext-price{
	line-height: 60rpx;
	font-weight: 600;
	font-size:$uni-theme-font;
	color: $uni-price-color;
}
.shoptext-price span{
	font-size: $uni-name-font;
}
.shoptext-price strong{
	font-weight: 400;
	margin-left: 10rpx;
	color: #666;
	text-decoration:line-through;
	font-size: $uni-text-font;
}
.shoptext-stock{
	color: #666;
	font-size: $uni-text-font;
	line-height: 30rpx;
}
//规格属性及选择
.specititle{
	width: 100%;
	height: 568rpx;
	padding-bottom: 100rpx;
	overflow-y: auto;
}
.skusroll{
	border-top: 1rpx solid #ddd;
}
.skusum{
	height: 100rpx;
}
.skusroll .skusroll-name{
	line-height: 80rpx;
	font-size: $uni-name-font;
}
.skusroll .sku-but{
	padding: 8rpx 14rpx;
	background: #eee;
	font-size: $uni-text-font;
	margin-right: 30rpx;
	margin-bottom: 10rpx;
	border-radius: 6rpx;
	overflow: hidden;
}
.skusroll .select{
	border: 2rpx solid $uni-color-color;
	background: #e2f3ff;
	color:$uni-color-color;
}
// 数量输入
.shopsum{
	height: 80rpx;
	flex: 1;
	flex-direction: row-reverse;
}
.sumbatr{
	width: 60rpx;
	height: 60rpx;
	background: #eee;
	border-radius: 6rpx;
	text-align: center;
	line-height: 60rpx;
	overflow: hidden;
	font-size: $uni-title-font;
	color: #333;
}
.sumbatr:active{
	background: $uni-color-color;
	color: #fff;
}
.sumvalue{
	width: 100rpx;
	height: 58rpx;
	margin: 0rpx 10rpx;
	overflow: hidden;
	text-align: center;
	border: 1rpx solid #eee;
}
// 选择按钮
.specibut{
	width: 94%;
	margin: 5rpx 3%;
	text-align: center;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 30rpx;
	background: $uni-color-color;
	color: #fff;
	font-size: $uni-name-font;
}
.specibut:active{
	background: $uni-color-hover;
	transform:scale(0.95);
}
.parament-title{
	padding: 20rpx 0rpx;
	line-height: 70rpx;
	text-align: center;
	font-size: $uni-title-font;
}
.parament-cont{
	height: 740rpx;
	overflow-y: hidden;
	font-size: $uni-name-font;
	color: #333;
}
// 商品参数
.parament-text{
	line-height: 90rpx;
	border-bottom: 1rpx solid #ddd;
}
.zuoname{
	width: 180rpx;
	color: #222;
}
.youtext{
	color: #555;
}
//平台服务
.parament-value{
	padding-bottom: 50rpx;
}
.zuoico{
	width: 50rpx;
	height: 50rpx;
	margin-right: 40rpx;
}
.youtitle{
	color: #666;
	margin-top: 10rpx;
	line-height: 30rpx;
	font-size: $uni-span-font;
}
// 底部导航
.dombox{
	position: fixed;
	bottom: 0rpx;
	left: 0rpx;
	background: #ffffff;
	box-shadow: 0rpx 0rpx 4rpx #333;
}
.dombox .but{
	width: 100rpx;
	height: 100rpx;
}
.dombox .but p{
	width: 100%;
	line-height: 20rpx;
	text-align: center;
	color: #333;
	font-size: $uni-span-font;
}
.dombox .img{
	width: 40rpx;
	height: 40rpx;
	margin: 20rpx 30rpx 0rpx;
	line-height: 0rpx;
}
.paybut{
	flex:1;
	height: 72rpx;
	line-height: 72rpx;
	text-align: center;
	font-size: $uni-name-font;
	border-radius: 36rpx;
	box-shadow: 0rpx 0rpx 4rpx #999;
	margin: 0rpx 10rpx;
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
