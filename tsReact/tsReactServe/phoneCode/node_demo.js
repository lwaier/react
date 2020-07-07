//秒滴云短信 需要认证资质


const md5 = require('md5-node');                                    // 调用接口需要引入MD5模块。安装模块：npm install md5-node --save
const request = require("request");

const ACCOUNT_SID = 'b213ba6eba9adea4f9b293d3955cdb80';             // 开发者ACCOUNT_SID，请登录sms.miaodiyun.com 获取
const AUTH_TOKEN = '58e544aa4270accf657b9fcf0b41f568';              // 开发者AUTH_TOKEN，请登录sms.miaodiyun.com 获取
const HOST = 'https://openapi.miaodiyun.com/distributor';           // 接口域名
const SEND_SMS_URI = '/sendSMS';                                    // 普通短信发送URL

const to = '15927438400';                                           // 发送手机号，多个手机号，用英文逗号隔开

const templateid = '3284';                                          // 模板ID
const param = '1234';                                               // 短信变量
const timestamp = new Date().getTime();                             // 时间戳
const sig = md5(ACCOUNT_SID + AUTH_TOKEN + timestamp);              // 签名：MD5(ACCOUNT SID + AUTH TOKEN + timestamp)。共32位(小写)

sendSMS(SEND_SMS_URI);

// 短信发送
function sendSMS(url) {
    const data = `?accountSid=${ACCOUNT_SID}&to=${to}&templateid=${templateid}&param=${param}&timestamp=${timestamp}&sig=${sig}`;
    post(url, data);
}

function post(url, data) {
    const options = {
        url: HOST + url + data,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('the response from SMS server is:');
            console.log(body);
            console.log('node demo finished');
        } else {
            console.log(error);
        }
    });
}