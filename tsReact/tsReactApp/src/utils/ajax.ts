import Axios from 'axios';
import {message} from 'antd'


	
// Axios.defaults.baseURL = 'https://3e2t688318.wicp.vip'; //请求头 内网穿透花生壳
Axios.defaults.baseURL = 'http://127.0.0.1:5555'; //请求头 内网穿透花生壳
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

const key = 'axiosLoadingStr'

//设置请求拦截器
Axios.interceptors.request.use((config)=>{
    message.loading({content:'请求中',key,duration:0})
    return config
},(err)=>{
    message.error('未知错误');
    return Promise.reject(err);
})


  //设置响应拦截器
  Axios.interceptors.response.use(function (response) {
    message.destroy()
    return response;
  }, function (error) {
    message.destroy()
    message.error('未知错误');
    return Promise.reject(error);
  })

  export default Axios; //导出axios