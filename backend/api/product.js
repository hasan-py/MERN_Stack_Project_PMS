const express = require('express');
const router = express.Router();
const multer = require('multer');

// Product Controller
const {getAllProduct,addProduct,deleteProduct,editProduct} = require('./controller/productController')

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ "_" +file.originalname)
  }
})

const upload = multer({storage:storage});

router.get('/all-product',getAllProduct)
router.post('/add-product',upload.single('productImage'),addProduct)
router.post('/edit-product',upload.single('productImage'),editProduct)
router.get('/delete-product/:id',deleteProduct)

module.exports = router