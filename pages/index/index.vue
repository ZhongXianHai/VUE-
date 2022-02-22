<template>
	<view>
		<sandone v-if="sandstat"></sandone>
		<headtwo class="head" v-if="headstat">
			<!--#ifdef  H5 || APP-PLUS -->
			<image slot="leftcont" :src="$changeImg(mlogo)" mode="aspectFit"></image>
			<!-- #endif -->
			<monone class="select" slot="rightcont" :resou="resou" @click="headbut"></monone>
		</headtwo>
		<huitopone v-if="headstat" @gotop="gotop"></huitopone>
		<bannerone :banner="banner" @bannerbut="bannerbut"></bannerone>
		<navigone :navigdata="navigdata" @navigbut="navigbut"></navigone>
		<shopone :shopdata="shopdata" @seeshop="seeshop" @addcart="addcart"></shopone>
		<domone></domone>
	</view>
</template>

<script>
	import { GetIndexBanner,GetIndexNavig } from "../../work/banner.js"
	import { GetIndexShop } from "../../work/shop.js"
	import { GetIndexSearch } from "../../work/news.js"
	import sandone from "../../components/sand/sandone/sandone.vue"
	import headtwo from "../../components/head/headtwo/headtwo.vue"
	import monone from "../../components/mon/monone/monone.vue"
	import huitopone from "../../components/huitop/huitopone/huitopone.vue"
	import bannerone from "../../components/banner/bannerone/bannerone.vue"
	import navigone from "../../components/navig/navigone/navigone.vue"
	import shopone from "../../components/shop/shopone/shopone.vue"
	import domone from "../../components/dom/domone/domone.vue"
	export default {
		data() {
			return{
				mlogo:'/uploads/logo/mlogo.png',
				sandstat:true,//页面加载遮幕显示
				resum:0,//当前刷新数
				loginsum:4,//总刷新数
				restat:false,//刷新事件，手动刷新true，系统加载false
				headstat:false,//头部导航,回到顶部显示隐藏
				resou:[],//搜素热门关键字
				banner:[],//轮播图
				navigdata:[], //首页导航
				shopdata:[],//商品数据
			}
		},
		components:{
			sandone,
			headtwo,
			monone,
			huitopone,
			bannerone,
			navigone,
			shopone,
			domone
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中'
			});
			this.getbannerdata();//获取banner数据
			this.getnavigdata();//获取导航数据
			this.getshopdata();//获取商品数据
			this.getnewsdata();//获取热搜词汇
		},
		methods: {
			//获取banner数据
			async getbannerdata(){
				GetIndexBanner(1).then(res =>{
					this.banner = res.data;
					this.updata();//加载成功事件
				})
			},
			//获取导航数据
			async getnavigdata(){
				GetIndexNavig(2,'id,name,img,url').then(res =>{
					this.navigdata = res.data;
					this.updata();//加载成功事件
				})
			},
			//获取商品数据
			async getshopdata(){
				GetIndexShop('id,name,price,oldprice,headimg,type').then(res =>{
					this.shopdata = res.data;
					this.updata();//加载成功事件
				})
			},
			//获取搜索词数据
			async getnewsdata(){
				GetIndexSearch(1,'name').then(res =>{
					this.resou = res.data;
					this.updata();//加载成功事件
				})
			},
			//回到顶部
			gotop(){
				uni.pageScrollTo({ 　　　　　　
			　　　　　　duration: 50,//过渡时间必须为0，否则运行到手机会报错
			　　　　　　scrollTop:0,
				})
			},
			//点击搜素框
			headbut(){
				console.log("点击搜索");
			},
			//接受到banner图的点击
			bannerbut(str){
				let bannerid = this.banner[str.index].id;
				console.log("轮播图id="+bannerid);
			},
			//接收到导航按钮的点击
			navigbut(str){
				let navigid = this.navigdata[str.index].id;
				console.log("导航id="+navigid);
			},
			//接受的组件事件，商品图片的点击
			seeshop(str){
				let shopid = this.shopdata[str.index].id;
				uni.navigateTo({
					url: '/pages/shop/shop?id='+shopid
				})
			},
			//接受的组件事件，商品购物车点击
			addcart(str){
				let shopid = this.shopdata[str.index].id;
				console.log("商品id="+shopid+"加入购物车");
			},
			//加载成功
			updata(){
				this.resum += 1;//记录加载成功值
				//加载进度完成
				if(this.resum == this.loginsum){
					if(this.restat){//属于用户刷新
						uni.stopPullDownRefresh();//关闭下拉加载样式
					}else{
						setTimeout(()=>{
							uni.hideLoading();//关闭系统加载样式
							this.sandstat = false;//关闭加载遮幕
						},0)
					}
				}
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			//用户手动刷新
			this.resum = 0;
			this.restat = true;
			//执行重置数据
			setTimeout(()=>{
				this.banner=[];//轮播图
				this.navigdata=[]; //首页导航
				this.shopdata=[];//商品数据
				this.getbannerdata();
				this.getnavigdata();
				this.getshopdata();
				this.getnewsdata();
			},1000)
		},
		//自带滚动条监听事件
		onPageScroll(Object) {
			if(Object.scrollTop<300){
				this.headstat = false;//关闭回到顶部按钮
			}else{
				this.headstat = true;//开启回到顶部按钮
			}
		}
	}
</script>

<style lang="scss" scoped>
.head{
	background: $uni-color-color;
}
.select{
	background: #fff;
	border-radius: 15px;
	line-height: 32px;
	color: #999;
}
	.scroll{
		width: 100%;
		height: calc(100vh - 50px);
		overflow: hidden;
	}
</style>
