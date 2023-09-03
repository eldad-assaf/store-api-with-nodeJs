const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price")
    .limit(10);
  res.status(200).json({ products, nbHits: products.length });
  console.log(products);
};

const getAllProducts = async (req, res) => {
  //console.log(req.query);
  //**trys to deconstruct the 'featured', 'company' ... parms from the query  */
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};
  //**If 'featured' exists then set the right value in the 'queryObject' */
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    // console.log(numericFilters)

    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });

    console.log(queryObject);
  }

  //console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    console.log(sort);
    const sortedList = sort.split(",").join(" ");
    result = result.sort(sortedList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const sortedFields = fields.split(",").join(" ");
    result = result.select(sortedFields);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  //23 products
  //if limit is 7 products per page then : 4 pages (7,7,7,2)

  const products = await result;
  //const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

const createProduct = async (req, res) => {};

module.exports = { getAllProductsStatic, getAllProducts, createProduct };
