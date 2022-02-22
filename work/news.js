import { myRequest } from "../common/js/api.js";

/**
 * 请求文章词汇数据
 * @returns 
 */

//首页获取内容数据
export function GetIndexSearch(type,field){
    return myRequest({
        url:'/api/news/getwholedata',
        data:{
			'type':type,
            'field':field,
        }
    })
}
