import { myRequest } from "../common/js/api.js";

/**
 * 获取sku名称
 * @returns 
 */
export function GetSkuName(shopid){
    return myRequest({
        url:'/api/speci/getalonedata',
        data:{
            'id':shopid,
        }
    })
}
