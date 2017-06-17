/**
 * Created by Administrator on 2017/4/4.
 */

//加载数据库模块
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User', usersSchema);