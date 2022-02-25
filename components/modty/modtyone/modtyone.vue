<!-- 购物车商品模型1 -->
<template>
	<view class="modtyone">
		<view class="cart"  v-for="(item,index) in cartdata" :key="index">
			<view class="but" @click="select(index)"><p :class="item.stat ? 'select':''"></p></view>
			<view class="shop" @click="goshop(index)">
				<image class="img" :src="$changeImg(item.headimg)"></image>
				<image class="img" :src="topimage(index)"></image>
			</view>
			<view class="cont">
				<view class="cont-name">{{ item.name }}</view>
				<view class="cont-speci"><span>{{ item.speci }}</span></view>
				<view class="cont-price">
					<view class="pri-box"><span>￥</span>{{ item.price }}<strong>{{ item.oldprice }}</strong></view>
					<view class="val-box"><p @click="jianbut(index)">-</p><input class="input" :value="item.shopnum"></input><p @click="addbut(index)">+</p></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"modtyone",
		data() {
			return {
				xiajashop:"/uploads/ico/ico220223016582.png",//已下架
				nopayshop:"/uploads/ico/ico220223017894.png",//暂不出售
			}
		},
		props:{
			cartdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			topimage(i){
				if(!this.cartdata[i].shopstat){
					return this.$changeImg(this.xiajashop);//商品已下架
				}
				if(this.cartdata[i].skuid){
					if(!this.cartdata[i].skustat){
						return this.$changeImg(this.xiajashop);//商品已下架
					}
				}
				if(this.cartdata[i].stock > 0){
					if(this.cartdata[i].type){
						return this.$actiImg(this.cartdata[i].type);
					}
				}else{
					return this.$changeImg(this.nopayshop);
				}
			},
			//选中
			select(i){
				this.$emit('select',{
					'index':i,
				});
			},
			//减数据
			jianbut(i){
				if(this.cartdata[i].shopnum <= 1){
					uni.showToast({
						icon:'none',
					    title: '不能小于1',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				this.$emit('jianbut',{
					'index':i,
				});
			},
			//加数据
			addbut(i){
				if(this.cartdata[i].shopnum >= this.cartdata[i].stock){
					uni.showToast({
						icon:'none',
					    title: '库存不足',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				this.$emit('addbut',{
					'index':i,
				});
			},
			//查看商品
			goshop(i){
				if(!this.cartdata[i].shopstat){
					uni.showToast({
						icon:'none',
					    title: '此商品已下架',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				if(this.cartdata[i].skuid){
					if(!this.cartdata[i].skustat){
						uni.showToast({
							icon:'none',
						    title: '此商品已下架',
							position:'bottom',
						    duration: 2000
						});
						return false;
					}
				}
				if(this.cartdata[i].stock <= 0){
					uni.showToast({
						icon:'none',
					    title: '此商品已停售',
						position:'bottom',
					    duration: 2000
					});
					return false;
				}
				this.$emit('goshop',{
					'index':i,
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.modtyone{
	width: 100%;
}
.cart{
	width: 94%;
	height: 180rpx;
	margin: 20rpx auto;
	padding: 30rpx 1%;
	background: #fff;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
}
.but{
	width: 70rpx;
	height: 100%;
}
.but p{
	width: 36rpx;
	height: 36rpx;
	margin: 72rpx 17rpx;
	border-radius: 50%;
	border: 4rpx solid #ddd;
}
.but p.select{
	background:url(../../../static/img/select.png) no-repeat;
	background-size: 36rpx 36rpx;
}
.shop{
	width: 180rpx;
	height: 180rpx;
	margin: 0rpx 10rpx;
	border: 2rpx solid #eee;
	position: relative;
}
.img{
	position: absolute;
	left: 0rpx;
	top: 0rpx;
}
.cont{
	flex: 1;
	padding: 0rpx 10rpx;
	height: 100%;
}
.cont-name{
	width: 100%;
	max-height: 60rpx;
	line-height: 30rpx;
	overflow: hidden;
	font-size: $uni-name-font;
}
.cont-speci{
	margin: 10rpx 0rpx;
	overflow: hidden;
}
.cont-speci span{
	padding: 8rpx 10rpx;
	color: #666;
	border-radius:5rpx;
	font-size: $uni-span-font;
	background: #eee;
}
.cont-price{
	width: 100%;
	height: 60rpx;
	display:flex;
	align-items: center;
	justify-content: space-between;
}
.pri-box{
	font-size: $uni-title-font;
	color: $uni-price-color;
}
.pri-box span{
	font-size: $uni-text-font;
}
.pri-box strong{
	font-weight: 400;
	margin-left: 2px;
	font-size: 10px;
	text-decoration:line-through;
	color: #999;
}
.val-box{
	width: 180rpx;
	height: 50rpx;
	border-radius: 10rpx;
	overflow: hidden;
	border: 2rpx solid #ddd;
	display: flex;
}
.val-box p{
	width: 50rpx;
	height: 50rpx;
	font-size: $uni-title-font;
	text-align: center;
	line-height: 50rpx;
}
.val-box p:active{
	color: #fff;
	background: $uni-color-color;
}
.input{
	width: 80rpx;
	height: 50rpx;
	border-left: 2rpx solid #ddd;
	border-right: 2rpx solid #ddd;
	text-align: center;
}
</style>
