const Product =require('../models/product')



const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: 25 })
  res.status(200).json({products , nbHits: products.length})
  console.log(products)
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const products = await Product.find( req.query)
  res.status(200).json({ products,  nbHits: products.length });
};

const createProduct = async (req, res) => {
 

  };

module.exports = { getAllProductsStatic, getAllProducts,createProduct };
