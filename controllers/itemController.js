const Item = require('../models/item');

//Display list of all Categories.
exports.item_list = function(req, res) {
    res.send('NI');
};

//Display detail page for a specific Category.
exports.item_detail = function(req, res) {
    res.send('NI' + req.params.id);
};

//Display Category create form on GET.
exports.item_create_get = function(req, res) {
    res.send('NI');
};

//Handle Category create on POST.
exports.item_create_post = function(req, res) {
    res.send('NI');
};

//Display Category delete form on GET.
exports.item_delete_get = function(req, res) {
    res.send('NI');
};

//Handle Category delete on POST.
exports.item_delete_post = function(req, res) {
    res.send('NI');
};

//Display Category update form on GET.
exports.item_update_get = function(req, res) {
    res.send('NI');
};

//Handle Category update on POST.
exports.item_update_post = function(req, res) {
    res.send('NI');
};