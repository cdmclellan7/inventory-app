const Category = require('../models/category');

//Display Site Home Page
exports.index = function(req, res) {
    res.send('NI: Site Home Page')
};

//Display list of all Categories.
exports.category_list = function(req, res) {
    res.send('NI');
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