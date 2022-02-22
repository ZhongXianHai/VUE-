<template>
	<view class="fenlei">
		<sandone v-if="sandstat"></sandone>
		<headfour :resou="resou" @headbut="headbut"></headfour>
		<view class="class" :style="{'top':topheight+'px','height':'calc(100vh - '+topheight+'px - '+domheight+'px )'}">
			<view class="class-left">
				<navigtwo :classdata="classdata" :classindex="classindex" @classselect="classselect"></navigtwo>
			</view>
			<view class="class-right">
				<scrollone :loadtopstat="loadtopstat" @refresherrefresh="refresherrefresh">
					<navigthree :classdata="classdata[classindex].child" @classbut="classbut"></navigthree>
				</scrollone>
			</view>
		</view>
	</view>
</template>

<script>
	import { GetAllData } from "../../work/elass.js"
	import { GetIndexSearch } from "../../work/news.js"
	import sandone from "../../components/sand/sandone/sandone.vue"
	import headfour from '../../components/head/headfour/headfour.vue'
	import scrollone from "../../components/scroll/scrollone/scrollone.vue"
	import navigtwo from '../../components/navig/navigtwo/navigtwo.vue'
	import navigthree from '../../components/navig/navigthree/navigthree.vue'
	export default {
		name:"fenlei",
		data() {
			return {
				sandstat:true,//遮幕显示
				resum:0,//当前刷新数
				loginsum:2,//总刷新数
				restat:false,//刷新事件，手动刷新true，系统加载false
				topheight:40,//滚动窗体距离头部值(动态)
				domheight:50,//滚动窗体距离底部值(动态)
				loadtopstat:false,//下拉状态
				resou:[],//搜素热门关键字
				classindex:0,//分类序号
				//分类数据
				classdata:[{
						"child":[],
				}],
			}
		},
		components:{
			sandone,
			headfour,
			scrollone,
			navigtwo,
			navigthree
		},
		onLoad() {
			uni.showLoading({//系统加载效果
			    title: '加载中'
			});
			this.getclassdata();
			this.getnewsdata();
		},
		//组件创建完毕执行
		created(){
			/* #ifdef  MP-WEIXIN */
			this.topheight = uni.getSystemInfoSync().statusBarHeight+40;//顶部距离
			this.domheight = 0;//底部距离
			/* #endif */
		},
		methods: {
			//获取分类数据
			async getclassdata(){
				GetAllData().then(res=>{
					console.log(res);
					this.classdata = res.data;
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
			//接收头部组件的搜素点击事件
			headbut(){
				console.log("搜索");
			},
			//收到导航条下拉刷新事件
			refresherrefresh(str){
				this.loadtopstat = true;//开启自定义加载
				//用户手动刷新
				this.resum = 0;
				this.restat = true;
				//执行重置数据
				setTimeout(()=>{
					this.classindex = 0;
					this.classdata = [{
						"child":[],
					}];
					this.getclassdata();
					this.getnewsdata();
				},1000)
			},
			//接收来自一级分类的点击,切换分类数据
			classselect(str){
				this.classindex = str.index;
			},
			//接收来自分类内容的点击
			classbut(str){
				//跳转分类
				let calssid = this.classdata[this.classindex].child[str.index].id;//点击的分类id
				console.log(calssid);
			},
			//加载成功
			updata(){
				this.resum += 1;//记录加载成功值
				if(this.resum == this.loginsum){//加载进度完成
					if(this.restat){//属于用户手动
						 this.loadtopstat = false;//关闭自定义加载
					}else{
						setTimeout(()=>{
							uni.hideLoading();//关闭系统加载样式
							this.sandstat = false;//隐藏加载遮幕
						},500)
					}
				}
			},
			//离开页面
			onHide(){
				//清除定时器
				// console.log("ff")
			}
		}
	}
</script>
<style scoped>
.class{
	width: 100%;
	position: fixed;
	left: 0px;
	display: flex;
}
.class-left{
	width: 22%;
	height: 100%;
	background: #fff;
	overflow-y: auto;
	box-shadow: 0px 0px 2px #999;
}
.class-left::-webkit-scrollbar {
    display: none;
}
.class-right{
	flex: 1;
	height: 100%;
}
</style>
