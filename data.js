var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var multer = require('multer');
let users = [{ "username": "admin", "email": "admin@qq.com", "password": "123456", "confirm": "123456", "phone": "18628977560", "agreement": true, "id": -1 }, { "username": "刘德华", "email": "qq@qq.com", "password": "123456", "confirm": "123456", "phone": "18628977560", "agreement": true, "id": 0 }, { "username": "weiqiang1", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 1 }, { "username": "weiqiangasdf", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 2 }, { "username": "wei", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 3 }, { "username": "weif", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 4 }, { "username": "weiffasdf", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 5 }, { "username": "张三", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 6 }, { "username": "李四", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 7 }, { "username": "王五", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 8 }, { "username": "里的", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 9 }, { "username": "发个", "email": "a@qq.com", "password": "a", "confirm": "a", "phone": "18628977166", "agreement": true, "id": 10 }]
app.use(bodyParser.json({
    type:"application/json"
})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data
let  MD5 = require('md5.js');
const SUCCESS = "0000";
const FAIL = "1000";
const INVALID = "50008";

let tokens = [];
app.post('/login', function(req, res, next) {
    const { username, password } = req.body;
    console.log(username, password);
    console.log(users);
    if (username && password) {
        let user = {};
        const pass = users.some(item => {
            if (item.username === username && item.password === password) {
                user = item;
                return true;
            }
        });
        if (pass) {
            let token =   new MD5().update(username+password).digest('hex'); 
            tokens.push(token);
            let data = { username, token } ;
            res.json({ code: SUCCESS, msg: "登录成功", data: data })
        } else {
            res.json({ code: FAIL, msg: "用户名或者密码不正确！" })
        }
    } else {
        res.json({ code: FAIL, msg: "用户名密码输入不完整！" })
    }

});

app.post("/loginout",function(req,res,next){
    const token = req.headers.token;
    console.log(tokens);
    tokens = tokens.filter( t=>( token!=t ) );
    res.json({code:SUCCESS,msg:"退出成功！"});
})


app.post('/regist', function(req, res, next) {
    const body = req.body;
    if (users.length > 0) {
        for (let item of users) {
            if (item.username == body.username) {
                res.json({ code: FAIL, msg: "该昵称已经注册！" });
                console.log("该昵称已经注册！")
                return;
            }
        }
    }
    body.id = users.length;
    body.key = users.length;
    users.push(req.body);
    res.json({ code: SUCCESS, msg: "操作成功", data: body });
    // next();
});

//权限验证
app.all('*', function(req, res, next) {
    /*res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
    });*/
    const token = req.headers.token;
    if(token && tokens.some( t=>(t==token) ) ){
        next();
    }else{
        res.json({code:INVALID,msg:"token登录失效"})    
    }
});


app.get('/user/list', function(req, res, next) {
    console.log(req.query);
    let { current = 1, pageSize = 3 } = req.query;
    let data = users.slice((current - 1) * pageSize, current * pageSize).map((item) => { 
       /* delete item.password;
        delete item.confirm; */
    return item; })
    let _result = {
        code: "0000",
        msg: "成功",
        pagination: {
            current: current * 1,
            pageSize: pageSize * 1,
            total: users.length
        },
        data
    }
    res.json(_result)
});

app.delete("/user/delete/:id", function(req, res, next) {
    console.log(req.params)
    const id = req.params.id;
    users =  users.filter((item)=>{
        return item.id == id ? false:true;
    });
    res.json({
        code:"0000",
        msg:"删除成功"
    })
});



app.listen(3000)
console.log("listen:3000")