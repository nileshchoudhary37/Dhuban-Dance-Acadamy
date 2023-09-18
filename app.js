const express = require('express');
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require('mongoose');
const bodyparser=require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
}
//Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:Number,
    email:String,
    address:String
});

const Contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //The express.static('static') middleware instructs Express to serve files from this "static" directory.
app.use(express.urlencoded())  //It takes the raw data from the request body (which is typically in URL-encoded format) and transforms it into a JavaScript object. 
//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory 

//ENDPOINTS
app.get('/', (req, res) => {
    
    const params = { };
    res.status(200).render('home.pug', params);
    
});
app.get('/contact', (req, res) => {
    
    const params = { };
    res.status(200).render('contact.pug', params);
});
app.get('/person1', (req, res) => {
    
    const params = { };
    res.status(200).render('person1.pug', params);
});
app.get('/person2', (req, res) => {
    
    const params = { };
    res.status(200).render('person2.pug', params);
});
app.get('/services', (req, res) => {
    
    const params = {};
    res.status(200).render('services.pug', params);
});

app.post('/contact', (req, res) => {
    
    const myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database.")
    })

});

//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfuly on port ${port}`)
});