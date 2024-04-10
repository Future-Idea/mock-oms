const express = require('express')
const router = express.Router()

const inv = [
    { locationId: "LocationId1", sku: "sku1", quantity: 10 },
    { locationId: "LocationId1", sku: "sku2", quantity: 12 },
    { locationId: "LocationId1", sku: "sku3", quantity: 8 }
]

router.get('/', (req,res) =>{
    console.log(req.body)
    res.render("inventory/inventoryHome", { inventory: inv })
})

module.exports = router
