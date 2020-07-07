const express = require('express'); //引入express模块
const app = express(); //得到express操作对象

const hostname = "0.0.0.0"; //起服务时 监听任意ip 保证外网也能访问服务
const port = 5555; //服务端口

const http = require('http'); //引入http服务模块;

const server = http.createServer(app); //创建服务对象



//接口
const LR = require('./lr');




app.use(express.static('public'));   // 设置 express 静态文件 目录 
app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 

// 处理跨域方法   CORS 处理方式 
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});


app.use('/lr',LR);

server.listen(port,hostname,()=>{
    console.log(`my server is run in http://${hostname}:${port}`);
})