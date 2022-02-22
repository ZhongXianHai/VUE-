// 自身服务器网络请求
export const myRequest = (options) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url:uni.http+options.url,
			method:options.method || "POST",
			header: {'content-type': 'application/json'},
			// header:{
			// 	'content-type': 'application/x-www-form-urlencoded',
			// },
			data:options.data || {},
			success: (res)=>{
				// if(res.data == "用户未登录"){
				// 	uni.navigateTo({
				// 		url: '/pages/signin/signin',
				// 	})
				// 	return false;
				// }
				resolve(res.data);
			},
			fail:(err)=>{
				return uni.showToast({
					title:"请求失败"
				})
				reject && reject(err);
			}
		})
	})
}
//外部服务器网络请求
export const ItRequest = (options) => {
	return new Promise((resolve,reject)=>{
		uni.request({
			url:options.url,
			method:options.method || "POST",
			header: {'content-type': 'application/json'},
			data:options.data || {},
			success: (res)=>{
				resolve(res.data);
			},
			fail:(err)=>{
				return uni.showToast({
					title:"请求失败"
				})
				reject && reject(err);
			}
		})
	})
}
//解析网络文件路径
export const changeImg = (value) =>{
    return uni.http+value;
}
//提取缓存文件并解析路径
export const actiImg = (index) =>{
	if(uni.acti[index]){
		return uni.http+uni.acti[index].shopimg;
	}else{
		return "";
	}
}