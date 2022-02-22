import { myRequest,ItRequest } from "../common/js/api.js";

/**
 * 用户登录验证
 * @returns 
 */
export function GetUserSignin(phone,code,proid,source){
    return myRequest({
        url:'/api/signin/login',
        data:{
            'phone':phone,
			'code':code,
			'proid':proid,
			'source':source,
        }
    })
}
/**
 * 用户当前设备定位地址
 */
export function GetUserLoca(){
    return ItRequest({
        url:'https://apis.map.qq.com/ws/location/v1/ip',
		method:'GET',
        data:{
            'key':"5TCBZ-J6F3D-AOA4C-H3EXG-ZKAB3-BUFDN",
        }
    })
}
