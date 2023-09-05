require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    //** DELETES ALL THE CURRENT DATA FOR THE PRODUCT - OPTIONAL */
    await Product.deleteMany()
    //CREATE A DOCUMET FOR EACH PRODUCT IN THE JSON FILE
    await Product.create(jsonProducts)
    console.log('Success!!!!')
    //**EXIT - STOPS THE RUN PROCESS OF THE FILE ( 0 IS SUCCESS , 1 IS FAILURE)  */
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
