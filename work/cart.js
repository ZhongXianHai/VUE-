import { myRequest } from "../common/js/api.js";

/**
 * 分页获取用户购物车数据
 * @returns 
 */
export function GetUserCart(page,sum){
    return myRequest({
        url:'/api/cart/getpagedata',
        data:{
			'page':page,
			'sum':sum,
		}
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
/**
 * 修改cart单个数据
 * @returns 
 */
export function UpUseCart(cartid,uptitle){
    return myRequest({
        url:'/api/cart/updata',
        data:{
			'id':cartid,
			'uptitle':uptitle,
		}
    })
}
/**
 * 修改cart多个数据
 * @returns 
 */
export function UpAllData(cartids,uptitle){
    return myRequest({
        url:'/api/cart/upalldata',
        data:{
			'ids':cartids,
			'uptitle':uptitle,
		}
    })
}
/**
 * 删除cart多个数据
 * @returns 
 */
export function DeleAllData(cartids){
    return myRequest({
        url:'/api/cart/delealldata',
        data:{
			'ids':cartids
		}
    })
}


