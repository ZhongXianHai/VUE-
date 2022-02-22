import { myRequest } from "../common/js/api.js";

/**
 * 请求banner图库数据
 * @returns 
 */

//获取首页banner
export function GetIndexBanner(type){
    return myRequest({
        url:'/api/banner/getwholedata',
        data:{
            'type':type,
        }
    })
}

//获取首页导航数据
export function GetIndexNavig(type,field){
    return myRequest({
        url:'/api/banner/getsumdata',
        data:{
            'type':type,
			'field':field
        }
    })
}