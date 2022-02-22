import { myRequest } from "../common/js/api.js";

/**
 * 发送短信
 * @returns 
 */
export function GetSms(phone,title,type){
    return myRequest({
        url:'/api/sms/addalonedata',
        data:{
            'phone':phone,
			'title':title,
			'type':type,
        }
    })
}