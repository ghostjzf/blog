/**
 * Created by Administrator on 2017/4/4.
 */

//加载数据库模块
var mongoose = require('mongoose');
//用户表的结构
var schema = new mongoose.Schema({

    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = schema;