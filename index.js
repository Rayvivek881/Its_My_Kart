const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const MONGO_URI = `mongodb+srv://vivek:12345@cluster0.1x645pw.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use(cors());

// sample for express server

app.use(morgan('common'));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 8080; // port at which server listening

app.get('/', (req, res) => res.json({message : "working......."}));

// fetch routes
const CustomerRouter = require('./Routes/CustomerRoutes.js');
const ProductRouter = require('./Routes/ProductRouter.js');
const OrderRouter = require('./Routes/OrderRouter.js');
// //define root routes.
app.use('/customer', CustomerRouter);
app.use('/product', ProductRouter);
app.use('/order', OrderRouter);


app.listen(
  PORT,
  console.log(`server started in at port ${PORT}`)
);