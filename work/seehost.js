import { myRequest } from "../common/js/api.js";

//新建用户浏览记录
export function AddUseHost(addtitle){
    return myRequest({
        url:'/api/seehost/adddata',
        data:{
			'addtitle':addtitle,
        }
    })
}
