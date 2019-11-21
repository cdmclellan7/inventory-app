const Item = require('../models/item');
const Category = require('../models/category');

const async = require('async');
const validator = require('express-validator');

//Display list of all Items.
exports.item_list = function(req, res, next) {
    Item.find()
        .sort([['name', 'ascending']])
        .populate('category')
        .exec(function(err, list_items) {
            if (err) { return next(err); }
            res.render('item_list', {title: 'Musical Instrument List', item_list: list_items});
        });
};

//Display detail page for a specific Item.
exports.item_detail = function(req, res, next) {
    Item.findById(req.params.id)
        .populate('category')
        .exec(function(err, item) {
            if (err) { return next(err); }
            if (item==null) {
                const error = new Error('Item not found'); 
                error.status = 404;
                return next(error);
            }
            res.render('item_detail', {title: 'Musical Instrument: ' +item.name, item: item});
        });
};

//Display Item create form on GET.
exports.item_create_get = function(req, res, next) {
    Category.find({}, function(err, categories) {
        if (err) {return next(err); }
        res.render('item_form', {title: 'Create Musical Instrument', categories: categories});
    })
};

//Handle Item create on POST.
exports.item_create_post = [
    validator.body('name', 'Item name required').trim().isLength({min: 1}),
    validator.body('description').optional({checkFalsy: true}),
    validator.body('category', 'Category required').trim().isLength({min: 1}),
    validator.body('price', 'Price required').trim().isLength({min: 1}),
    validator.body('stock', 'Number in stock required').trim().isLength({min: 1}),

    validator.sanitizeBody('*').escape(),

    (req, res, next) => {
        let item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock
        });
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            Category.find({}, function(err, categories) {
                if (err) { return next(err); }
                res.render('item_form', {title: 'Create Musical Instrument', item: item, categories: categories, errors: errors.array()});
            })
        } else {
            item.save(function(err) {
                if (err) { return next(err); }
                res.redirect(item.url);
            });
        }
    }
];

//Display Item delete form on GET.
exports.item_delete_get = function(req, res, next) {
    Item.findById(req.params.id, (err, item) => {
        if (err) { return next(err); }
        if (item===null) {
            res.redirect('/inventory/items');
        }
        res.render('item_delete', {title: 'Delete Item', item: item});
    });
};

//Handle Item delete on POST.
exports.item_delete_post = function(req, res, next) {
    Item.findByIdAndDelete(req.body.itemid, (err) => {
        if (err) { return next(err); }
        res.redirect('/inventory/items');
    });
};

//Display Item update form on GET.
exports.item_update_get = function(req, res, next) {
    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id).populate('category').exec(callback)
        },
        categories: function(callback) {
            Category.find(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.item===null) {
            let error = new Error("Item not found");
            error.status  = 404;
            return next(error);
        }
        res.render('item_form', {title: 'Update Item', item: results.item, categories: results.categories});
    })
};

//Handle Item update on POST.
exports.item_update_post = [
    validator.body('name', 'Item name required').trim().isLength({min: 1}),
    validator.body('description').optional({checkFalsy: true}),
    validator.body('category', 'Category required').trim().isLength({min: 1}),
    validator.body('price', 'Price required').trim().isLength({min: 1}),
    validator.body('stock', 'Number in stock required').trim().isLength({min: 1}),

    validator.sanitizeBody('*').escape(),
    
    (req, res, next) => {
        let item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            _id:req.params.id
        });
        const errors = validator.validationResult(req); 
        if (!errors.isEmpty()) {
            Category.find({}, function(err, categories) {
                if (err) { return next(err); }
                res.render('item_form', {title: 'Update Item', item: item, categories: categories, errors: errors.array()});
            })
        } else {
            Item.findByIdAndUpdate(req.params.id, item, {}, function(err, theItem) {
                res.redirect(theItem.url);
            });
        }   
    }
];