const express = require('express')
const router = express.Router()
const {getOrderStatus, createNewOrder, addOrderDoc, getAllOrders }= require('../controllers/omsFunctions')

router.get('/', (req,res) =>{
    res.render("omsHome")
})

router.get('/orders',async(req,res)=>{
    const orders = await getAllOrders()
    if (req.headers['content-type'] == 'application/json') {
        res.json(orders);
      }else{
        res.render('omsOrders',{orders:orders})
      }
})

router.get('/orderStatus/:id',async (req,res)=>{
    res.send(await getOrderStatus(req.params.id))
})

router.post('/createOrder',(req, res)=>{
    res.json(createNewOrder(req.body))
})

router.post('/addOrderDoc/:id',(req, res)=>{
    res.json(addOrderDoc(req.params.id,req.files.File))
})


module.exports = router
