//这个文件是对axios进行二次封装的文件
//我们封装完之后，axios就会比不封装的功能多
import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const instance = axios.create({
  //1、 配置基础路径和超时限制
  baseURL: '/mock',
  timeout: 20000
});

// 添加进度条信息  nprogress
instance.interceptors.request.use((config) => {
  //请求拦截器当中一般都只去处理成功的，因为几乎不会失败
  //无论是请求拦截器还是响应拦截器 都可以干两件事情 1、修改请求报文和响应报文   2、添加额外功能
  //请求拦截器回调函数，接收一个参数，叫congig，本质就是我们的请求报文
  // 在请求拦截器当中开启进度条（添加功能） nprogress
  Nprogress.start()
  return config
});

instance.interceptors.response.use(
  (response) => {
    //3 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
    Nprogress.done()
    return response.data
  },
  (error) => {
    Nprogress.done()
    //4、统一处理请求错误, 具体请求也可以选择处理或不处理
    alert('请求失败' + error.message || '未知错误')
    //统一处理之后还可以选择是继续让后面还可以处理，还是中断后面的处理
    // return Promise.reject(new Error('请求失败'))
    return new Promise(() => {})  //中断promise链
  }
);


export default instance