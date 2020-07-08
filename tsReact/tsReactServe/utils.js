//链接数据库

const config = {
    hostname:'localhost',
    port:'27017',
    dbName:'tsReact'
}

const CONN_DB_STR = `mongodb://${config.hostname}:${config.port}/${config.dbName}`; //链接数据地址

const {MongoClient} = require('mongodb'); //链接数据的对象

exports.conn = (call)=>{
    MongoClient.connect(CONN_DB_STR,(err,db)=>{
        if(err){
            call(err,null);
            console.log('数据库错误:',err);
        }else{
            call(null,db);
            console.log('数据库连接成功')
        }
    })
}

//数据库错误时
exports.setError=(err,res,db)=>{
    if(err){
        res.json({
            statusCode:500,
            msg:"数据库错误",
            err
        })
        db.close();
        throw err;
    }
};


/*
*** 加密 模块 crypto  Node 
*/ 

var crypto = require("crypto"); // node 模块 

// 加密函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "lixiaobaiIsVeryGood";
// daydayup   daydayup+wuhan1807
exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 