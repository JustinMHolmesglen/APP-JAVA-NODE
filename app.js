const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const Database = require('nedb');
const path = require('path');
const { writeHeapSnapshot } = require('v8');

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'js')))
app.use(express.json());
app.use(express.urlencoded());

const database = new Database('database.db');
database.loadDatabase();

app.post('/contact-us', (req, res) => {
    const data = req.body;
    console.log(data)
    /*, req.body.${last_name}, req.body.${email}, req.body.${password}, req.body.${password2}`]*/
    database.insert(data);
    console.log(data);
    res.json(data);
});

app.get('/contact-us', (req, res) => {
    database.find({}, (err, data) =>{
        if (err) {
            res.status(500).send("The data was not saved");
        }
        res.json(data)
    });
});
    

app.listen(3000, () => console.log("listening on port 3000"));



