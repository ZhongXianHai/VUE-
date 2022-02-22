import { myRequest } from "../common/js/api.js";

/**
 * 请求商品数据
 * @returns 
 */
//首页获取最新的商品数据（数量）
export function GetIndexShop(field){
    return myRequest({
        url:'/api/shop/getsumdata',
        data:{
            'field':field,
        }
    })
}
//获取单个商品数据
export function GetAloneData(shopid,field){
    return myRequest({
        url:'/api/shop/getalonedata',
        data:{
			'id':shopid,
            'field':field,
        }
    })
}
//递增商品浏览数量
export function UpShopSeesum(shopid){
    return myRequest({
        url:'/api/shop/addsum',
        data:{
			'id':shopid,
        }
    })
}
