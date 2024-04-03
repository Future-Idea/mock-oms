const express = require('express')
const router = express.Router()
const {getOrderStatus, createNewOrder, addOrderDoc, getAllOrders, rejectOrder }= require('../controllers/omsFunctions')

// API Endpoint for OMS Home Page
router.get('/', (req,res) =>{
    res.render("oms/omsHome")
})

// API Endpoint to Get All Orders in OMS
router.get('/orders',async(req,res)=>{
    const orders = await getAllOrders()
    if (req.headers['content-type'] == 'application/json') {
        res.json(orders);
      }else{
        res.render('oms/omsOrders',{orders:orders})
      }
})

// API Endpoint to Get Order Status of an existing Order
router.get('/orderStatus/:id',async (req,res)=>{
    res.send(await getOrderStatus(req.params.id))
})

// API Endpoint to Create a New Order in OMS
router.post('/createOrder',(req, res)=>{
    res.json(createNewOrder(req.body))
})

// API Endpoint to Add a Document to an existig Order
router.post('/addOrderDoc/:id',(req, res)=>{
    res.json(addOrderDoc(req.params.id,req.files.File))
})

// API Endpoint to Reject Order
router.post('/rejectOrder/:id', async (req,res)=>{
    res.send(await rejectOrder(req.params.id))
})


module.exports = router
