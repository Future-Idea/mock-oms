const express = require('express')
const router = express.Router()
const inv = require("../models/Inventory.json") 

router.get('/', (req,res) =>{
    console.log(req.body)
    res.render("inventory/inventoryHome", { inventory: inv })
})

module.exports = router
