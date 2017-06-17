/**
 * Created by Administrator on 2017/6/4.
 */

//加载数据库模块
var mongoose = require('mongoose');
//用户表的结构
var schema = new mongoose.Schema({
    //关联字段-内容分类Id
    category:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'Category'
    },

    //分类标题
    title: String,
    //用户
    user:{
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    //添加时间
    addTime:{
        //类型
        type: Date,
        //引用
        default: new Date()
    },
    //阅读量
    Views:{
        //类型
        type: Number,
        //引用
        default: 0
    },
    //简介
    description: {
        type: String,
        default: ''
    },

    //内容
    content:{
        type: String,
        default: ''
    },

    //评论
    comments:{
        type: Array,
        default: []
    }

});

module.exports = schema;