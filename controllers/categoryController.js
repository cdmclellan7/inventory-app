const Category = require('../models/category');
const Item = require('../models/item');

const async = require('async');
const validator = require('express-validator');

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
exports.category_detail = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id)
                .exec(callback);
        },
        category_items: function(callback) {
            Item.find({'category': req.params.id})
                .sort([['name', 'ascending']])
                .exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category==null) {
            const error = new Error('Category not found');
            error.status = 404;
            return next(error);
        }
        res.render('category_detail', {title: 'Instrument Family: ' +results.category.name, category: results.category, category_items: results.category_items });
    });
};

//Display Category create form on GET.
exports.category_create_get = function(req, res) {
    res.render('category_form', {title: 'Create Instrument Family'});
};

//Handle Category create on POST.
exports.category_create_post = [
    validator.body('name', 'Category name required').trim().isLength({min: 1}),
    validator.body('description').optional({checkFalsy: true}),
    validator.sanitizeBody('name').escape(),
    validator.sanitizeBody('description').escape(),

    (req, res, next) => {
        let category = new Category({
            name: req.body.name,
            description: req.body.description
        });
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            res.render('category_form', {title: 'Create Instrument Family', category: category, errors: errors.array()});
            return;
        } else {
            category.save(function(err) {
                if (err) { return next(err); }
                res.redirect(category.url);
            })
        }
    }
];

//Display Category delete form on GET.
exports.category_delete_get = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        }, 
        category_items: function(callback) {
            Item.find({'category': req.params.id}).exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category===null) {
            res.redirect('/inventory/categories'); 
        }
        res.render('category_delete', {title: 'Delete Category', category: results.category, category_items: results.category_items});
    });
};

//Handle Category delete on POST.
exports.category_delete_post = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.body.categoryid).exec(callback)
        }, 
        category_items: function(callback) {
            Item.find({'category': req.body.categoryid}).exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.category_items.length > 0) {
            res.render('category_delete', {title: 'Delete Category', category: results.category, category_items: results.category_items});
            return;
        } else {
            Category.findByIdAndDelete(req.body.categoryid, (err) => {
                if (err) { return next(err); }
                res.redirect('/inventory/categories');
            });
        }
    });
};

//Display Category update form on GET.
exports.category_update_get = function(req, res, next) {
    Category.findById(req.params.id, function(err, category) {
        if (err) { return next(err); }
        if (category===null) {
            let error = new Error("Category not found");
            error.status = 404;
            return next(error);
        }
        res.render('category_form', {title: 'Update Category', category: category});
    });
};

//Handle Category update on POST.
exports.category_update_post = [
    validator.body('name', 'Category name required').trim().isLength({min: 1}),
    validator.body('description').optional({checkFalsy: true}),
    validator.sanitizeBody('name').escape(),
    validator.sanitizeBody('description').escape(),   
    
    (req, res, next) => {
        let category = new Category({
            name: req.body.name,
            description: req.body.description,
            _id:req.params.id
        });
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            res.render('category_form', {title: 'Update Category', category: category, errors: errors.array()});
        } else {
            Category.findByIdAndUpdate(req.params.id, category, {}, function(err, theCategory) {
                if (err) { return next(err); }
                res.redirect(theCategory.url);
            });
        }
    }
];