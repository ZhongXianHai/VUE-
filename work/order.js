import { myRequest } from "../common/js/api.js";

/**
 * 获取用户所有订单状态
 * @returns 
 */
export function GetOrderStat(){
    return myRequest({
        url:'/api/order/getseesumdata',
        data:{}
    })
}
