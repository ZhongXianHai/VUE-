<script>
	/*每个页面公共js */
	export default {
		//项目加载
		onLaunch: function() {
			uni.http = "http://127.0.0.1:82";//缓存平台请求网址
			this.getlabeldata();//缓存平台所有活动数据
			this.getactidata();//缓存平台所有标签数据
			uni.getSystemInfo({//缓存用户登录设备数据
				success: res =>{
					uni.app = res;
				}
			})
			this.getsinginuser();//获取用户登录信息
		},
		methods:{
			//获取用户登录信息
			async getsinginuser(){
				const res = await this.$myRequest({
					url:'/api/signin/uselogintitle',
					data:{},
				})
				console.log(res.data);
				if(res.status){
					uni.usedata = true;
				}else{
					uni.usedata = false;
					uni.navigateTo({//跳转登录
						 url: '/pages/signin/signin'
					})
				}
			},
			//加载平台标签
			async getlabeldata(){
				const res = await this.$myRequest({
					url:'/api/label/getwholedata',
				})
				if(res.status){
					uni.label = res.data;
				}else{
					uni.acti = [];
				}
			},
			//加载平台活动
			async getactidata(){
				const res = await this.$myRequest({
					url:'/api/acti/getwholedata',
					data:{
						'field':'id,shopimg',
					},
				})
				if(res.status){
					uni.acti = res.data;
				}else{
					uni.acti = [];
				}
			}
		},
		//项目显示
		onShow: function() {
			console.log('App Show')
		},
		//项目离开时
		onHide: function() {
			console.log('App Hide')
		},
	}
	
</script>

<style>
/*引入公共css */
@import url("/common/css/common.css");
</style>
