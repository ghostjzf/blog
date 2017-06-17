//应用程序的启动入口页

//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies
var Cookies = require('cookies');
//创建一个app应用 等同于 http.createServer();
var app = express();

var User = require('./models/User');
//设置静态资源托管
//当用户访问的url以/public开始,那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前所使用的模板引擎
//第一个参数模板引擎的名称，同时也是模板引擎的后缀，第二个参数表示用于解析模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册使用的模板引擎，第一个参数必须是 'views engine', 第二个参数是app.engine方法中定义的
// 模板引擎名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中需要取消模板缓存
swig.setDefaults({cache: false});
/*
* 首页
* req  request对象
* res  response对象
* next 函数
* */
//首页的路由绑定
//app.get('/', function(req,res,next){
//
////res.send("<h1>这里是首页面！</h1>")
//    /*
//    *读取views目录下指定的文件，解析并返回给客户端
//    * 第一个参数：表示模板的文件，相对于views目录
//    * 第二个参数：传递给模板使用的数据
//    * */
//    res.render('index');
//});

//bodyParser设置
app.use(bodyParser.urlencoded({ extended:true }));
//设置coolie
app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录的用户类型,是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo){
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        }
    }else{
        next();
    }
    //console.log(req.cookies.get('userInfo'));

});

//根据不同的功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27017/blog', function(err){
    if(err){
        console.log("连接数据库失败！");
    }else{
        console.log("连接数据库成功！");
        //监听http请求
        app.listen(8081);
    }
});

