import qs from 'qs';
const ajax = function(ctx,url,methods='GET',data={},headers = {'Content-Type': 'application/x-www-form-urlencoded',withCredentials:true,'Access-Control-Allow-Credentials': true}){
    let token = localStorage.getItem('token');
    if(token != null){
        headers = Object.assign(headers,{token:token});
    }
    return new Promise((resolve,reject)=>{
        let header_get = {withCredentials:true};
        if(token != null){
            header_get = Object.assign(header_get,{token:token});
        }
        if(methods == 'GET'){
            ctx.$axios.get(url,{headers:header_get}).then((res)=>{
                if(res.data.errCode == 0){
                    resolve(res)
                }else if(res.data.errCode == 600){
                    ctx.$Modal.info(
                        {
                            title: '登录超时',
                            content: '用户登录超时或身份验证失败,请重新登录',
                            onOk(){
                                ctx.$router.push({path:'/login'})
                            }
                        }
                    );
                }else{
                    reject(res)
                }
            }).catch((err)=>{
                reject(err)
            })
        }else if(methods == 'POST'){
            const options = {
                method: 'POST', 
                headers: headers,
                data: qs.stringify(data, {arrayFormat: 'repeat'}),
                url,
              };
            ctx.$axios(options).then((res)=>{
                if(res.data.errCode == 0){
                    resolve(res)
                }else if(res.data.errCode == 600){
                    ctx.$Modal.info(
                        {
                            title: '登录超时',
                            content: '用户登录超时或身份验证失败,请重新登录',
                            onOk(){
                                ctx.$router.push({path:'/login'})
                            }
                        }
                    );
                }else{
                    reject(res)
                }
            }).catch((err)=>{
                reject(err)
            });
        }
    })
}
export default ajax