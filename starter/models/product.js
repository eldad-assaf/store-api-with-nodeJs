const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },

  createdAt: {
    type: Date,
    required: Date.now(),
  },

  company : {
    type: String,
    //enum : ['ikea, liddy, caressa, marcos']
    
    //values are the only options for the name of the comapny  //
    // {VALUE} parameter is the value the user tried to add (req)
    enum : {values : ['ikea,liddy,caressa,marcos'],message : '{VALUE} is not supported'}
  }

});

module.exports = mongoose.model("Product", productSchema);
