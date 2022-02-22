<!-- 商品模型1 -->
<template>
	<view class="modtyone">
		<view class="cart"  v-for="(item,index) in cartdata" :key="index">
			<view class="but" @click="select(index)"><p :class="item.stat ? 'select':''"></p></view>
			<view class="shop">
				<image class="img" :src="item.shopdata.headimg"></image>
				<image class="img" v-if="item.shopdata.type" :src="item.shopdata.type"></image>
				<image class="img" v-if="item.shopdata.stat != 2" src="../../../static/img/xiajia.png"></image>
			</view>
			<view class="cont">
				<view class="cont-name">{{ item.shopdata.name }}</view>
				<view class="cont-speci"><span @click="specibut(index)">{{ item.shopdata.speci }} </span></view>
				<view class="cont-price">
					<view class="pri-box"><span>￥</span>{{ item.shopdata.price }}</view>
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
			}
		},
		props:{
			cartdata:{
				type:Array,
				default:() => [],
			}
		},
		methods: {
			select(i){
				this.$emit('select',{
					'index':i,
				});
			},
			jianbut(i){
				this.$emit('jianbut',{
					'index':i,
				});
			},
			addbut(i){
				this.$emit('addbut',{
					'index':i,
				});
			},
			specibut(i){
				this.$emit('specibut',{
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
	height: 90px;
	margin: 10px auto;
	padding: 15px 1%;
	background: #fff;
	border-radius: 5px;
	display: flex;
	align-items: center;
}
.but{
	width: 30px;
	height: 100%;
}
.but p{
	width: 18px;
	height: 18px;
	margin: 30px 5px;
	border-radius: 50%;
	border: 1px solid #eee;
}
.but p.select{
	background:url(../../../static/img/select.png) no-repeat;
	background-size: 18px 18px;
}
.shop{
	width: 90px;
	height: 90px;
	margin: 0px 5px;
	border: 1px solid #eee;
	position: relative;
}
.img{
	position: absolute;
	left: 0px;
	top: 0px;
	width: 90px;
	height: 90px;
}
.cont{
	flex: 1;
	padding: 0px 5px;
	height: 100%;
}
.cont-name{
	width: 100%;
	height: 16px;
	line-height: 16px;
	overflow: hidden;
	font-size: $uni-name-font;
}
.cont-speci{
	margin: 5px 0px;
	overflow: hidden;
}
.cont-speci span{
	padding: 5px 10px;
	color: #999;
	border-radius: 5px;
	font-size: $uni-name-font;
	background: #eee;
}
.cont-price{
	width: 100%;
	height: 30px;
	margin-top: 14px;
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
.val-box{
	width: 102px;
	height: 26px;
	border-radius: 5px;
	border: 1px solid #ddd;
	display: flex;
}
.val-box p{
	width: 26px;
	height: 26px;
	font-size: $uni-title-font;
	text-align: center;
	line-height: 26px;
}
.input{
	width: 48px;
	height: 26px;
	border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	text-align: center;
}
</style>
