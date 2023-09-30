const express = require('express');
const path = require('path');
const app = express();
const port = 80;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/DentalWebContact');

  const contactSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Phone: String,
    Subject: String,
    Message: String,
  });
  const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS CONFIG
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG CONFIG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Endpoints
app.get('/', (req,res)=>{
    const parameters = {};
    res.status(200).render('home.pug', parameters);
})
app.get('/contact', (req,res)=>{
    const parameters = {};
    res.status(200).render('contact.pug', parameters);
})
app.post('/contact', (req,res)=>{
    var ContactData = new Contact(req.body);
    ContactData.save().then(()=>{
        res.status(200).render('contact.pug');
    }).catch(()=>{
        res.status(400).send("There was some error. Try again later")
    });
})


//SERVER STARTING
app.listen(port, ()=>{
    console.log(`Application started successfully on port ${port}`);
});
}