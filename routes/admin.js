var express = require('express')
var router = express.Router()
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
var upload = multer({
    storage: storage
})


// var multer = require('multer');

// // File upload configuration
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images'); // Destination folder for uploaded images
//     },
//     filename: function (req, file, cb) {
//         const fileExtension = file.originalname.split('.').pop();
//         const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileExtension;
//         cb(null, uniqueFilename); // Unique filename for each uploaded image
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//             cb(null, true); // Allow only JPEG and PNG files
//         } else {
//             cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
//         }
//     }
// });

var categoriesController = require('../Controller/categoriesController')
var dishesController = require('../Controller/dishesController')
var maincategoriesController = require('../Controller/maincategoriesController');
const isAuthenticated = require('../Middleware/authMiddleware');
const adminController = require('../Controller/adminController');
const settingsController = require('../Controller/settingsController');



// Route definitions
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);
// Protected route example
router.get('/protected', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route' });
});


//---Main categoies---

router.post('/postmaincategories', maincategoriesController.postMaincategories);
router.get('/getmaincategories', maincategoriesController.getMaincategories);
router.get('/getmaincategoriesbyid/:id', maincategoriesController.getMaincategoriesById);
router.put('/putmaincategories/:id', maincategoriesController.putMaincategoriesById);
router.delete('/deletemaincategories/:id', maincategoriesController.deleteMaincategoriesById);


// --categories--

router.post('/postcategories',categoriesController.postCategories);
router.get('/getcategories',categoriesController.getCategories);
router.get('/getcategoriesbyid/:id',categoriesController.getCategoriesById);
router.put('/putcategories/:id',categoriesController.putCategoriesById);
router.delete('/deletecategories/:id',categoriesController.deleteCategoriesById);






//--dishes---
router.post('/postdishes', upload.array('image'), dishesController.postDishes);
router.get('/getdishes',dishesController.getDishes);
router.get('/getdishesbyid/:id',dishesController.getDishesById);
router.put('/putdishes/:id', upload.array('image'), dishesController.putDishesById);
router.delete('/deletedishes/:id',dishesController.deleteDishesById);




//---footer settings---
router.post('/postsettings', upload.array('image'), settingsController.postSettings);
router.get('/getsettings', settingsController.getSettings);
router.get('/getsettings/:id', settingsController.getSettingsById);
router.put('/putsettings/:id', upload.array('image'), settingsController.putSettingsById);
router.delete('/deletesettings/:id', settingsController.deleteSettingsById);

module.exports = router
