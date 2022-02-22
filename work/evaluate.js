import { myRequest } from "../common/js/api.js";

//分页获取某一类评论数据
export function GetPageData(shopid,field,sum){
    return myRequest({
        url:'/api/evaluate/getpagedata',
        data:{
			'shopid':shopid,
            'field':field,
			'sum':sum,
        }
    })
}