const mongoose = require('mongoose');

const dishesModel = new mongoose.Schema({
    Itemnumber: { type: String },
    image: [{ type: String }],
    price: { type: Number },
    ram: { type: String },
    dishes: { type: String },
    internalstorage: { type: String },
    color: { type: String },
    features: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesData', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubcategoriesData' } // Add subcategory reference
});

const DishesData = mongoose.model('DishesData', dishesModel);

module.exports = DishesData;


// const mongoose = require('mongoose');

// const dishesModel = new mongoose.Schema({
//     Itemnumber: { type: String },
//     image:[{type: String}],
//     price: { type: Number },
//     ram: { type: String },
//     dishes: { type: String },
//     internalstorage: { type: String },
//     color: { type: String },
//     features: { type: String },
//     description: { type: String },
//     category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesData', required: true }
// });

// const DishesData = mongoose.model('DishesData', dishesModel);

// module.exports = DishesData;
