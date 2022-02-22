import { myRequest } from "../common/js/api.js";

/**
 * 分页获取用户购物车数据
 * @returns 
 */
export function GetUserSignin(){
    return myRequest({
        url:'/api/cart/getpagedata',
        data:{}
    })
}
/**
 * 用户加入购物车
 * @returns 
 */
export function AddUseCart(addtitle){
    return myRequest({
        url:'/api/cart/adddata',
        data:{
			'addtitle':addtitle,
		}
    })
}