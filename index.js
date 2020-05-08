const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

const apiIndex = require('./routes/index');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('uploads'));

app.use('/api',api);
app.get('/', function (req,res){
   res.send("Hello Server");
})

app.listen(PORT, function () {
    console.log('Server running ' + PORT);
})
