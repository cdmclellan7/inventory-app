const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        description: {type: String, max: 200},
        category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
        price: {type: String, required: true, max: 50},
        stock: {type: Number, required: true, min: 0}
    }
);

//Virtual for the url
ItemSchema
.virtual('url')
.get(function() {
    return '/items' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);