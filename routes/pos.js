const express = require('express')
const router = express.Router()
const { getOrder, updateOrderStatus, getNewOrders }= require('../controllers/posFunctions')


router.get('/',(req,res)=>{
    res.render("posHome")
})

router.get('/orders/',async (req,res)=>{
    const orders =await getNewOrders()
    if (req.headers['content-type'] == 'application/json') {
        res.json(orders)
    }else{
        res.render('posOrders',{orders:orders})
    }
    
})

router.get('/order/:id',async (req,res)=>{
    const order = await getOrder(req.params.id)
    if (req.headers['content-type'] == 'application/json') {
        res.json(order)
    }else{
     res.render('posOrder',{order:order})
    }
})

router.post('/updateOrderStatus',async (req,res)=>{
    res.json(await updateOrderStatus(req.body.orderId, req.body.status))
})

module.exports = router