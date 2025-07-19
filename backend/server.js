const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
require('dotenv').config()
const Password = require(process.env.MONGO_URI);
const port = 3000
mongoose.connect("process.env.MONGO_URI")
.then((e)=>{console.log("Connected to MongoDB")})
.catch((e)=>{console.log("Error")})
app.use(bodyParser.json());
app.use(cors());
//Showing All Passwords
app.get('/', async (req, res) => {
  const passwords=await Password.find();
  res.json(passwords)


  
})
//Saving a Password
app.post('/', (req, res) => {
  const passworddata=req.body;
  const newpassword=new Password(passworddata);
  newpassword.save();


})
//Deleting a Password
app.delete('/', async  (req, res) => {
  const {id}=req.body;
  await Password.deleteOne({id});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
