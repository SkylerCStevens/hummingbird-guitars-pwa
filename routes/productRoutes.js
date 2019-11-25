const router = require("express").Router();
let Product = require('../models/product.model');

//Get all the products
//http://localhost:4000/api/product
router.get("/", async (req, res) => {
  try {
    const product = await Product.find()
    res.send(product)
} catch(err) {
    res.status(500).json({message: err.message})
}
});

//Save new contact from the comment form to database
//http://localhost:4000/api/contacts/new
router.post("/new", async (req, res) => {
      try {
          const product = await Product.create(req.body)
          res.send(product)
      } catch(err) {
          res.status(500).json({message: err.message})
      }
});

//http://localhost:4000/api/product/filter/electric/fender/900/1000
router.get("/filter/:type/:brand/:pricelow/:pricehigh", async (req, res) => {
    const type = req.params.type; //define req.params.type passed through url as type
    const brand = req.params.brand; //define req.params.brand passed through url as brand
    const priceLow = req.params.pricelow; //define req.params.pricelow passed through url as priceLow
    const priceHigh = req.params.pricehigh; //define req.params.pricehigh passed through url as priceHigh
    const ANY = "any"; // define ANY for easy reassignment if that value gets changed on the page

    let qryObj = {};
  
    if (brand !== ANY) {
    //If brand does not equal ANY check if the paramArr array has anything in it if it is empty define qryStr a string with WHERE otherwise define it as  a string with &&
     qryObj.brand = brand;
    }

    if (type !== ANY) {
      qryObj.productType = type;
    }

    if(priceLow !== ANY){
      qryObj.price = {$gt: priceLow, $lt: priceHigh}
    }

    try{
      console.log(qryObj)
      const products = await Product.find(qryObj)
      res.send(products)
    }
    catch(err){
      res.status(500).json({message: err.message})
    }

  });


  module.exports = router; //Export the endpoints to be used in another file