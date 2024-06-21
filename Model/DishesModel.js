const mongoose = require('mongoose');

const dishesModel = new mongoose.Schema({
    Itemnumber: { type: String },
    image:[{type: String}],
    price: { type: Number },
    weight: { type: Number },
    dishes: { type: String },
    purity: { type: String },
    features: { type: String },
    details: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesData', required: true }
});

const DishesData = mongoose.model('DishesData', dishesModel);

module.exports = DishesData;
