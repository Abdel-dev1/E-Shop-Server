const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isVald = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid Image Ext");
    if (isVald) {
      uploadError = null;
    }
    cb(uploadError, "D:/React native project/BACKEND/public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", async (req, res) => {
  //localhost:3000/api/v1/products?categories=16616,215451
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category"); //.select('name price -_id');

  if (!productList) return res.status(500).json({ success: false });

  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) return res.status(500).json({ success: false });

  res.send(product);
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category).catch((err) =>
    console.log("Error Category")
  );

  if (!category) return res.status(400).send("categoryy does not exist");
  else {
    const fileName = req.file.filename;
    const basePath =
      req.protocol + "://" + req.get("host") + "/public/uploads/";
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: basePath + fileName,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) return res.status(500).send("product cannot be created");
    res.send(product);
    console.log("Success Add product");
  }
  //const file=req.file;
  //if(!file) return res.status(400).send('Image  does not exist');

  //const fileName=req.file.filename;
  //const basePath= req.protocol+'://'+req.get('host')+'/public/upload/';
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  /*if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid product');
    */

  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("category does not exist");
  //const fileName = req.file.filename;
  //const basePath = req.protocol + "://" + req.get("host") + "/public/uploads/";
  
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        //image: basePath+fileName,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      }
    },
    { new: true }
  );
  if (!category) return res.status(404).send("The product cannot be updated");
  res.send(product);
});

router.put("/name/:id", uploadOptions.single("image"), async (req, res) => {
  
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      }
    },
    { new: true }
  );
  
  res.send(product);
});


router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "Rah sda9 lablan" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "massda9ch lablan" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ sucess: false, message: "hhhhhh" });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productCount) return res.status(500).json({ success: false });

  res.send({
    productCount: productCount,
  });
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) return res.status(500).json({ success: false });

  res.send(products);
});

module.exports = router;
