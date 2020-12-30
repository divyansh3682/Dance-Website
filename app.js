const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port = 8000;


// Define mongoose scheema

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saves to the database")
    });

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});