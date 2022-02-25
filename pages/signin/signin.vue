<template>
	<view class="signin">
		<view class="signin-bg">
			<image :src="$changeImg(pagebg)" mode="widthFix"></image>
		</view>
		<view class="signin-logo">
			<image :src="$changeImg(mlogo)" mode="widthFix"></image>
		</view>
		<view class="signin-cont">
			<view class="cont-box phone">
				<input type="number" placeholder="输入您的手机号" v-model="phone" maxlength="11" @input="inphone"/>
			</view>
			<view class="cont-box code">
				<input type="number" placeholder="输入验证码" v-model="code" maxlength="4"/>
				<view class="code-text" :class="stat?'getcode':''" @click="getcode">{{ text }}</view>
			</view>
			<view class="cont-box goin" @click="gosignin">登录或注册登录</view>
		</view>
		<view class="signinapp">
			<image :src="$changeImg(wxlogo)" mode="widthFix" @click="wxsignin"></image>
		</view>
		<view class="domtext">若您登陆本平台，将默认您同意<span>爱周边商城用户协议</span>及<span>平台用户隐私政策</span></view>
	</view>
</template>

<script>
	import { GetUserSignin,GetUserLoca } from "../../work/user.js"
	import { GetSms } from "../../work/sms.js"
	export default {
		name:"signin",
		data() {
			return {
				stat:false,//手机号状态
				codestat:false,//验证码当前是否可发送
				loginstat:false,//是否已发送过验证码
				pagebg:'/uploads/banner/banner220212043164.jpg',
				mlogo:'/uploads/logo/mlogo.png',
				wxlogo:'/uploads/ico/ico220212047690.png',
				phone:'',
				code:'',
				text:'获取验证码',
				time:null,
				province:["北京","天津","上海","重庆","河北","河南","云南","辽宁","黑龙江","湖南","安徽","山东","新疆","江苏","浙江","江西","湖北","广西","甘肃","山西","内蒙古","陕西","吉林","福建","贵州","广东","青海","西藏","四川","宁夏","海南","台湾","香港","澳门","南海诸岛"],
				sum:Number,
				proid:Number,//定位地址
				source:Number,//设备来源
			}
		},
		components:{
		},
		onLoad(option){
			//验证用户是否登录
			uni.getStorage({
			    key: 'usedata',
			    success: function (res) {
					if(res.data){
						uni.showToast({
							icon:'none',
						    title: '已有登录账号',
							position:'bottom',
						    duration: 1000
						});
						//跳转首页
						setTimeout(function(){
							uni.switchTab({
								 url: '/pages/index/index'
							})
						},2000)
					}
			    }
			});
			//获取此设备定位地址
			GetUserLoca().then(res=>{
				 if(res.status == 0){
					const city = res.result.ad_info.province.split('省')[0];
					this.proid = this.province.indexOf(city);
				}
			})
			// #ifdef APP-PLUS
			this.source = 'typetwo';//APP
			// #endif
			// #ifdef H5
			this.source = 'typeone';//H5
			// #endif
			// #ifdef MP-WEIXIN
			this.source = 'typefour';//小程序
			// #endif
		},
		methods: {
			//电话号输入检测
			inphone(){
				if(/^1[34578]\d{9}$/.test(this.phone)){
					this.stat = true;
				}else{
					this.stat = false;
				}
			},
			//获取验证码
			getcode(){
				if(!this.stat){
					uni.showToast({
						icon:'none',
					    title: "请输入正确的手机号",
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(this.codestat){
					return false;
				}
				GetSms(this.phone,null,'api_code').then(res=>{
					uni.showToast({
						icon:'none',
						title: res.message,
						position:'bottom',
						duration: 2000
					});
					if(res.status){
						this.codestat = true;//验证码发送成功，不可再次发送验证码
						this.loginstat=true,//已发送过验证码
						this.gettime();//倒计时
					}
				})
			},
			//倒计时
			gettime(){
				this.sum = 60;
				const that = this;
				this.time = setInterval(function(){
					that.sum --;
					if(that.sum < 0){
						that.text = "获取验证码";
						this.codestat = false;//可再次发送验证码
					}else{
						that.text = that.sum+'s';
					}
				},1000)
			},
			//发送登录请求
			gosignin(){
				if(!this.stat){
					uni.showToast({
						icon:'none',
					    title: "请输入正确的手机号",
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(!this.loginstat){
					uni.showToast({
						icon:'none',
					    title: "您还未获取过验证码",
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(!this.code){
					uni.showToast({
						icon:'none',
					    title: "请输入验证码",
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				//发起登录请求
				GetUserSignin(this.phone,this.code,this.proid,this.source).then(res=>{
					uni.showToast({
						icon:'none',
					    title: res.message,
						position:'bottom',
					    duration: 2000
					});
					if(res.status){
						uni.usedata = true;//缓存用户登录数据
						uni.setStorageSync('usedata', true);//缓存
						uni.navigateBack({
							delta: 1
						});
					}
				})
			},
			//微信登录
			wxsignin(){
				
			}
		}
	}
</script>
<style lang="scss" scoped>
.signin{
	width: 100%;
	height: 100vh;
	position: relative;
	overflow:hidden;
}
.signin-bg{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0rpx;
	height: 0rpx;
}
.signin-logo{
	position: absolute;
	width: 400rpx;
	height: 160rpx;
	left: 50%;
	top: 160rpx;
	margin-left: -200rpx;
}
.signin-cont{
	position: absolute;
	width: 600rpx;
	height: 500rpx;
	left: 50%;
	top: 340rpx;
	margin-left: -300rpx;
}
.cont-box{
	width: 100%;
	height: 96rpx;
	line-height: 96rpx;
	border-radius: 48rpx;
	background: #fff;
	overflow: hidden;
	box-shadow: 0px 0px 3px #333;
}
.cont-box input{
	width: 100%;
	height: 100%;
	text-indent: 40rpx;
}
.phone{
	margin-bottom: 30rpx;
}
.code{
	display: flex;
	justify-content: space-between;
}
.code-text{
	width: 240rpx;
	color: #999;
	text-align: center;
}
.getcode{
	color: $uni-color-color;
}
.getcode:active{
	background: #eee;
}
.goin{
	background: $uni-color-color;
	color: #fff;
	text-align: center;
	font-size: $uni-title-font;
	margin-top: 80rpx;
}
.goin:active{
	background: $uni-color-hover;
}
.signinapp{
	position: absolute;
	width: 100rpx;
	height: 100rpx;
	bottom: 220rpx;
	left: 50%;
	margin-left: -50rpx;
	background: #fff;
	overflow:hidden;
	border-radius: 50%;
	border: 1rpx solid #fff;
	box-shadow: 0rpx 0rpx 6rpx #333;
}
.domtext{
	position: absolute;
	left: 50%;
	bottom: 20rpx;
	width: 600rpx;
	margin-left: -300rpx;
	font-size: $uni-text-font;
	color: #eee;
	text-shadow: 0rpx 2rpx 2rpx #333;
}
.domtext span{
	color: #3e98ff;
}
</style>
