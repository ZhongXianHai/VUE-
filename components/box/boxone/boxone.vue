<!-- 内容盒子 -->
<template>
	<view class="boxone" :style="cssfun"><slot></slot></view>
</template>
<script>
	export default {
		name:"boxone",
		data() {
			return {
				
			}
		},
		props:{
			bk:{
				type:String,
				default:"",
			},
			br:{
				type:Number,
			},
			wh:{
				type:Number,
			},
			mg:{
				type:Number,
			},
			pd:{
				type:Number,
			},
			ds:{
				type:Number,
			},
			lh:{
				type:Number,
			},
			ju:{
				type:Number,
			},
			wp:{
				type:Number,
			}
		},
		computed:{
			cssfun(){
				const cssobj = {};
				if(this.wh){
					cssobj['width'] = this.wh+'%';
				}
				if(this.mg){
					cssobj['margin'] = '20rpx '+this.mg+'%';
				}
				if(this.pd){
					cssobj['padding'] = '10rpx '+this.pd+'%';
				}
				if(this.bk){
					cssobj['background'] = this.bk;
				}
				if(this.br){
					cssobj['border-radius'] = this.br+'rpx';
				}
				if(this.ds){
					cssobj['display'] = 'flex';
				}
				if(this.lh){
					cssobj['align-items'] = 'center';
				}
				if(this.ju){
					switch (this.ju) {
						case 1:
							cssobj['justify-content'] = 'space-between';
							break;
						case 2:
							cssobj['justify-content'] = 'center';
							break;
						default:
							cssobj['justify-content'] = 'space-around';
					}
				}
				if(this.wp){
					cssobj['flex-wrap'] = 'warp';
				}
				
				return cssobj;
				
				// if(this.marg){
				// 	return {
				// 		margin:'10rpx'+this.marg+'%',
				// 	};
				// }
			}
		}
	}
</script>
