const express = require('express');
const app = express();
require('dotenv').config(); 

app.use(express.json());

const port = process.env.APP_PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const userRoute = require('./src/routes/user-route');
const productRoute = require('./src/routes/product-route');
app.use('/user', userRoute);
app.use('/product', productRoute);
    