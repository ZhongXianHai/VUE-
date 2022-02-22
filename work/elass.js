import { myRequest } from "../common/js/api.js";

//获取某商品全部sku数据
export function GetAllData(field){
    return myRequest({
        url:'/api/elass/getalldata',
        data:{
            'field':field,
        }
    })
}