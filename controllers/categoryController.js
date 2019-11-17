const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');

//Display Site Home Page
exports.index = function(req, res) {
    async.parallel({
        category_count: function(callback) {
            Category.countDocuments({}, callback);
        },
        item_count: function(callback) {
            Item.countDocuments({}, callback);
        }
    }, function(err, counts) {
        res.render('index', {title: 'Musical Instrument Store', error: err, data: counts});
    })
};

//Display list of all Categories.
exports.category_list = function(req, res, next) {
    Category.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_categories) {
            if (err) { return next(err); }
            res.render('category_list', {title: 'Instrument Family List', category_list: list_categories});
        });
};

//Display detail page for a specific Category.
exports.category_detail = function(req, res) {
    res.send('NI' + req.params.id);
};

//Display Category create form on GET.
exports.category_create_get = function(req, res) {
    res.send('NI');
};

//Handle Category create on POST.
exports.category_create_post = function(req, res) {
    res.send('NI');
};

//Display Category delete form on GET.
exports.category_delete_get = function(req, res) {
    res.send('NI');
};

//Handle Category delete on POST.
exports.category_delete_post = function(req, res) {
    res.send('NI');
};

//Display Category update form on GET.
exports.category_update_get = function(req, res) {
    res.send('NI');
};

//Handle Category update on POST.
exports.category_update_post = function(req, res) {
    res.send('NI');
};