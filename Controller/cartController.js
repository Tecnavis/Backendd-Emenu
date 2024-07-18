const asyncHandler = require('express-async-handler');
const Cart = require('../Model/CartModel');
const DishesModel = require('../Model/DishesModel');

// POST - Add a dish to the cart
exports.postCart = asyncHandler(async (req, res) => {
    try {
        const { dishes_id, image, price, dishes } = req.body;

        const dish = await DishesModel.findById(dishes_id);
        if (!dish) {
            return res.status(404).json({
                status: 404,
                message: 'Dish not found'
            });
        }

        const existingCartItem = await Cart.findOne({ dishes_id });

        if (existingCartItem) {
            return res.status(409).json({
                status: 409,
                message: 'Dish is already in the cart'
            });
        }

        const newCartItem = new Cart({
            dishes_id,
            image,
            price,
            dishes
        });

        await newCartItem.save();

        return res.status(201).json({
            status: 201,
            message: 'Dish added to the cart successfully',
            cartItem: newCartItem
        });
    } catch (error) {
        console.error('Error adding dish to cart:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
});
// exports.postCart = asyncHandler(async (req, res) => {
//     try {
//         const { dishes_id } = req.body;

//         const dish = await DishesModel.findById(dishes_id);
//         if (!dish) {
//             return res.status(404).json({
//                 status: 404,
//                 message: 'Dish not found'
//             });
//         }

//         const existingCartItem = await Cart.findOne({ dishes_id });

//         if (existingCartItem) {
//             return res.status(409).json({
//                 status: 409,
//                 message: 'Dish is already in the cart'
//             });
//         }

//         const newCartItem = new Cart({
//             dishes_id,
//             image: dish.image,
//             price: dish.price,
//             dishes: dish.dishes
//         });

//         await newCartItem.save();

//         return res.status(201).json({
//             status: 201,
//             message: 'Dish added to the cart successfully',
//             cartItem: newCartItem
//         });
//     } catch (error) {
//         console.error('Error adding dish to cart:', error);
//         return res.status(500).json({
//             status: 500,
//             message: 'Internal Server Error'
//         });
//     }
// });

// GET - Fetch all cart items with dish details
exports.getCart = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        const cartItem = await Cart.findById(cartId)
            .populate('dishes_id', ['image', 'price', 'dishes']); // Populate fields from DishesData

        if (!cartItem) {
            return res.status(404).json({
                status: 404,
                message: 'Cart item not found'
            });
        }

        res.status(200).json({
            status: 200,
            cartItem: cartItem
        });
    } catch (error) {
        console.error('Error fetching cart item:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
});


// PUT - Update quantity of a cart item
exports.updateCart = asyncHandler(async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({
            message: 'Cart item updated successfully',
            cartItem
        });
    } catch (err) {
        console.error('Error updating cart item:', err);
        res.status(500).send('An error occurred while updating the cart item');
    }
});

// DELETE - Remove a cart item
exports.deleteCart = asyncHandler(async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const cartItem = await Cart.findByIdAndDelete(cartItemId);

        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (err) {
        console.error('Error deleting cart item:', err);
        res.status(500).send('An error occurred while deleting the cart item');
    }
});


// const asyncHandler = require('express-async-handler');
// const Cart = require('../Model/CartModel');
// const DishesModel = require('../Model/DishesModel');

// exports.postCart = asyncHandler(async (req, res) => {
//     try {
//         const { dishes_id } = req.body;

//         const dish = await DishesModel.findById(dishes_id);
//         if (!dish) {
//             return res.status(404).json({
//                 status: 404,
//                 message: 'Dish not found'
//             });
//         }

//         const existingCartItem = await Cart.findOne({ dishes_id });

//         if (existingCartItem) {
//             return res.status(409).json({
//                 status: 409,
//                 message: 'Dish is already in the cart'
//             });
//         }

//         const newCartItem = new Cart({ dishes_id });
//         await newCartItem.save();

//         return res.status(201).json({
//             status: 201,
//             message: 'Dish added to the cart successfully'
//         });
//     } catch (error) {
//         console.error('Error adding dish to cart:', error);
//         return res.status(500).json({
//             status: 500,
//             message: 'Internal Server Error'
//         });
//     }
// });

// exports.getCart = asyncHandler(async (req, res) => {
//     try {
//         const cartItems = await Cart.find({})
//             .populate({
//                 path: 'dishes_id',
//                 model: 'DishesData'
//             })
//             .exec();

//         res.status(200).json(cartItems);
//     } catch (err) {
//         console.error('Error fetching cart items:', err);
//         res.status(500).send('An error occurred while fetching cart items');
//     }
// });

// exports.updateCart = asyncHandler(async (req, res) => {
//     try {
//       const cartItemId = req.params.id;
//       const { quantity } = req.body;
//       const cartItem = await Cart.findById(cartItemId);
  
//       if (!cartItem) {
//         res.status(404).json({ message: 'Cart item not found' });
//         return;
//       }
  
//       cartItem.quantity = quantity;
//       await cartItem.save();
  
//       res.status(200).json({ message: 'Cart item updated successfully', cartItem });
//     } catch (err) {
//       console.error('Error updating cart item:', err);
//       res.status(500).send('An error occurred while updating the cart item');
//     }
//   });
  

// exports.deleteCart = asyncHandler(async (req, res) => {
//   try {
//     const cartItemId = req.params.id;
//     const cartItem = await Cart.findByIdAndDelete(cartItemId);

//     if (!cartItem) {
//       res.status(404).json({ message: 'Cart item not found' });
//       return;
//     }

//     res.status(200).json({ message: 'Cart item deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting cart item:', err);
//     res.status(500).send('An error occurred while deleting the cart item');
//   }
// });
