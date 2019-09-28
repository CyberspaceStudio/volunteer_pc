import ajax from './ajax'
// const URLHeader = 'http://192.168.3.51:8080/pc'
// const URLHeader2 = 'http://192.168.3.51:8080/'
const URLHeader = 'https://chachapaofan.cn/pc/'
const URLHeader2 = 'https://chachapaofan.cn/'
const URLHeader3 = 'https://xdvolunteer.xyz/'

// 用户登录
function login_in(ctx,body){
    return ajax(ctx, URLHeader2 + `/login/manager`,'POST',body);
}

// 获取一面已面试人员
function get_first_interview_done(ctx) {
    return ajax(ctx, URLHeader + `/interview/first/done`)
}

function first_interview_without(ctx,page) {
    return ajax(ctx, URLHeader + `/interview/first/without/${page}`)
}

function first_interview_out(ctx,body) {
    return ajax(ctx, URLHeader + `/interview/first/OUT`,'POST',body)
}

function first_interview_PASS(ctx,data) {
    return ajax(ctx, URLHeader + `/interview/first/PASS`,'POST',data)
}

function first_interview_cross(ctx,page) {
    return ajax(ctx, URLHeader + `/interview/first/cross/${page}`)
}

function first_interview_transfer(ctx,id) {
    return ajax(ctx, URLHeader + `/interview/first/transfer/${id}`,'POST')
}

function first_interview_interviewed(ctx) {
    return ajax(ctx, URLHeader + `/interview/first/interviewed`)
}

function first_interview_second(ctx,body) {
    return ajax(ctx, URLHeader + `/interview/first/second/ADMIT`,'POST',body)
}

function first_interview_ADMIT(ctx,body) {
    return ajax(ctx, URLHeader + `/interview/first/member/ADMIT`,'POST',body)
}

function second_interview_without(ctx,page) {
    return ajax(ctx, URLHeader + `/interview/second/without/${page}`)
}

function second_interview_ADMIT(ctx,body) {
    return ajax(ctx, URLHeader + `/interview/second/member/ADMIT`,'POST',body)
}

function second_interview_interviewed(ctx) {
    return ajax(ctx, URLHeader + `/interview/second/interviewed`)
}

function second_interview_OUT(ctx,body) {
    return ajax(ctx, URLHeader + `/interview/second/OUT`,'POST',body)
}

function memeber_list(ctx,page){
    return ajax(ctx,URLHeader + `/member/list/${page}`);
}

function export_list(ctx){
    return ajax(ctx, URLHeader + `/member/export/list`);
}

function export_attendance(ctx){
    return ajax(ctx, URLHeader + `/member/export/attendance`);
}

function export_waitInterview(ctx){
    return ajax(ctx, URLHeader + `/member/export/waitInterview`);
}
function send_message(ctx,time,place,note){
    return ajax(ctx, URLHeader + `/message/send?time=${time}&place=${place}&remarks=${note}`);
}
function uploadImgae(ctx) {
    return new Promise((resolve,reject)=>{
        ctx.$axios.post(URLHeader + '/noteapp/uploadPic/1', this.data, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(()=>{
            resolve();
        }).catch(()=>{
            reject();
        });
    })
}

//获取部员信息
async function get_member_messages(ctx,depart){
    return ajax(ctx, `/pc/get/members/messages?departCode=${depart.departCode}&pageNum=${depart.pageNum}&pageSize=${depart.pageSize}`);
}


export{
    login_in,
    get_first_interview_done,
    first_interview_without,
    first_interview_out,
    first_interview_PASS,
    first_interview_cross,
    first_interview_transfer,
    first_interview_interviewed,
    first_interview_second,
    first_interview_ADMIT,
    second_interview_without,
    second_interview_ADMIT,
    second_interview_interviewed,
    second_interview_OUT,
    memeber_list,
    export_list,
    export_attendance,
    export_waitInterview,
    send_message,
    get_member_messages
}