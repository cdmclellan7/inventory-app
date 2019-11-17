const Item = require('../models/item');

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
exports.item_create_get = function(req, res) {
    res.send('NI');
};

//Handle Item create on POST.
exports.item_create_post = function(req, res) {
    res.send('NI');
};

//Display Item delete form on GET.
exports.item_delete_get = function(req, res) {
    res.send('NI');
};

//Handle Item delete on POST.
exports.item_delete_post = function(req, res) {
    res.send('NI');
};

//Display Item update form on GET.
exports.item_update_get = function(req, res) {
    res.send('NI');
};

//Handle Item update on POST.
exports.item_update_post = function(req, res) {
    res.send('NI');
};