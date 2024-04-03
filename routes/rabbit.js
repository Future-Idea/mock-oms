const express = require('express')
const router = express.Router()
const { pickPackage, getRabbitOrders, getRabbitOrder , updateRabbitOrderStatus }= require('../controllers/rabbitFunctions')

// Endpoint for Rabbit Home Page
router.get('/',(req,res)=>{
    res.render("rabbit/rabbitHome")
})


// API Endpoint to Get All Orders ready to be picked in Rabbit App - (Status: Staged)
router.get('/orders/',async (req,res)=>{
    const orders =await getRabbitOrders()
    if (req.headers['content-type'] == 'application/json') {
        res.json(orders)
    }else{
        res.render('rabbit/rabbitOrders',{orders:orders})
    }
})

// API Endpoint to Get Order Status of an existing Order
router.get('/order/:id',async (req,res)=>{
    const order = await getRabbitOrder(req.params.id)
    if (req.headers['content-type'] == 'application/json') {
        res.json(order)
    }else{
     res.render('rabbit/rabbitOrder',{order:order})
    }
})

// API Endpoint to Update the Order Status of an existing Order in Rabbit App
router.post('/updateOrderStatus',async (req,res)=>{
    res.json(await updateOrderStatus(req.body.orderId, req.body.status))
})

module.exports = router