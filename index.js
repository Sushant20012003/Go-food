const express= require('express');
require('./db/config');
const Item= require('./db/Item');
const User= require('./db/User');
const FoodCategory= require('./db/FoodCat');
const cors= require('cors');
const path= require('path');

const app= express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, "build")));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.get('/fooddata', async(req, res)=>{
    const foodItem= await Item.find();
    const foodCat= await FoodCategory.find();
    res.send([foodItem, foodCat]);
});


app.use(express.json());

app.use('/api', require('./routes/createUser'));  
app.use('/api', require('./routes/LoginUser'));
app.use('/api', require('./routes/orderData'));







app.listen(8000, ()=>{
    console.log("Server running at port 8000");
})