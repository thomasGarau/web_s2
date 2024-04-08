const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config(); 

app.use(express.json());
app.use(cors());

const port = process.env.APP_PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const userRoute = require('./src/routes/user-route');
const productRoute = require('./src/routes/product-route');
const categorieRoute = require('./src/routes/categorie-route');
const panierRoute = require('./src/routes/panier-route');
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/categorie', categorieRoute);
app.use('/panier', panierRoute);
    