/**
 * Created by Administrator on 2017/6/4.
 */
//加载数据库模块
var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');

module.exports = mongoose.model('Category', categoriesSchema);