const express = require('express');
const path = require('path');
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const port = 8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))


var contactList = [
    {
        name : 'akhilesh',
        phone : '1234567890'
    },
    {
        name : 'akhil',
        phone : '1234123890'
    },
    {
        name : 'akhil',
        phone : '1233454390'
    }
];

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching the contacts from database", err);
            return;
        }

        return res.render('home', {
            title : "My First Contact List",
            contact_list : contacts
        })
    });
});

app.get('/practice', function(req, res){
    res.render('practice',
    {
        title : 'Lets play with ejs'
    });
});

app.post('/create-contact',  function(req, res){
    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // })

    //return res.redirect('/');

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("Error in creating the contact", err);
            return;
        }

        console.log("*****", newContact);
        return res.redirect('back')
    })
});

app.get('/delete-contact/', function (req, res){
    console.log(req.query);
    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error has occured in deleting the contact", err);
            return;
        }

        return res.redirect('back');
    })

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    // return res.redirect('back');
});


app.listen(port, function(err){
    if(err){
        console.log("Error in returning the server : ", err);
    }

    console.log('Yupp !! my server is running at port : ', port);
})