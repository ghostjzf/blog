/**
 * Created by Administrator on 2017/6/4.
 */

//加载数据库模块
var mongoose = require('mongoose');
//分类表的结构
var schema = new mongoose.Schema({
    //分类名
    name: String
});

module.exports = schema;