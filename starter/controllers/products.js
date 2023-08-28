const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: 25 });
  res.status(200).json({ products, nbHits: products.length });
  console.log(products);
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
//**trys to deconstruct the 'featured' parm from the query  */
  const { featured ,company} = req.query;

  const queryObject = {};
  //**If 'featured' exists then set the right value in the 'queryObject' */
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if(company){
    queryObject.company = company
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

const createProduct = async (req, res) => {};

module.exports = { getAllProductsStatic, getAllProducts, createProduct };
