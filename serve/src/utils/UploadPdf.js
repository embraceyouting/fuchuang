//上传pdf接口
import service from "@/service";
export function UploadPdf(res, id) {
    return new Promise((resolve, reject) => {
        // 将上传操作放在 Promise 内部
        // res 拿到 base64 的 pdf
        let pdfBase64Str = res;
        let title = "上传给后端的个人报告";
        var myfile = dataURLtoFile(pdfBase64Str, title + ".pdf"); // 调用一下下面的转文件流函数
        var formdata = new FormData();
        formdata.append("file", myfile); // 文件对象
        // 该接口，直接以 formdata 格式传给后台
        service.post(`/project/${id}`, formdata)
            .then((res) => {
                console.log("上传pdf接口成功", res);
                resolve(res); // 执行 Promise 的 resolve 函数，表示上传成功
            })
            .catch((err) => {
                console.log("上传pdf接口失败", err);
                reject(err); // 执行 Promise 的 reject 函数，表示上传失败
            });
    });
}


/*
将base64转换为文件,接收2个参数，第一是base64，第二个是文件名字
最后返回文件对象
*/
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}




   
