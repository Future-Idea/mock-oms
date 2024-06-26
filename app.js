const express = require('express')
const bodyParser = require('body-parser');
const logger = require('morgan')
const { create } = require('express-handlebars')
const {toJSON} = require('./helpers/hbs');
const mongoose = require('mongoose');
const orderDataModelJson = require('./models/orderDataModel.json')
mongoose.set("strictQuery", false);
const mongoDb = "mongodb+srv://sauravb:test123@cluster0.mczbi5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoDb)
    .then(()=>console.log("MongoDb Connected"))
    .catch((err)=>console.log(err))


const app = express()

app.use(bodyParser.json());
app.use(logger("dev"))


const hbs = create({ helpers: { toJSON:toJSON }});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))


const PORT = process.env.port || 3000
const returnsRoutes = require('./routes/returns')
const pos = require('./routes/pos')
const oms = require('./routes/oms');
const rabbit = require('./routes/rabbit')
const ims = require('./routes/inventory')



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})


app.get('/', (req, res) =>{
 res.render('home');
})

app.use('/returns', returnsRoutes)
app.use('/pos', pos)
app.use('/oms',oms)
app.use('/rabbit',rabbit)
app.use('/ims' ,ims)

