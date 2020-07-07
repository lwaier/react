const express = require('express')
const router = express.Router(); //得到router路由
const {conn,setError} = require('./utils')

let {ObjectID} = require("mongodb"); //得到创建id的方法 接受前端传入的id 使用objectID创建为数据库id 然后操作增删改查

//数据库查
router.get('/xiaobai',(req,res)=>{
    console.log(2342,'');
    conn((err,db)=>{
        if(!err){
           db.collection('user').find({}).toArray((err,result)=>{
                res.json({
                    name:'李小白',
                    age:18,
                    arr:result
                })
                db.close()
           })
        }
    })
})

//数据库增
router.get('/xiaobaiz',(req,res)=>{
    conn((err,db)=>{
        if(!err){
           db.collection('user').insert([{username:'two',password:'254'},{username:'three',password:'254'}],(err,result)=>{
                res.json({
                    result,
                })
                db.close()
           })
          
        }
    })
})

//数据库删
router.get('/xiaobais',(req,res)=>{

    conn((err,db)=>{
        if(!err){
           db.collection('user').deleteMany({username:'one'},(err,result)=>{
                res.json({
                    result,
                })
                db.close()
           })
          
        }
    })
})


//数据库改
router.get('/xiaobaig',(req,res)=>{
    conn((err,db)=>{
        if(!err){
           db.collection('user').updateMany({username:'three'},{$set:{username:'ten'}},(err,result)=>{
               console.log(err,'');
            res.json({
                result,
            })
            db.close()
           })
        }
    })
})



//存入用户名
router.post('/register',(req,res)=>{
    console.log(req.body,'请求');
    const username = req.body.username; //获取用户传入的用户名
    const password = req.body.password; //获取用户传入的密码
    conn((err,db)=>{
        if(!err){
            db.collection('user').findOne({username},(err,result)=>{
                if(!err){
                    if(result){
                        res.json({
                            errInfo:'该用户名已存在',
                            code:'000001'
                        })
                    }else{
                        db.collection('user').insert({username,password},(err)=>{
                            setError(err,res,db)
                            res.json({
                                errInfo:'注册成功',
                                code:'000000'
                            })
                    })
                }
            }   
            })
        }
    })
})


module.exports = router; 