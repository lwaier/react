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