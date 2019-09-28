let file_down = (ctx,url, title)=>{
    ctx.$axios({
        method: 'get',
        url,
        headers: {
            'Content-Type': 'application/json',
            withCredentials:true,
            'Access-Control-Allow-Credentials': true
        },
        responseType: 'arraybuffer'
    }).then(res => {
        let headers = res.headers;
        let blob = new Blob([res.data], {
            type: headers['content-type']
        });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        if (!title) {
            const fileName = headers['content-disposition'];
            title = fileName.includes('filename=') ? fileName.split('=')[1] : '下载的表单文件';
        }
        link.download = title;
        link.click();
    });
}



export {
    file_down
}