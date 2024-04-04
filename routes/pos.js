const express = require('express')
const router = express.Router()
const { getOrder, updateOrderStatus, getNewOrders }= require('../controllers/posFunctions')

// API Endpoint for POS Home Page
router.get('/',(req,res)=>{
    res.render("pos/posHome")
})

// API Endpoint to Get All Accepted Orders in POS
router.get('/orders/',async (req,res)=>{
    const orders =await getNewOrders()
    if (req.headers['content-type'] == 'application/json') {
        res.json(orders)
    }else{
        res.render('pos/posOrders',{orders:orders})
    }
})

// API Endpoint to Get Order Status of an existing Order
router.get('/order/:id',async (req,res)=>{
    const order = await getOrder(req.params.id)
    if (req.headers['content-type'] == 'application/json') {
        res.json(order)
    }else{
     res.render('pos/posOrder',{order:order})
    }
})

// API Endpoint to Update the Order Status of an existing Order
router.post('/updateOrderStatus',async (req,res)=>{
    res.json(await updateOrderStatus(req.body.orderId, req.body.status))
})

module.exports = router