const express = require('express')
const router = express.Router()
const {getOrderStatus, createNewOrder, addOrderDoc }= require('../controllers/omsFunctions')

router.get('/', (req,res) =>{
    res.send("Welcome to OMS")
})

router.get('/orderStatus/:id',(req,res)=>{
    res.json(getOrderStatus(req.params.id, 'PickQueue',"Order is Currently in Queue to be Picked"))
})

router.post('/createOrder',(req, res)=>{
    res.json(createNewOrder(req.body))
})

router.post('/addOrderDoc/:id',(req, res)=>{
    res.json(addOrderDoc(req.params.id,req.files.File))
})


module.exports = router
