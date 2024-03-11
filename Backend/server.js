const express = require('express');
const app = express();
require('./config/connect'); 
const product_routes = require('./routes/product');
const user_routes = require('./routes/user');
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.use(express.json());

app.use('/getimage',express.static("./uploads"))

app.use('/user', user_routes);
app.use('/product', product_routes);

