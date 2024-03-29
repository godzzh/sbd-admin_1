import request from '@/utils/request';

// const path = 'http://192.168.3.23:8089';
const path = '/server'

// 获取短信验证码
export async function getCaptcha(mobile){
    return request(`${path}/getCaptcha?mobile=${mobile}`)
}

// 手机号验证码登录
export async function userLogin(params){
    return request(`${path}/managerlogin/login`, {
        method: 'POST',
        data: params,
    })
    // mock数据
    // return request(`/managerlogin/login`, {
    //     method: 'POST',
    //     data: params,
    // })
}


//获取用户基本信息
export async function getUserInfo(){
    return request(`${path}/managercust/getuser`)
    // mock数据
    // return request(`/manager/getUser`)
}

// 获取客户列表
export async function getCustomerList(params){
    // mock数据
    return request(`/customer/getlist`,{
        method: 'POST',
        data: params
    })
}

// 获取客服列表
export async function getCustServiceList(params){
    return request(`${path}/managercust/getcustservice`, {
        method: 'POST',
        data: params
    })
    // mock数据
    return request('/service/getlist', {
        method: 'POST',
        data: params
    })
}

// 新增客服
export async function addCustService(params){
    return request(`${path}/`, {
        method: 'POST',
        data: 'params'
    })
}

// 获取会话分组列表
export async function getAllocateGroupList(params){
    return request(`${path}/managercust/getallgroup`, {
        method: 'POST',
        data: params
    })
}

// 新建会话分组
export async function addAllocateGroup(params){
    return request(`${path}/managercust/addgroupcust`, {
        method: 'POST',
        data: params
    })
}

// 修改会话分组
export async function upAllocateGroup(params){
    return request(`${path}/managercust/updateconver`, {
        method: 'POST',
        data: params
    })
}

// 删除会话分组
export async function delAllocateGrop(id){
    return request(`${path}/managercust/deleteconver?id=${id}`)
}

// 获取员工列表(只有id和name)
export async function getCustServiceAll(){
    return request(`${path}/managercust/getcustall`)
}

// 根据员工id获取其客户的列表(用来查找消息记录)
export async function getCustomerMessageList(id){
    return request(`${path}/managercust/zjyzmessage?id=${id}&state=false`)
}

// 获取超时结束会话时长
export async function getAllocateTimeoutSetting(){
    return request(`${path}`)
}
