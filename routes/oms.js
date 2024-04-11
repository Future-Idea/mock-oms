const express = require('express')
const router = express.Router()
const {getOrderStatus, createNewOrder, addOrderDoc, getAllOrders, rejectOrder , updateOmsOrderStatus , deleteOMSOrder }= require('../controllers/omsFunctions')

// API Endpoint for OMS Home Page
router.get('/', (req,res) =>{
    res.render("oms/omsHome")
})

// API Endpoint to Get All Orders in OMS
router.get('/orders',async(req,res)=>{
    const orders = await getAllOrders()
    if (req.headers['content-type'] === 'application/json') {
        res.json(orders);
      }else{
        res.render('oms/omsOrders',{orders:orders})
      }
})

// API Endpoint to Get Order Status of an existing Order in OMS
router.get('/orderStatus/:id',async (req,res)=>{
    const order = await getOrderStatus(req.params.id)
    if (req.headers['content-type'] === 'application/json') {
        res.json(order)
    }else{
        res.render('oms/omsOrder',{order:order})
    }
})

// API Endpoint to Create a New Order in OMS
router.post('/createOrder', async (req, res)=>{
    const response = createNewOrder(req.body)
    if(req.body.Products?.[0]?.ProductID === 'spmishra-sku1') {
        await updateOmsOrderStatus(req.body.orderId, "Cancelled")
        return res.status(404).send({ error: 'Sku Out of Stock'})
    }
    res.json(response)
})

// API Endpoint to Add a Document to an existig Order
router.post('/addOrderDoc/:id', async (req, res)=>{
    console.log(req.body)
    const response = addOrderDoc(req.params.id, req.body)
    await updateOmsOrderStatus(req.params.id, "ShiplabelGenerated")
    res.json(response)
})

// API Endpoint to Get a Document to an existig Order
router.get('/addOrderDoc/:id',(req, res)=>{
    res.json(addOrderDoc(req.params.id,req.files.File))
})

// API Endpoint to Reject Order
router.post('/rejectOrder/:id', async (req,res)=>{
    res.send(await rejectOrder(req.params.id))
})

// API Endpoint to Update the Order Status of an existing Order in OMS
router.post('/updateOmsOrderStatus',async (req,res)=>{
    res.json(await updateOmsOrderStatus(req.body.orderId, req.body.status))
})

//API Endpoint to Delete Order in OMS
router.post('/deleteOrder/:id',async (req,res)=>{
    res.json(await deleteOMSOrder(req.params.id))
})
module.exports = router
