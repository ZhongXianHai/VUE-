import { myRequest } from "../common/js/api.js";

//获取某商品全部sku数据
export function GetWholeData(shopid,field){
    return myRequest({
        url:'/api/speciattr/getwholedata',
        data:{
			'id':shopid,
            'field':field,
        }
    })
}