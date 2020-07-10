const express = require('express')
const router = express.Router(); //得到router路由
const {conn,setError,keys,aesEncrypt,aesDecrypt} = require('./utils')
const {sendCode} = require('./phoneCode/tenxunCode')

let {ObjectID} = require("mongodb"); //得到创建id的方法 接受前端传入的id 使用objectID创建为数据库id 然后操作增删改查
const e = require('express');

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
    const usercode =req.body.usercode
    conn((err,db)=>{
        if(!err){
            db.collection('user').findOne({username},(err,result)=>{
                console.log(result,'');
                if(!err){
                    if(result&&result.password){
                        res.json({
                            errInfo:'该用户名已存在',
                            code:'000001'
                        })
                    }else{
                        db.collection('user').findOne({username},(err,result)=>{
                            if(!err){

                                if(result){
                                    const date = new Date();
                                    const time = date.getTime()-result.date;

                                    if(result.code == usercode){
                                        if(time>30*60*1000){
                                            res.json({
                                                errInfo:'验证码失效',
                                                code:'000003'
                                            })
                                        }else{
                                            console.log('你跟我广州');
                                            db.collection('user').updateOne({username},{$set:{password}},(err)=>{
                                                console.log('你跟我广州');
                                                setError(err,res,db)
                                                res.json({
                                                    errInfo:'注册成功',
                                                    code:'000000'
                                                })
                                            }) 
                                        }
                                        
                                    }else{
                                        res.json({
                                            errInfo:'验证码不正确',
                                            code:'000004'
                                        })
                                    }
                                }else{
                                    //用户可能没有点击获取验证码 此时数据库没有当前的用户记录 直接报错即可
                                    res.json({
                                        errInfo:'验证码不正确',
                                        code:'000004'
                                    })
                                }
                            }
                        })
                }
                }   
            })
        }
    })
})

//登录接口

router.post('/login',(req,res)=>{
    const {username,password,miFlag,autoFlag} = req.body
    // miFlag 是否记住密码 
    // autoFlag 是否是直接登陆
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('user').findOne({username},(err,result)=>{
            setError(err,res,db);
            if(result){
                const passwordDb = result.password; //密码
                
                if(autoFlag){
                    if(password.length!=64){
                        res.json({
                            code:'000008',
                            errInfo:'意外的token'
                        })
                        return;
                    }
                    const passwordJm = aesDecrypt(password,keys).split('-')[0]
                    const date = new Date();
                    const time = date.getTime()-result.autoDate;
                    if(passwordJm==passwordDb){
                        if(time>6*1000){
                            //直接登陆7天失效 
                            res.json({
                                errInfo:'距离上次密码登陆已有7天,直接登陆失效',
                                code:'000007'
                            }) 
                        }else{ 
                            res.json({
                                code:'000000',
                                errInfo:'登录成功',
                            })
                        }
                    }else{
                        res.json({
                            code:'000006',
                            errInfo:'密码错误'
                        }) 
                    }
                }else{
                    if(password == passwordDb){
                        const passwordMi = aesEncrypt(password+'-'+new Date().getTime(),keys)
                        if(miFlag){
                            //如果传入记住密码则存入时间戳入数据库
                            const autoDate = new Date().getTime(); //当前的时间戳
                            db.collection('user').updateOne({username},{$set:{autoDate}},(err,result)=>{
                                setError(err,res,db)
                                res.json({
                                    code:'000000',
                                    errInfo:'登录成功',
                                    result:miFlag?passwordMi:null, //加密的密码返回给用户(当用户点记住密码时返回)
                                })
                            })
                        }else{
                            res.json({
                                code:'000000',
                                errInfo:'登录成功',
                                result:miFlag?passwordMi:null, //加密的密码返回给用户(当用户点记住密码时返回)
                            })
                        }
                    }else{
                        res.json({
                            code:'000006',
                            errInfo:'密码错误'
                        })
                    }
                }
            }else{
                res.json({
                    code:'000005',
                    errInfo:'用户名错误'
                })
            }
        })
    })
})

//快速登录接口
router.post('/fastLogin',(req,res)=>{
    const {username,usercode} = req.body;
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('user').findOne({username},(err,result)=>{
            setError(err,res,db)
            if(result){

                const date = new Date();
                const time = date.getTime()-result.dateFastLogin;

                if(result.codeFastLogin == usercode){
                    if(time>30*60*1000){
                        res.json({
                            errInfo:'验证码失效',
                            code:'000003'
                        })
                    }else{
                        res.json({
                            code:'000000',
                            errInfo:'登录成功',
                        })
                    }
                }else{
                    res.json({
                        errInfo:'验证码不正确',
                        code:'000004'
                    })
                }
            }else{
                res.json({
                    code:'000005',
                    errInfo:'用户名错误'
                })
            }
        })
    })
})

//获取短信验证码
router.post('/getCode',(req,res)=>{
    const username = req.body.username
    const fastLoginCode = req.body.fastLoginCode; //是否是快速登录获取验证码的接口
    const msg = Math.floor(Math.random()*1000000) ; //随机验证码
    sendCode(username,msg,(result)=>{
        if(JSON.parse(result).SendStatusSet[0].Code == 'Ok'){
            conn((err,db)=>{
                if(!err){
                    db.collection('user').findOne({username},(err,result)=>{
                        const date = new Date().getTime(); //当前的时间戳
                        let obj = {}
                        if(fastLoginCode){
                            obj={codeFastLogin:msg,dateFastLogin:date}
                        }else{
                            obj={code:msg,date}
                        }
                        console.log(obj,'');
                        if(result){
                            db.collection('user').updateOne({username},{$set:obj},(err)=>{
                                if(!err){
                                    res.json({
                                        code:'000000',
                                        errInfo:'短信发送成功',
                                        result:msg,
                                    })
                                }else{
                                    res.json({
                                        code:'000002',
                                        errInfo:'短信发送失败',
                                    })
                                }
                            })
                        }else{
                            db.collection('user').insert({username,code:msg,date},(err)=>{
                                if(!err){
                                    res.json({
                                        code:'000000',
                                        errInfo:'短信发送成功',
                                        result:msg,
                                    })
                                }else{
                                    res.json({
                                        code:'000002',
                                        errInfo:'短信发送失败',
                                    })
                                }
                            })
                        }
                    })
                }
            })

        }else{
            res.json({
                code:'000002',
                errInfo:'短信发送失败',
            })
        }
    }); //发送验证码
})


module.exports = router; 