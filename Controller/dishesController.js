//new
const asyncHandler = require('express-async-handler');
const DishesModel = require('../Model/DishesModel');

exports.postDishes = asyncHandler(async (req, res) => {
    const { price, dishes, category, description, Itemnumber, weight, purity, features, details } = req.body;
    const files = req.files;
    const image = files.map((file)=>file.filename)   
    try {
        const newDish = await DishesModel.create({
            price,
            dishes,
            category, // Ensure 'category' is correctly received
            description,
            Itemnumber,
            weight,
            purity,
            features,
            details,
            image
        });

        res.status(200).json({
            message: 'Dish posted successfully',
            dish: newDish
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while posting the dish');
    }
});


exports.getDishes = async (req, res) => {
    const { search, category } = req.query;

    try {
        let query = {};

        if (search) {
            query.dishes = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        const response = await DishesModel.find(query)
            .populate({
                path: 'category',
                populate: {
                    path: 'maincategoriesData',
                    model: 'MaincategoriesData'
                }
            })
            .exec();

        // Log the response to ensure the data structure is correct
        console.log('Dishes response:', response);

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching dishes:', err);
        res.status(500).send('An error occurred while fetching data');
    }
};




// WORKING
// exports.getDishes = async (req, res) => {
//     const { search, category } = req.query;

//     try {
//         let query = {};

//         if (search) {
//             query.dishes = { $regex: search, $options: 'i' };
//         }

//         if (category) {
//             query.category = category; // Use the category ID from the query parameter
//         }

//         const response = await DishesModel.find(query)
//             .populate({
//                 path: 'category',
//                 populate: {
//                     path: 'maincategoriesData',
//                     model: 'MaincategoriesData'
//                 }
//             })
//             .exec();

//         res.status(200).json(response);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('An error occurred while fetching data');
//     }
// };




//orginal
    // exports.getDishes = async (req, res) => {
    //     const search = req.query.search;
    //     console.log(search, "the search term");

    //     try {
    //         let query = {};
    //         if (search) {
    //             query = {
    //                 $or: [
    //                     { dishes: { $regex: search, $options: 'i' } }
    //                 ]
    //             };
    //         }

    //         const response = await DishesModel.find(query)
    //             .populate({
    //                 path: 'category',
    //                 populate: {
    //                     path: 'maincategoriesData',
    //                     model: 'MaincategoriesData'
    //                 }
    //             })
    //             .exec();

    //         console.log(response, "the response");
    //         res.status(200).json(response);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('An error occurred while fetching data');
    //     }
    // };






exports.getDishesById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await DishesModel.findById(id);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
});

exports.putDishesById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { price, dishes, category, description, Itemnumber, weight, purity, features, details } = req.body;
  
    console.log('Received category:', category); // Debug line
  
    // Process files if present
    const files = req.files || [];
    const image = files.map(file => file.filename);
  
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        console.error('Invalid ID format.');
        return res.status(400).json({ err: 'Invalid ID format.' });
      }
  
      // Check if the dish exists
      const dish = await DishesModel.findById(id);
      if (!dish) {
        console.error('Dish not found.');
        return res.status(404).json({ err: 'Dish not found.' });
      }
  
      const update = {
        price,
        dishes,
        category, // Validate this field
        description,
        Itemnumber,
        weight,
        purity,
        features,
        details,
        ...(files.length && { image })
      };
  
      const updatedData = await DishesModel.findByIdAndUpdate(id, { $set: update }, { new: true });
      res.status(200).json(updatedData);
    } catch (err) {
      console.error('Error while updating data:', err);
      res.status(500).json({ err: 'Error while updating data', message: err.message });
    }
  });



// exports.putDishesById = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { price, dishes, category, description, Itemnumber, weight, purity, features, details } = req.body;
//     const files = req.files;
//     const image = files.map((file)=>file.filename)       
//     try {
//         const update = {
//             price,
//             dishes,
//             category,
//             description,
//             Itemnumber,
//             weight,
//             purity,
//             features,
//             details,
//             image
//         };
//         const updatedData = await DishesModel.findByIdAndUpdate(id, { $set: update }, { new: true });
//         res.status(200).json(updatedData);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Error while updating data' });
//     }
// });

exports.deleteDishesById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const response = await DishesModel.findByIdAndDelete(id);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'An error occurred while deleting data' });
    }
});




// var asynchandler = require('express-async-handler');
// var dishesModel = require('../Model/DishesModel')

// exports.postDishes = asynchandler(async (req, res) => {
//     const { price, dishes, categories,description,Itemnumber,weight,purity,features,details } = req.body;
//     const image = req.file ? req.file.filename : undefined;

//     try {
//         const newDish = await dishesModel.create({
//             price: price,
//             dishes: dishes,
//             description:description,
//             categories: categories,
//             image: image,
//             Itemnumber:Itemnumber,
//             weight:weight,
//             purity:purity,
//             features:features,
//             details:details
//         });
//         res.status(200).json({
//             message: 'Dishes posted successfully',
//             dish: newDish
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred while posting Dishes');
//     }
// });


// exports.getDishes = async (req, res) => {
//     const search = req.query.search;
//     console.log(search, "the search term"); // Log the search term
//     try {
//         const query = {};
//         if (search) {
//             query.$or = [
//                 { categories: { $regex: search, $options: 'i' } }
//             ];
//         }
//         console.log(query, "the query"); // Log the formed query
//         const response = await dishesModel.find(query);
//         console.log(response, "the response"); // Log the response from the database
//         res.status(200).json(response);
//     } catch (err) {
//         console.error(err); // Log any errors
//         res.status(500).send('An error occurred while fetching data');
//     }
// };



// exports.getDishesById = asynchandler(async(req,res)=>{
//     const {id} = req.params
//     // console.log(req.params, 'the id is here')
//     try{
//         const response = await dishesModel.findById(id)
//         res.status(200).json(response)
        
//     }catch(err){
//         console.log(err)
//         res.status(500).send('An error occured while fetching data')
//     }
// })

// exports.putDishesById = asynchandler(async(req, res)=>{
//     const {id} = req.params;
//     const {categories, price, dishes,description,Itemnumber,weight,purity,features,details} = req.body;
//     const image = req.file ? req.file.filename : undefined;
//     console.log(req.body)
   

//     try{
    
//         const update = {
//             categories:categories,
//            price:price,
//            dishes:dishes,
//            description:description,
//            image:image,
//            Itemnumber:Itemnumber,
//            weight:weight,
//            purity:purity,
//            features:features,
//            details:details
//         }
//         const updateData = await dishesModel.findByIdAndUpdate(id, {$set:update}, {new:true})
//         res.status(200).json(updateData)
       
//     }catch(err){
//         res.status(500).json({err:'error while updating data'})
//     }
// })

// exports.deleteDishesById = asynchandler(async(req, res)=>{
//     const {id} = req.params
//     try{
//         const response = await dishesModel.findByIdAndDelete(id)
//         res.status(200).json(response)
//     }catch(err){
//         console.log(err)
//     }
// })





// var asynchandler = require('express-async-handler');
// var dishesModel = require('../Model/DishesModel')

// exports.postDishes = asynchandler(async (req, res) => {
//     const { price, dishes, categories, description, Itemnumber, weight, purity, details, maincategories } = req.body;
//     const image = req.file ? req.file.filename : undefined;

//     try {
//         const newDish = await dishesModel.create({
//             price: price,
//             dishes: dishes,
//             description: description,
//             categories: categories,
//             image: image,
//             Itemnumber: Itemnumber,
//             weight: weight,
//             purity: purity,
//             details: details,
//             maincategories: maincategories,
//         });
//         res.status(200).json({
//             message: 'Dishes posted successfully',
//             dish: newDish
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('An error occurred while posting Dishes');
//     }
// });


// exports.getDishes = async (req, res) => {
//     const { maincategories, categories } = req.query;
//     console.log(maincategories, "the maincategories");
//     console.log(categories, "the categories");

//     try {
//         const query = {};

//         if (maincategories && categories) {
//             query.$and = [
//                 { maincategories: { $regex: maincategories, $options: 'i' } },
//                 { categories: { $regex: categories, $options: 'i' } }
//             ];
//         } else if (maincategories) {
//             query.maincategories = { $regex: maincategories, $options: 'i' };
//         } else if (categories) {
//             query.categories = { $regex: categories, $options: 'i' };
//         }

//         console.log(query, "the query");
//         const response = await dishesModel.find(query);

//         console.log(response, "the response");
//         res.status(200).json(response);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('An error occurred while fetching data');
//     }
// };



// exports.getDishesById = asynchandler(async(req,res)=>{
//     const {id} = req.params
//     // console.log(req.params, 'the id is here')
//     try{
//         const response = await dishesModel.findById(id)
//         res.status(200).json(response)
        
//     }catch(err){
//         console.log(err)
//         res.status(500).send('An error occured while fetching data')
//     }
// })

// exports.putDishesById = asynchandler(async(req, res)=>{
//     const {id} = req.params;
//     const {categories, price, dishes,description,Itemnumber,weight,purity,features,details,maincategories} = req.body;
//     const image = req.file ? req.file.filename : undefined;
//     console.log(req.body)
   

//     try{
    
//         const update = {
//             maincategories:maincategories,
//             categories:categories,
//            price:price,
//            dishes:dishes,
//            description:description,
//            image:image,
//            Itemnumber:Itemnumber,
//            weight:weight,
//            purity:purity,
//            features:features,
//            details:details
//         }
//         const updateData = await dishesModel.findByIdAndUpdate(id, {$set:update}, {new:true})
//         res.status(200).json(updateData)
       
//     }catch(err){
//         res.status(500).json({err:'error while updating data'})
//     }
// })

// exports.deleteDishesById = asynchandler(async(req, res)=>{
//     const {id} = req.params
//     try{
//         const response = await dishesModel.findByIdAndDelete(id)
//         res.status(200).json(response)
//     }catch(err){
//         console.log(err)
//     }
// })
